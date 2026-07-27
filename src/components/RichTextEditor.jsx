import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

function RichTextEditorComponent({ value, onChange, placeholder = 'Start typing...', height = 300 }) {
  const editor = useRef(null);

  // Configure Jodit editor options - Memoized config
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      theme: 'light',
      height: height,
      
      uploader: {
        insertImageAsBase64URI: false,
        url: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`,
        format: 'json',
        method: 'POST',
        filesVariableName: 'image',
        isSuccess: function (resp) {
          return !resp.error && resp.success;
        },
        process: function (resp) {
          return {
            files: resp.url ? [resp.url] : [],
            path: resp.url,
            baseurl: '',
            error: resp.error ? 1 : 0,
            message: resp.message || ''
          };
        },
        defaultHandlerSuccess: function (data, resp) {
          const field = 'files';
          if (data[field] && data[field].length) {
            for (let i = 0; i < data[field].length; i += 1) {
              this.s.insertImage(data.baseurl + data[field][i]);
            }
          }
        },
        defaultHandlerError: function (err) {
          this.jodit.events.fire('errorMessage', err.message);
        }
      },
      
      buttons: [
        'source', '|',
        'save', 'print', '|',
        'cut', 'copy', 'paste', 'pasteAsText', 'pasteFromWord', '|',
        'undo', 'redo', '|',
        'find', 'selectall', '|',
        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
        'ul', 'ol', 'outdent', 'indent', 'quote', 'classSpan', '|', 
        'align', '|',
        'leftToRight', 'rightToLeft', '|',
        'link', '|',
        'image', 'table', 'hr', 'video', '|',
        'fullsize', 'about', '|',
        'symbol', 'pageBreak', 'insert', '|',
        'paragraph', 'font', 'fontsize', '|',
        'brush'
      ],
      
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false
    }),
    [placeholder, height]
  );

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <JoditEditor
        ref={editor}
        value={value || ''}
        config={config}
        tabIndex={1}
        onBlur={newContent => onChange(newContent)}
        onChange={() => {}}
      />
    </div>
  );
}

// React.memo prevents JoditEditor from re-rendering when typing in normal text inputs
const RichTextEditor = React.memo(RichTextEditorComponent, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.placeholder === nextProps.placeholder && prevProps.height === nextProps.height;
});

export default RichTextEditor;
