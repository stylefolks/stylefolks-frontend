import { Button } from 'components/common/Button';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

interface IPropsCrewModifyImageInfo {}

const CrewModifyImageInfo: React.FC<IPropsCrewModifyImageInfo> = () => {
  const router = useRouter();
  const profileRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);

  const uploadCrewProfileImage = async (formBody: FormData) => {
    console.log(formBody);

    try {
      const { url } = await (
        await fetch('http://localhost:4000/images/crew', {
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
          actionText="Remove current profile photo"
          canClick
          loading={false}
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
          actionText="Remove current background photo"
          canClick
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
