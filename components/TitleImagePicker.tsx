import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';
import UploadStyle from '../styles/Upload.module.scss';

const TitleImagePicker: React.FC = () => {
  const dispatch = useDispatch();
  const { post, titleImageArr } = useSelector(
    (state: RootState) => state.upload
  );

  return (
    <div className={UploadStyle.imagePickerWrapper}>
      <span>Uploaded Image</span>
      <h6>Click to register as title image</h6>
      <ul>
        {titleImageArr.length ? (
          titleImageArr.map((el, index) => (
            <li key={index} className={el === post.titleImg ? 'check' : ''}>
              <Image
                onClick={() => dispatch(upadatePost({ ...post, titleImg: el }))}
                src={el}
                alt={post.title + el.substring(0, 2)}
                width="40px"
                height="40px"
              />
            </li>
          ))
        ) : (
          <span />
        )}
      </ul>
      <style jsx>{`
        .check {
          border: 3px solid green;
        }
      `}</style>
    </div>
  );
};
export default TitleImagePicker;
