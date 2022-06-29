import styles from './index.module.scss'
import { BsArrowRight } from 'react-icons/bs'
import classnames from 'classnames'

interface buttonProps {
  children: JSX.Element | JSX.Element[] | string
  onClick?: () => any
  colorScheme?: 'normal' | 'white'
  className?: string
}
export function Button({children, onClick, colorScheme, className} : buttonProps){
  return(
    <div 
      className={colorScheme === 'white' ? classnames([styles.button, styles.white]) : styles.button}
      onClick={onClick}
      >
      <p className={styles.btnText}>
        {children}
      </p>
      <BsArrowRight />
    </div>
  )
}