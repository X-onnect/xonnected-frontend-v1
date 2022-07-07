import classNames from 'classnames';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import styles from './index.module.scss';

interface ModalProps {
  children?: JSX.Element | JSX.Element[] | string
  header?: string
  canClose?: boolean
  handleClose?: () => any
}

export function Modal({ children, header, canClose, handleClose } : ModalProps){

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
      </div>
    </div>
  )
}