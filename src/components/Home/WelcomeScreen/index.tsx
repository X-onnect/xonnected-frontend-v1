import { BigLogo } from 'components/Shared'
import styles from './index.module.scss'

export function WelcomeScreen(){
  return(
    <div className={styles.wrapper}>
      <BigLogo />
      <div className={styles.intro}>
        <p>Welcome</p>
      </div>
    </div>
  )
}