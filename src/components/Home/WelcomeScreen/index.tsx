import { BigLogo, Button } from 'components/Shared'
import styles from './index.module.scss'

export function WelcomeScreen(){
  return(
    <div className={styles.wrapper}>
      <BigLogo />
      <div className={styles.intro}>
        <p className={styles.welcomeText}>Welcome</p>
        <Button colorScheme='normal'>Sign In</Button>
        <Button colorScheme='white'>Sign Up</Button>
      </div>
    </div>
  )
}