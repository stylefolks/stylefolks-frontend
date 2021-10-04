import '@toast-ui/editor/dist/toastui-editor.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import CategorySelector from '../components/CategorySelector';
import WysiwygEditor from '../components/Editor';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';

const Upload = () => {
  const dispatch = useDispatch();
  const uploadState = useSelector((state: RootState) => state.upload);

  return (
    <div>
      <CategorySelector />
      <WysiwygEditor
        onChange={(content) =>
          dispatch(upadatePost({ ...uploadState, content }))
        }
      />

      <Button canClick={false} actionText="Upload!" loading={false} />
    </div>
  );
};

export default Upload;
