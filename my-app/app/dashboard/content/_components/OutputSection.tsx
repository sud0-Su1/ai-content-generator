"use client"
import React, { useRef, useEffect } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface OutputSectionProps {
  aiOutput?: string
}

function OutputSection({ aiOutput }: OutputSectionProps) {
  const editorRef: any = useRef();

  // Update editor content when aiOutput changes
  useEffect(() => {
    if (editorRef.current && aiOutput) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  const copyToClipboard = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown();
      navigator.clipboard.writeText(content);
      // You might want to show a toast notification here
      console.log('Content copied to clipboard');
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getMarkdown());
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5 border-b'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button 
          className='flex gap-2' 
          onClick={copyToClipboard}
          variant="outline"
        >
          <Copy className='w-4 h-4'/>
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={aiOutput || "Your generated content will appear here..."}
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default OutputSection