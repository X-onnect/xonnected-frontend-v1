import styles from './index.module.scss'
import { BsArrowRight } from 'react-icons/bs'
import classnames from 'classnames'

interface buttonProps {
  children: JSX.Element | JSX.Element[] | string
  onClick?: () => any
  colorScheme?: 'normal' | 'white'
  className?: string
  size?: 'lg' | 'md'
}
export function Button({children, onClick, colorScheme, className, size} : buttonProps){
  const classes = []
  classes.push(styles.button)
  if(colorScheme === 'white') classes.push(styles.white)
  if(size === 'md') classes.push(styles.md)
  if(className) classes.push(className)

  return(
    <div 
      className={classnames(classes)}
      onClick={onClick}
    >
      <p className={styles.btnText}>
        {children}
      </p>
      <BsArrowRight />
    </div>
  )
}