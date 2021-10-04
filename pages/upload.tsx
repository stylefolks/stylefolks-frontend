import '@toast-ui/editor/dist/toastui-editor.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import CategorySelector from '../components/CategorySelector';
import WysiwygEditor from '../components/Editor';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';
const Upload = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state: RootState) => state.upload);

  return (
    <div className="wrapper">
      <CategorySelector />
      <WysiwygEditor
        height={'90vh'}
        onChange={(content) => dispatch(upadatePost({ ...post, content }))}
      />

      <Button canClick={false} actionText="Upload!" loading={false} />
      <style jsx>{`
        .wrapper {
          width: 99%;
          margin-left: 0.1vw;
        }

        @media screen and (max-width: 110px) {
          .toastui-editor-popup {
            position: absolute;
            right: 0px !important;
            top: auto !important;
            left: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Upload;
