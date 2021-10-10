import FooterStyle from '../styles/Footer.module.scss';
const Footer = () => {
  return (
    <>
      <footer className={FooterStyle.footerContainer}>Footer</footer>
      <style jsx>{`
        footer {
          height: 100px;
          background-color: gray;
        }
      `}</style>
    </>
  );
};

export default Footer;
