import React from 'react';
import Styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={Styles.containerSpinner}>
      <div className={Styles.skCircleFade}>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
        <div className={Styles.skCircleFadeDot}></div>
      </div>
    </div>
  );
};

export default Loader;
