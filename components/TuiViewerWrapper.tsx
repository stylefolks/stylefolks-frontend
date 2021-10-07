import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import React from 'react';
export interface TuiViewerWithForwardedProps extends ViewerProps {
  forwardedRef?: React.MutableRefObject<Viewer>;
}

const TuiViewerWrapper = (props: TuiViewerWithForwardedProps) => (
  <Viewer {...props} ref={props.forwardedRef} />
);

export default TuiViewerWrapper;
