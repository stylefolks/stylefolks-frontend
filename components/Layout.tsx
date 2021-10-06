import UtilStyle from '../styles/Util.module.scss';
import Footer from './Footer';
import Header from './Header';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <section className={`${UtilStyle.flexColumnCenter} .section-main`}>
        {children}
      </section>
      <Footer />
      <style jsx>{`
        .section-main {
          height: 100%;
          min-height: calc(100vh - 200px - 25px);
          //min-height: calc(100vh + 20px);
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Layout;
