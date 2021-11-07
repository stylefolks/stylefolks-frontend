import dynamic from 'next/dynamic';
import UtilStyle from '../styles/Util.module.scss';
import Footer from './Footer';

interface ILayout {
  children: React.ReactNode;
}

const DynamicHeader = dynamic(() => import('./Header'), { ssr: false });

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <DynamicHeader />
      <section className={`${UtilStyle.flexColumnCenter} .section-main`}>
        {children}
      </section>
      <Footer />
      <style jsx>{`
        .section-main {
          margin: 0 auto;
          height: 100%;
          width: 100%;
          min-height: calc(100vh - 200px - 25px);
          //min-height: calc(100vh + 20px);
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Layout;
