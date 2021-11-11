import {
  faBookOpen,
  faPenFancy,
  faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { IButtonMap } from 'model/dto';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';

export const BUTTON_MAP: IButtonMap[] = [
  {
    icon: faTshirt,
    firstCategoryName: FirstCategoryName.TALK,
    secondCategoryName: SecondCategoryName.OOTD,
  },
  {
    icon: faPenFancy,
    firstCategoryName: FirstCategoryName.COLUMN,
    secondCategoryName: null,
  },
  {
    icon: faBookOpen,
    firstCategoryName: FirstCategoryName.FOLKS,
    secondCategoryName: SecondCategoryName.BRAND_REVIEW,
  },
  // {
  //   icon: faTshirt,
  //   firstCategoryName: FirstCategoryName.TALK,
  //   secondCategoryName: SecondCategoryName.FREE,
  // },
];

export default {};
