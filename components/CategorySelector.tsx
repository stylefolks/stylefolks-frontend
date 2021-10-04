import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { upadatePost } from '../store/modules/uploadReducer';
import CategoryStyle from '../styles/Category.module.scss';

const CategorySelector = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { post } = useSelector((state: RootState) => state.upload);
  const dispatch = useDispatch();

  return (
    <section className={CategoryStyle.categoryContainer}>
      <span>Write Your Own Story named as</span>
      <input
        autoFocus={true}
        // className={`${UtilStyle.input}`}
        type="text"
        placeholder="Title"
        value={post.title}
        onChange={(e) =>
          dispatch(upadatePost({ ...post, title: e.target.value }))
        }
      />
      <span> in </span>
      <select>
        <option>SecondCategory</option>
      </select>
      <span> at </span>
      <select>
        <option>FirstCategory</option>
        <option>FirstCategory</option>
        <option>FirstCategory</option>
      </select>
      <style jsx>{`
        /* section {
          width: 100%;
          border: 1px solid black;
        } */
      `}</style>
    </section>
  );
};

export default CategorySelector;
