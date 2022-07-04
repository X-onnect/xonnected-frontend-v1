import { BigLogo, Button } from 'components/Shared'
import { useRouter } from 'next/router'
import styles from './index.module.scss'

export function WelcomeScreen(){
  const router = useRouter()
  return(
    <div className={styles.wrapper}>
      <BigLogo />
      <div className={styles.intro}>
        <p className={styles.welcomeText}>Welcome</p>
        <Button 
          colorScheme='normal'
          onClick={e => {
            router.push('/auth/login')
          }}
        >Sign In</Button>
        <Button 
          colorScheme='white'
          onClick={e => {
            router.push('/auth/signup')
          }}
        >Sign Up</Button>
      </div>
    </div>
  )
}