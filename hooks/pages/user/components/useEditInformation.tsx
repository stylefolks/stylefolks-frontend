import { useMutation } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import { EDIT_PROFILE } from 'graphql/user/mutations';
import { useLazyMe } from 'hooks/common/useMe';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';

interface EditUserInformation {
  modalNickname: string;
  modalLink: string;
}

const useEditInformation = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<EditUserInformation>({ mode: 'onChange' });
  const user = userInfoVar();
  const [getAndSaveUserData] = useLazyMe();
  const route = useRouter();

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      const { modalNickname, modalLink } = getValues();
      userInfoVar({
        ...user,
        link: modalLink,
        nickname: modalNickname,
      });
      isVisibleEditProfileModalVar(false);
      getAndSaveUserData();
      route.push(`/user/${modalNickname}`);
    }
  };

  const [editProfileMutation, {}] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted,
  });

  const onSubmit = () => {
    //react-hook-form은 리렌더가 되어 값이 변경되는것이 아니므로 호출시점에 값을 들고와야한다.
    const { modalNickname, modalLink } = getValues();
    editProfileMutation({
      variables: {
        input: {
          link: modalLink,
          nickname: modalNickname,
          profileImg: user.profileImg,
        },
      },
    });
  };

  return {
    state: { user, isValid, errors },
    actions: { onSubmit, register, handleSubmit },
  };
};

export default useEditInformation;
