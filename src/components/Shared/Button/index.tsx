import styles from './index.module.scss'
import { BsArrowRight } from 'react-icons/bs'
import classnames from 'classnames'
import { MouseEventHandler } from 'react'

interface buttonProps {
  children: JSX.Element | JSX.Element[] | string
  onClick?: MouseEventHandler<HTMLElement>
  colorScheme?: 'normal' | 'white'
  className?: string
  size?: 'lg' | 'md'
  icon?: JSX.Element
}
export function Button({children, onClick, colorScheme, className, size, icon} : buttonProps){
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
      {
        icon ? icon : <BsArrowRight />
      }
    </div>
  )
}