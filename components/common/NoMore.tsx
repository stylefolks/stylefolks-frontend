interface INoMoreProps {
  text: string;
}

const NoMore: React.FC<INoMoreProps> = ({ text }) => {
  return (
    <>
      <div>{text}</div>
      {/* No More Crew 😅 */}
      <style jsx>{`
        div {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 3vw 0px;
          width: 100%;
          font-size: 3vw;
        }
      `}</style>
    </>
  );
};

export default NoMore;
