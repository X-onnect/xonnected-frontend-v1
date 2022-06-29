import styles from 'index.module.scss'
import { BsArrowRight } from 'react-icons/bs'

interface buttonProps {
  children: JSX.Element | JSX.Element[] | string
  onClick?: () => any
  size: 'small' | 'large'
  colorScheme: 'normal' | 'white'
  className?: string
}
export function Button({children, onClick, size, colorScheme, className} : buttonProps){
  return(
    <div className={styles.button}>
      <p className={styles.btnText}>
        {children}
      </p>
      <BsArrowRight />
    </div>
  )
}