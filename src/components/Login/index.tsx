import { BigLogo, Button } from "components/Shared";
import styles from './index.module.scss'

import { GrCheckmark } from 'react-icons/gr'

export function LoginPage(){
  return(
    <div className={styles.wrapper}>
      <BigLogo />
      <div className={styles.formWrapper}>
        <p className={styles.headerText}>Sign In</p>

        <div className={styles.form}>

          <div className={styles.formControl}>
            <label>Email Address</label>
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
  
          <Button 
            size="md" 
            colorScheme="white"
            // icon={<GrCheckmark />}
          >Connect Wallet</Button>
          <Button size="md">Log In</Button>
        </div>

      </div>
    </div>
  )
}