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
        toolbarItems={[
          ['image', 'table', 'link'],
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          // ['ul', 'ol', 'task', 'indent', 'outdent'],
          // ['code', 'codeblock'],
        ]}
      />
      <style jsx>{`
        .toastui-editor-popup {
          right: 12px;
        }
      `}</style>
    </div>
  );
};

export default WysiwygEditor;
