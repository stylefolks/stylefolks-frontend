import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';

export interface IButtonMap {
  icon: IconDefinition;
  firstCategoryName: FirstCategoryName;
  secondCategoryName: SecondCategoryName;
  name: string;
}

export interface IPickCategory {
  firstCategoryName: FirstCategoryName;
  secondCategoryName: SecondCategoryName;
}

export default {};
