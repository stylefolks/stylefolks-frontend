import { makeVar, ReactiveVar } from '@apollo/client';

interface IUploadDialogVar {
  title: string;
  content: string;
  visible: boolean;
}

export const uploadDialogVar: ReactiveVar<IUploadDialogVar> = makeVar({
  title: '',
  content: '',
  visible: false,
});
