import styles from './index.module.scss'

export function BigLogo(){

  return(
    <div className={styles.wrapper}>
      <img className={styles.logoSmall} src='/img/icons/logo-small.png' alt='xonnected logo' />
      <img className={styles.logoBig} src='/img/icons/logo-big.png' alt='xonnected logo' />
    </div>
  )
}