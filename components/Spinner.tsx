import SpinnerPortal from 'HOC/SpinnerPortal';
import React from 'react';
import BackDrop from './BackDrop';
import UtilStyle from '../styles/Util.module.scss';

const Spinner = () => {
  return (
    <SpinnerPortal>
      <BackDrop>
        <ul className={UtilStyle.spinnerContainer}>
          <li>NOW</li>
          <li>IT IS</li>
          <li>LOADING</li>
          <li>NOW</li>
          <li>IT IS</li>
          <li>LOADING</li> <li>NOW</li>
          <li>IT IS</li>
          <li>LOADING</li> <li>NOW</li>
          <li>IT IS</li>
          <li>LOADING</li> <li>NOW</li>
          <li>IT IS</li>
          <li>LOADING</li>
        </ul>
      </BackDrop>
    </SpinnerPortal>
  );
};

export default Spinner;