import classNames from 'classnames';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import styles from './index.module.scss';

interface ModalProps {
  children?: JSX.Element | JSX.Element[] | string
  header?: string
  canClose?: boolean
}

export function Modal({ children, header, canClose } : ModalProps){

  const [ open, setOpen ] = useState(true)
  const onClose = () => {
    setOpen(false)
  }
  return(
    <div 
      className={ open === true ? styles.wrapper : classNames(styles.wrapper, styles.close)} 
      >
      <div className={styles.modal}>
        { 
          canClose === true && <BsX onClick={onClose}/>
        }
        <p className={styles.header}>{header}</p>
        <div className={styles.content}>
          { children }
        </div>
      </div>
    </div>
  )
}