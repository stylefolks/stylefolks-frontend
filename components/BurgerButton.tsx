import UtilStyle from '../styles/Util.module.scss';

const BurgerButton = () => {
  return (
    <button
      className={`${UtilStyle.burgerButtonContainer} ${UtilStyle.flexColumnCenter}`}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default BurgerButton;
