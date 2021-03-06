import ButtonStyle from 'styles/common/Buttons.module.scss';

interface IQuitButtonProps {
  onClick: () => void;
}

const QuitButton: React.FC<IQuitButtonProps> = ({ onClick }) => {
  return (
    <button className={ButtonStyle.quitButtonContainer} onClick={onClick}>
      <div />
    </button>
  );
};

export default QuitButton;
