const { executeBenchmark } = require('./codeExecution.service');
const { COMPLEXITY } = require('../utils/constants');

/**
 * Estimate time and space complexity by running code against benchmark inputs.
 * @param {string} code - Source code
 * @param {string} language - 'javascript' or 'python'
 * @param {Object} benchmarkInputs - { small: string, medium: string, large: string }
 * @returns {Object} { timeComplexity, spaceComplexity, benchmarkResults }
 */
const estimateComplexity = async (code, language, benchmarkInputs) => {
  if (!benchmarkInputs || !benchmarkInputs.small) {
    return {
      timeComplexity: 'N/A',
      spaceComplexity: 'N/A',
      benchmarkResults: null,
    };
  }

  try {
    // Run against three input sizes
    const [small, medium, large] = await Promise.all([
      executeBenchmark(code, language, benchmarkInputs.small),
      executeBenchmark(code, language, benchmarkInputs.medium),
      executeBenchmark(code, language, benchmarkInputs.large),
    ]);

    // If any timed out, classify as expensive
    if (large.timedOut) {
      return {
        timeComplexity: 'O(2^n)',
        spaceComplexity: 'N/A',
        benchmarkResults: { small, medium, large },
      };
    }

    if (medium.timedOut) {
      return {
        timeComplexity: 'O(n²)',
        spaceComplexity: 'N/A',
        benchmarkResults: { small, medium, large },
      };
    }

    // Calculate growth ratio: t(large) / t(medium)
    const t2 = Math.max(medium.timeMs, 1);
    const t3 = Math.max(large.timeMs, 1);
    const ratio = t3 / t2;

    const timeComplexity = classifyByRatio(ratio);

    // Space complexity is harder to measure without memory profiling.
    // Approximate: if time is O(n) or better, assume space is O(n) at worst.
    const spaceComplexity = approximateSpaceComplexity(timeComplexity);

    return {
      timeComplexity,
      spaceComplexity,
      benchmarkResults: {
        small: { timeMs: small.timeMs },
        medium: { timeMs: medium.timeMs },
        large: { timeMs: large.timeMs },
        ratio,
      },
    };
  } catch (err) {
    console.error('Complexity estimation error:', err.message);
    return {
      timeComplexity: 'N/A',
      spaceComplexity: 'N/A',
      benchmarkResults: null,
    };
  }
};

/**
 * Classify time complexity based on growth ratio.
 */
const classifyByRatio = (ratio) => {
  if (ratio < COMPLEXITY.CONSTANT) return 'O(1)';
  if (ratio < COMPLEXITY.LOGARITHMIC) return 'O(log n)';
  if (ratio < COMPLEXITY.LINEAR) return 'O(n)';
  if (ratio < COMPLEXITY.LINEARITHMIC) return 'O(n log n)';
  if (ratio < COMPLEXITY.QUADRATIC) return 'O(n²)';
  return 'O(2^n)';
};

/**
 * Approximate space complexity from time complexity.
 */
const approximateSpaceComplexity = (timeComplexity) => {
  const mapping = {
    'O(1)': 'O(1)',
    'O(log n)': 'O(1)',
    'O(n)': 'O(n)',
    'O(n log n)': 'O(n)',
    'O(n²)': 'O(n)',
    'O(2^n)': 'O(2^n)',
  };
  return mapping[timeComplexity] || 'N/A';
};

module.exports = { estimateComplexity };
