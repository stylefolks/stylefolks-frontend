import { useReactiveVar } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { postStatusVar, writtenPostVar } from 'cache/common/common.cache';
import { folksServerNoGql } from 'config';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect } from 'react';
import { createSpinner, removeSpinner } from 'utils/Utils';
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
  const post = useReactiveVar(writtenPostVar);
  const postStatus = useReactiveVar(postStatusVar);
  const { isTemp } = postStatus;

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
    alert('그냥 뜨나 보자 일단.'); // alert는 최초부터 뜨는데 Spinner가 안뜨므로 이건 렌더 관리 문제임..
    createSpinner();
    let formdata = new FormData();
    formdata.append('file', blob);

    try {
      const res = await (
        await fetch(`${folksServerNoGql}/images`, {
          method: 'POST',
          body: formdata,
          headers: {
            'folks-token': localStorage.getItem('folks-token'),
          },
        })
      ).json();

      return res?.url;
    } catch (error) {
      removeSpinner();
      alert('이미지 업로드 에러 발생 : 임시 저장 후 새로고침 후 시도해주세요!');
    }
  };

  useEffect(() => {
    if (isTemp) {
      postStatusVar({ ...postStatus, isTemp: false });
      editorRef?.current?.getInstance().setMarkdown(post.contents); //여기서 초기값을 잡아주는걸로 ..
    }
  }, [isTemp]);

  return (
    <div>
      <EditorWithForwardedRef
        {...props}
        initialValue={post.contents}
        placeholder="Write your own story!"
        previewStyle={previewStyle || 'vertical'}
        height={height || '90vh'}
        initialEditType={initialEditType || 'wysiwyg'}
        useCommandShortcut={useCommandShortcut || true}
        ref={editorRef}
        onChange={handleChange}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            // 여기서 interceptor 작동시켜서 스피너 돌게 하자
            const upload = await uploadImage(blob);
            callback(upload, 'alt text');
            return false;
          },
        }}
        toolbarItems={[
          ['image', 'link'],
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
