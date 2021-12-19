import dynamic from 'next/dynamic';
import UtilStyle from 'styles/common/Util.module.scss';
import Footer from './Footer';

interface ILayout {
  children: React.ReactNode;
}

const DynamicHeader = dynamic(() => import('./Header'), { ssr: false });

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <DynamicHeader />
      <section
        className={`${UtilStyle.flexColumnCenter} ${UtilStyle.sectionMain}`}
      >
        {children}
      </section>
      <Footer />
    </>
  );
};

export default Layout;
