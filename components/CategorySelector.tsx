import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

const CategorySelector = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      Category Selector !! {user.email}
      <span onClick={() => console.log(user)}>click</span>
    </div>
  );
};

export default CategorySelector;
