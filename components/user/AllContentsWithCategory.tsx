import { IPickCategory } from 'model/dto';
import { getPostByCategory } from 'src/__generated__/getPostByCategory';
import UserPageStyle from 'styles/user/UserPage.module.scss';

interface IProps {
  data: getPostByCategory;
  pickCategory: IPickCategory;
}

const AllContentsWithCategory: React.FC<IProps> = ({ data, pickCategory }) => {
  return (
    <div className={UserPageStyle.userContentsContainer}>
      Hello There {pickCategory.firstCategoryName}{' '}
      {pickCategory.secondCategoryName}
    </div>
  );
};

export default AllContentsWithCategory;
