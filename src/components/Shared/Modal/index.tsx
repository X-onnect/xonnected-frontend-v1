import classNames from 'classnames';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import styles from './index.module.scss';

interface ModalProps {
  children?: JSX.Element | JSX.Element[] | string
  header?: string
  canClose?: boolean
  handleClose?: () => any
  buttonText?: string
  onButtonClick?: () => any
}

export function Modal({ children, header, canClose, handleClose, buttonText, onButtonClick } : ModalProps){

  return(
    <div 
      className={ styles.wrapper } 
    >
      <div className={styles.modal}>
        { 
          canClose === true && <BsX onClick={handleClose}/>
        }
        <p className={styles.header}>{header}</p>
        <div className={styles.content}>
          { children }
        </div>
        {
          buttonText && <button className={styles.button} onClick={onButtonClick}>{buttonText}</button>
        }
      </div>
    </div>
  )
}