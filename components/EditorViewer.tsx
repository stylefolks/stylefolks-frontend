import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { TuiViewerWithForwardedProps } from './TuiViewerWrapper';

const EditorViewer = dynamic<TuiViewerWithForwardedProps>(
  () => import('./TuiViewerWrapper'),
  { ssr: false }
);

const EditorViewerWithForwardedRef = React.forwardRef<
  ViewerType | undefined,
  ViewerProps
>((props, ref) => (
  <EditorViewer
    {...props}
    forwardedRef={ref as React.MutableRefObject<ViewerType>}
  />
));
EditorViewerWithForwardedRef.displayName = 'EditorViewerWithForwardedRef';

interface IEditorViewerProps extends ViewerProps {
  content: string;
}

const EditorViewerWithProps: React.FC<IEditorViewerProps> = (props) => {
  const { content } = props;
  const viewerRef = React.useRef<ViewerType>();

  // new Viewer({
  //   el: document.getElementById('viewer'),
  //   content,
  // });
  console.log('content in viewer', content);

  return (
    <>
      <EditorViewerWithForwardedRef
        {...props}
        ref={viewerRef}
        initialValue={content}
      />
      <div>Hello EditorViewer Sth</div>
      {/* <div id="viewer"></div> */}
    </>
  );
};

export default EditorViewerWithProps;
