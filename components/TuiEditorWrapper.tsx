import { Editor, EditorProps } from '@toast-ui/react-editor';
import React from 'react';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => (
  <Editor {...props} ref={props.forwardedRef} />
);

export default TuiEditorWrapper;
