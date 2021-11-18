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
    name: 'OOTD',
  },
  {
    icon: faPenFancy,
    firstCategoryName: FirstCategoryName.COLUMN,
    secondCategoryName: null,
    name: 'COLUMN',
  },
  {
    icon: faBookOpen,
    firstCategoryName: FirstCategoryName.FOLKS,
    secondCategoryName: SecondCategoryName.BRAND_REVIEW,
    name: 'REVIEW',
  },
  // {
  //   icon: faTshirt,
  //   firstCategoryName: FirstCategoryName.TALK,
  //   secondCategoryName: SecondCategoryName.FREE,
  // },
];

export const mediaStandard = 735;

export default {};
