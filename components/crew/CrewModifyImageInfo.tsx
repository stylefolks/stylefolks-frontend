import { Button } from 'components/common/button/Button';
import { folksServerNoGql } from 'config';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IPropsCrewModifyImageInfo {
  crewProfileImage: string;
  crewBackgroundImage: string;
}

const CrewModifyImageInfo: React.FC<IPropsCrewModifyImageInfo> = ({
  crewProfileImage,
  crewBackgroundImage,
}) => {
  const router = useRouter();
  const profileRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);

  const uploadCrewProfileImage = async (formBody: FormData) => {
    try {
      const { url } = await (
        await fetch(`${folksServerNoGql}/images/crew`, {
          method: 'POST',
          body: formBody,
          headers: {
            'folks-token': localStorage.getItem('folks-token'),
          },
        })
      ).json();

      if (url) {
        router.reload();
      }
      //rest api 에서 200 받으면 그냥 refresh 시켜버리는 걸로 api를 하나 만들자 ㅎㅅㅎ..
    } catch (e) {
      console.error('upload crew photo', e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      const formBody = new FormData();
      formBody.append('file', img);
      formBody.append('crewName', router.query['id'] as string);
      if (e.target.name === 'crewProfileImage') {
        formBody.append('type', 'profileImage');
      }

      if (e.target.name === 'crewBackgroundImage') {
        formBody.append('type', 'backgroundImage');
      }

      uploadCrewProfileImage(formBody);
    }
  };

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    let body;

    try {
      if (button.name === 'deleteCrewProfile') {
        body = JSON.stringify({
          crewName: router.query['id'] as string,
          type: 'profileImage',
          link: crewProfileImage,
        });
      }

      if (button.name === 'deleteCrewBackground') {
        body = JSON.stringify({
          crewName: router.query['id'] as string,
          type: 'backgroundImage',
          link: crewBackgroundImage,
        });
      }

      const res = await (
        await fetch(`${folksServerNoGql}/images/crew`, {
          method: 'PUT',
          body,
          headers: {
            'Content-Type': 'application/json',
            'folks-token': localStorage.getItem('folks-token'),
          },
        })
      ).json();

      if (res.status === 200) {
        router.reload();
      } else {
        window.alert('삭제에 실패하였습니다.');
      }
    } catch (e) {
      window.alert('에러가 발생했습니다.');
    }
  };

  return (
    <section className={CrewPageStyle.modifyImageContainer}>
      <div>
        <h4>Change crew Profile Image</h4>
        <Button
          actionText="Upload profile photo"
          canClick
          loading={false}
          name="upload"
          onClick={() => profileRef.current.click()}
        />
        <Button
          name="deleteCrewProfile"
          actionText="Remove current profile photo"
          canClick
          loading={false}
          onClick={onDelete}
        />
        <input
          ref={profileRef}
          id="uploadCrewProfileImage"
          type="file"
          accept="image/*"
          name="crewProfileImage"
          onChange={(e) => onChange(e)}
        />
      </div>

      <div>
        <h4>Change crew background Image</h4>
        <Button
          actionText="Upload background photo"
          canClick
          loading={false}
          onClick={() => backgroundRef.current.click()}
        />
        <Button
          name="deleteCrewBackground"
          actionText="Remove current background photo"
          canClick
          onClick={onDelete}
          loading={false}
        />
        <input
          ref={backgroundRef}
          id="uploadCrewBackgroundImage"
          type="file"
          accept="image/*"
          name="crewBackgroundImage"
          onChange={(e) => onChange(e)}
        />
      </div>
    </section>
  );
};
export default CrewModifyImageInfo;
