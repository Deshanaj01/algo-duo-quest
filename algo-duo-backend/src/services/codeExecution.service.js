const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { CODE_EXECUTION, VERDICT } = require('../utils/constants');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

/**
 * Execute code against test cases in a Docker sandbox.
 * @param {string} code - Source code to execute
 * @param {string} language - 'javascript' or 'python'
 * @param {Array<{input: string, expectedOutput: string}>} testCases
 * @returns {Object} { passed, total, results, totalTimeMs, verdict }
 */
const executeCode = async (code, language, testCases) => {
  const results = [];
  let totalTimeMs = 0;
  let passed = 0;
  let verdict = VERDICT.ACCEPTED;

  for (const testCase of testCases) {
    try {
      const result = await runSingleTest(code, language, testCase.input);
      // const actualOutput = result.stdout.trim();
      // const expected = testCase.expectedOutput.trim();
      const actualOutput = (result.stdout || '').trim();
      const expected = (testCase.expectedOutput || testCase.output || '').trim();
      const testPassed = actualOutput === expected;

      if (testPassed) passed++;

      results.push({
        input: testCase.input,
        expected,
        actual: actualOutput,
        passed: testPassed,
        timeMs: result.timeMs,
        error: result.stderr || null,
      });

      totalTimeMs += result.timeMs;

      if (result.timedOut) {
        verdict = VERDICT.TIME_LIMIT;
        break;
      }
      if (result.exitCode !== 0) {
        verdict = VERDICT.RUNTIME_ERROR;
      }
    } catch (err) {
      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput.trim(),
        actual: '',
        passed: false,
        timeMs: 0,
        error: err.message,
      });
      verdict = VERDICT.RUNTIME_ERROR;
    }
  }

  if (verdict === VERDICT.ACCEPTED && passed < testCases.length) {
    verdict = VERDICT.WRONG_ANSWER;
  }

  return {
    passed,
    total: testCases.length,
    results,
    totalTimeMs,
    verdict,
  };
};

/**
 * Run a single test case in a Docker container.
 */
const runSingleTest = async (code, language, input) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'combat-'));
  const image = CODE_EXECUTION.DOCKER_IMAGE[language];

  let fileName, cmd;
  if (language === 'javascript') {
    fileName = 'solution.js';
    cmd = ['node', `/code/${fileName}`];
  } else if (language === 'python') {
    fileName = 'solution.py';
    cmd = ['python3', `/code/${fileName}`];
  } else {
    throw new Error(`Unsupported language: ${language}`);
  }

  // Write code to temp file
  fs.writeFileSync(path.join(tmpDir, fileName), code);

  // Write input to stdin file
  fs.writeFileSync(path.join(tmpDir, 'input.txt'), input);

  const startTime = Date.now();
  let stdout = '';
  let stderr = '';
  let exitCode = 0;
  let timedOut = false;

  try {
    const container = await docker.createContainer({
      Image: image,
      Cmd: ['/bin/sh', '-c', `cat /code/input.txt | ${cmd.join(' ')}`],
      HostConfig: {
        Memory: CODE_EXECUTION.MEMORY_MB * 1024 * 1024,
        CpuQuota: CODE_EXECUTION.CPU_LIMIT * 100000,
        NetworkMode: 'none',
        Binds: [`${tmpDir}:/code:ro`],
        AutoRemove: true,
      },
      AttachStdout: true,
      AttachStderr: true,
      OpenStdin: false,
      Tty: false,
    });

    await container.start();

    // Wait with timeout
    const waitPromise = container.wait();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), CODE_EXECUTION.TIMEOUT_MS)
    );

    try {
      const result = await Promise.race([waitPromise, timeoutPromise]);
      exitCode = result.StatusCode || 0;
    } catch (err) {
      if (err.message === 'timeout') {
        timedOut = true;
        try { await container.kill(); } catch (_) {}
      } else {
        throw err;
      }
    }

    // Get logs
    if (!timedOut) {
      const logs = await container.logs({ stdout: true, stderr: true });
      const logStr = logs.toString('utf8');
      // Docker multiplexed stream: strip header bytes
      stdout = stripDockerHeaders(logStr);
    }
  } catch (err) {
    if (!timedOut) {
      stderr = err.message;
      exitCode = 1;
    }
  } finally {
    // Clean up temp directory
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
  }

  return {
    stdout,
    stderr,
    exitCode,
    timeMs: Date.now() - startTime,
    timedOut,
  };
};

/**
 * Strip Docker multiplexed stream headers from output.
 */
const stripDockerHeaders = (output) => {
  // Docker stream protocol: 8-byte header per frame
  // For simple cases, just return the visible characters
  return output.replace(/[\x00-\x08]/g, '').trim();
};

/**
 * Execute code with a single input (for benchmark/complexity estimation).
 */
const executeBenchmark = async (code, language, input) => {
  const result = await runSingleTest(code, language, input);
  return {
    output: result.stdout.trim(),
    timeMs: result.timeMs,
    timedOut: result.timedOut,
    error: result.stderr,
  };
};

module.exports = { executeCode, executeBenchmark };