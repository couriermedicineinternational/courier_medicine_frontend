import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function RichTextEditor({ value, onChange, placeholder = 'Start typing...', height = 400 }) {
  const editor = useRef(null);

  // Configure Jodit editor options
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      theme: 'light', // As requested: default light theme for the editor toolbar itself
      height: height,
      
      // Setup image uploader to use existing backend endpoint
      uploader: {
        insertImageAsBase64URI: false,
        url: 'http://localhost:5000/api/upload',
        format: 'json',
        method: 'POST',
        filesVariableName: 'image', // Match multer upload.single('image')
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
      
      // Comprehensive toolbar matching user's request
      buttons: [
        'source', '|',
        'save', 'print', '|',
        'cut', 'copy', 'paste', 'pasteAsText', 'pasteFromWord', '|',
        'undo', 'redo', '|',
        'find', 'selectall', '|', // Note: Browser handles 'spellcheck' natively
        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
        'ul', 'ol', 'outdent', 'indent', 'quote', 'classSpan', '|', 
        'align', '|',
        'leftToRight', 'rightToLeft', '|',
        'link', '|',
        'image', 'table', 'hr', 'video', '|', // video maps to iframe/embed
        'fullsize', 'about', '|',
        'symbol', 'pageBreak', 'insert', '|',
        'paragraph', 'font', 'fontsize', '|',
        'brush' // background/text color picker
      ],
      
      // Status bar showing element path
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: true
    }),
    [placeholder]
  );

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={newContent => onChange(newContent)}
        onChange={newContent => {}} // Handle onBlur for state updates to prevent cursor jumping
      />
    </div>
  );
}
