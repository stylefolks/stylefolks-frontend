import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';
interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./TuiEditorWrapper'),
  { ssr: false }
);

const EditorWithForwardedRef = React.forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

EditorWithForwardedRef.displayName = 'EditorWithForwardedRef';

interface Props extends EditorProps {
  onChange(value: string): void;

  valueType?: 'markdown' | 'html';
}

const WysiwygEditor: React.FC<Props> = (props) => {
  const {
    initialValue,
    previewStyle,
    height,
    initialEditType,
    useCommandShortcut,
  } = props;

  const editorRef = React.useRef<EditorType>();
  const handleChange = React.useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    const instance = editorRef.current.getInstance();
    const valueType = props.valueType || 'markdown';

    props.onChange(
      valueType === 'markdown' ? instance.getMarkdown() : instance.getHTML()
    );
  }, [props, editorRef]);

  const uploadImage = async (blob: File | Blob) => {
    let formdata = new FormData();

    formdata.append('file', blob);

    try {
      const res = await (
        await fetch('http://localhost:4000/images', {
          method: 'POST',
          body: formdata,
        })
      ).json();

      return res?.url;
    } catch (error) {
      console.log(error);
      alert('이미지 업로드 에러 발생');
    }
  };

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={initialValue || 'Wirte Your Own Story!'}
        previewStyle={previewStyle || 'vertical'}
        height={height || '90vh'}
        initialEditType={initialEditType || 'wysiwyg'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            alert('이미지 업로드중');
            const upload = await uploadImage(blob);
            callback(upload, 'alt text');
            return false;
          },
        }}
        toolbarItems={[
          ['image', 'table', 'link'],
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          // ['ul', 'ol', 'task', 'indent', 'outdent'],
          // ['code', 'codeblock'],
        ]}
      />
    </div>
  );
};

export default WysiwygEditor;
