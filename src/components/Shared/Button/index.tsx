import styles from './index.module.scss'
import { BsArrowRight } from 'react-icons/bs'
import classnames from 'classnames'
import { MouseEventHandler } from 'react'
import { SpinnerCircular } from 'spinners-react'

interface buttonProps {
  children: JSX.Element | JSX.Element[] | string
  onClick?: MouseEventHandler<HTMLElement>
  colorScheme?: 'normal' | 'white'
  className?: string
  size?: 'lg' | 'md'
  icon?: JSX.Element
  disabled?: boolean
  loading?: boolean
}
export function Button({children, onClick = () => {}, colorScheme, className, loading, size, icon, disabled} : buttonProps){
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
        icon ? icon : loading ?  <SpinnerCircular speed={200} color='white' /> : <BsArrowRight />
      }
    </div>
  )
}