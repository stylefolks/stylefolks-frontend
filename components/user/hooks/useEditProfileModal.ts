import { useMutation, useReactiveVar } from '@apollo/client';
import { userInfoVar } from 'cache/common/common.cache';
import { isVisibleEditProfileModalVar } from 'cache/user/user.cache';
import { CHANGE_PASSWORD, EDIT_PROFILE } from 'graphql/user/mutations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  changePassword,
  changePasswordVariables,
} from 'src/__generated__/changePassword';
import {
  editProfile,
  editProfileVariables,
} from 'src/__generated__/editProfile';

interface IlocalPw {
  pw: string;
  changePw: string;
  checkPw: string;
}

interface IProps {
  doRefetch: () => void;
  doUseMeRefetch: () => void;
}

const useEditProfileModal = ({ doRefetch, doUseMeRefetch }: IProps) => {
  const router = useRouter();
  const visible = useReactiveVar(isVisibleEditProfileModalVar);
  const user = useReactiveVar(userInfoVar);
  const [localVal, setLocalVal] = useState({ nick: '', link: '' });
  const [isChangePw, setIsChangePw] = useState<boolean>(false);
  const [localPw, setLocalPw] = useState<IlocalPw>({
    pw: '',
    changePw: '',
    checkPw: '',
  });

  const onCompleted = (data: editProfile) => {
    if (data.editProfile.ok) {
      userInfoVar({
        ...user,
        link: localVal.link,
        nickname: localVal.nick,
      });
      isVisibleEditProfileModalVar(false);
      doRefetch();
      doUseMeRefetch();
      router.push(`/user/${localVal.nick}`);
    }
  };

  const onCompletedChangePw = (data: changePassword) => {
    if (data.changePassword.ok) {
      isVisibleEditProfileModalVar(false);
      alert('비밀번호 변경이 완료되었습니다.');
    }
    if (data.changePassword.error) {
      isVisibleEditProfileModalVar(false);
      alert(`비밀번호 변경${data.changePassword.error}`);
    }
  };

  const [
    changePasswordMutation,
    { data: changePasswordData, loading, error: changePasswordError },
  ] = useMutation<changePassword, changePasswordVariables>(CHANGE_PASSWORD, {
    onCompleted: onCompletedChangePw,
  });

  const [editProfileMutation, {}] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE, {
    onCompleted,
  });

  const onSave = () => {
    editProfileMutation({
      variables: {
        input: {
          link: localVal.link,
          nickname: localVal.nick,
          profileImg: user.profileImg,
        },
      },
    });
  };

  const onSaveChangePassword = () => {
    changePasswordMutation({
      variables: {
        input: {
          password: localPw.pw,
          changePassword: localPw.changePw,
        },
      },
    });
  };

  const onQuit = () => {
    setLocalPw({ pw: '', changePw: '', checkPw: '' });
    setIsChangePw(false);
    isVisibleEditProfileModalVar(false);
  };

  return {
    state: { visible, isChangePw, user, localPw, localVal, loading },
    actions: {
      setLocalVal,
      setLocalPw,
      setIsChangePw,
      onSaveChangePassword,
      onSave,
      onQuit,
    },
  };
};

export default useEditProfileModal;
