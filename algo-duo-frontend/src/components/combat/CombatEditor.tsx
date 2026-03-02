import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  code: string;
  language: 'javascript' | 'python';
  onChange: (value: string) => void;
  onRun?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  remainingSubmissions: number;
  onTabSwitchDetected?: () => void;
}

const CombatEditor: React.FC<Props> = ({
  code,
  language,
  onChange,
  onRun,
  onSubmit,
  isSubmitting,
  remainingSubmissions,
  onTabSwitchDetected,
}) => {
  const hasRegisteredVisibility = useRef(false);

  // Anti-cheat: detect tab switches
  useEffect(() => {
    if (hasRegisteredVisibility.current) return;
    const handler = () => {
      if (document.visibilityState === 'hidden' && onTabSwitchDetected) {
        onTabSwitchDetected();
      }
    };
    document.addEventListener('visibilitychange', handler);
    hasRegisteredVisibility.current = true;
    return () => {
      document.removeEventListener('visibilitychange', handler);
      hasRegisteredVisibility.current = false;
    };
  }, [onTabSwitchDetected]);

  return (
    <div className="flex flex-col h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-950">
        <span className="text-xs text-gray-300">Editor</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">
            Submissions left:{' '}
            <span className="font-semibold text-emerald-300">
              {remainingSubmissions}
            </span>
          </span>
          {onRun && (
            <button
              type="button"
              onClick={onRun}
              className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-white"
            >
              Run locally
            </button>
          )}
          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || remainingSubmissions <= 0}
              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-xs font-semibold text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage={language}
          theme="vs-dark"
          value={code}
          onChange={(v) => onChange(v || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            // Clipboard options are not supported in IStandaloneEditorConstructionOptions
          }}
          onMount={(editorInstance) => {
            // Fallback: intercept paste to prevent it
            editorInstance.onDidPaste((e: any) => {
              if (e.range) {
                editorInstance.executeEdits('anti-paste', [
                  { range: e.range, text: '' },
                ]);
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default CombatEditor;

