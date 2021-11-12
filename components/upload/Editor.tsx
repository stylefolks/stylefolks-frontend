import { useReactiveVar } from '@apollo/client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { postStatusVar, writtenPostVar } from 'cache/common/common.cache';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'store/modules/commonReducer';
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
  const dispatch = useDispatch();
  const post = useReactiveVar(writtenPostVar);
  const postStatus = useReactiveVar(postStatusVar);
  const { isTemp } = postStatus;
  // const { isTemp, pickTempId, isModify } = useSelector(
  //   (state: RootState) => state.upload
  // );
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

      console.log('@@@', res.url);

      //여기서 이미지 배열에 넣는것으로 하자
      postStatusVar({
        ...postStatusVar(),
        titleImageArr: [...postStatusVar().titleImageArr, res?.url],
      });

      console.log(postStatusVar());
      //그리고 스피너 끝내자
      dispatch(setSpinner(false));
      return res?.url;
    } catch (error) {
      console.log(error);
      alert('이미지 업로드 에러 발생');
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
            dispatch(setSpinner(true));
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
