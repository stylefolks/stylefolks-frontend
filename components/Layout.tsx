interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <section>{children}</section>
      <style jsx>{`
        section {
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
