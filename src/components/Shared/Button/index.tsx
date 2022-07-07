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
  disabled?: boolean
}
export function Button({children, onClick = () => {}, colorScheme, className, size, icon, disabled} : buttonProps){
  const classes = []
  classes.push(styles.button)
  if(colorScheme === 'white') classes.push(styles.white)
  if(size === 'md') classes.push(styles.md)
  if(className) classes.push(className)
  if(disabled) classes.push(styles.disabled)

  return(
    <div 
      className={classnames(classes)}
      onClick={ (event) => { disabled? '' : onClick(event)}}
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