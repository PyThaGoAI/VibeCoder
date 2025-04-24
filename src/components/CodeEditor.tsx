
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { ViewUpdate } from '@codemirror/view';

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  language?: 'python' | 'javascript' | 'typescript' | 'html' | 'css' | 'json';
  readOnly?: boolean;
  height?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialValue = '',
  onChange,
  language = 'python',
  readOnly = false,
  height = '100%',
  className = ''
}) => {
  const [value, setValue] = useState<string>(initialValue);
  
  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setValue(value);
    onChange?.(value);
  };
  
  // Basic language support
  const getLanguage = () => {
    switch (language) {
      case 'python':
        return python();
      // We could add more languages here if needed
      default:
        return python();
    }
  };
  
  return (
    <div className={`code-editor rounded overflow-hidden border border-ide-border dark:border-[#2d3748] ${className}`} style={{ height }}>
      <CodeMirror
        value={value}
        height={height}
        theme={oneDark}
        extensions={[getLanguage()]}
        onChange={handleChange}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          autocompletion: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
        }}
        className="h-full w-full"
      />
    </div>
  );
};

export default CodeEditor;
