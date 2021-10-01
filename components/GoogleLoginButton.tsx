import Image from 'next/image';
import GoogleLogo from '../public/google.png';
import UtilStyle from '../styles/Util.module.scss';

const GoogleLoginButton = () => {
  return (
    <>
      <button className={UtilStyle.button}>
        <Image
          src={GoogleLogo}
          alt="googleLogo"
          width="15px"
          height="15px"
          className="imageHover"
        />
        <span>START WITH GOOGLE</span>
      </button>
      <style jsx>{`
        button {
          width: 100%;
        }
        .imageHover:hover {
          background-color: black;
        }
      `}</style>
    </>
  );
};

export default GoogleLoginButton;
