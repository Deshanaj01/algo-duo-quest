import React from 'react';
import Editor from '@monaco-editor/react';
import { LANGUAGES } from '../../utils/constants';

const CodeEditor = ({ code, setCode, language, onLanguageChange }) => {
  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    theme: 'vs-dark',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.value}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={editorOptions}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default CodeEditor;