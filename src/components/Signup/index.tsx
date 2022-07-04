import { BigLogo, Button } from 'components/Shared'
import styles from './index.module.scss'

export function SignupPage(){
  return(
    <div className={styles.wrapper}>
      <BigLogo />

      <div className={styles.formWrapper}>
        <p className={styles.headerText}>Sign Up</p>

        <div className={styles.form}>

          <div className={styles.formControl}>
            <label>Email Address</label>
            <input
              type="text"
            />
          </div>

          <div className={styles.formControl}>
            <label>Username</label>
            <input
              type="text"
            />
          </div>

          <div className={styles.formControl}>
            <label>Password</label>
            <input
              type="password"
            />
          </div>
  
          <div className={styles.formControl}>
            <label>Confirm Password</label>
            <input
              type="password"
            />
          </div>

          <Button size="md">Sign Up</Button>
        </div>

      </div>
    </div>
  )
}