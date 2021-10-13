import ButtonStyle from '../../styles/Buttons.module.scss';

interface IBurgerButtonProps {
  onClick: () => null;
}

const BurgerButton = ({ onClick }) => {
  return (
    <button className={ButtonStyle.burgerButtonContainer} onClick={onClick}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default BurgerButton;
