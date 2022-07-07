import { BigLogo, Button } from 'components/Shared'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import { string as yupString } from 'yup'

export function SignupPage(){
  const [ signupDetails, setSignupDetails ] = useState({
    email: {
      value: '',
      touched: false,
      error: ''
    },
    username: {
      value: '',
      touched: false,
      error: ''
    },
    password: {
      value: '',
      touched: false,
      error: ''
    },
    confirmPassword: {
      value: '',
      touched: false,
      error: ''
    },
  })

  const { email, username, password, confirmPassword } = signupDetails

  const validationSchema: any = {
    email: yupString()
      .trim()
      .required("email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "invalid email format"
      ),
    username: yupString()
      .trim()
      .required('username is required'),
    password: yupString()
      .trim()
      .required('Password is required')
  };

  const validate = (name: string, value: string) : { value: string, error: string} => {
    let error = ''
    try {
      value = validationSchema[name]?.validateSync(value);
    } catch(err: any){
      if(err.name === "ValidationError"){
        error = err.errors.join(",")
      }
    }
    return { value, error}
  }

  const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { name, value} = event.target
    if(name === 'confirmPassword'){
      setSignupDetails(() => ({
        ...signupDetails,
        [name]: { 
          value: value.trim(), 
          touched: true, 
          error: value === '' ? 'Must confirm password' : password.value === value.trim() ? '' : 'does not match password' }
      }))
    }
    else {
      const { value: val, error } = validate(name, value)
      setSignupDetails(() => ({
        ...signupDetails,
        [name]: { value: val.trim(), touched: true, error }
      }))
    }
  }

  return(
    <div className={styles.wrapper}>
      <BigLogo />

      <div className={styles.formWrapper}>
        <p className={styles.headerText}>Sign Up</p>

        <div className={styles.form}>

          <div className={styles.formControl}>
            <label>Email Address</label>
            <input
              name='email'
              type="text"
              value={email.value}
              onChange={onChange}
            />
            <p className={styles.error}>{email.error}</p>
          </div>

          <div className={styles.formControl}>
            <label>Username</label>
            <input
              name='username'
              type="text"
              value={username.value}
              onChange={onChange}
            />
            <p className={styles.error}>{username.error}</p>
          </div>

          <div className={styles.formControl}>
            <label>Password</label>
            <input
              name='password'
              type="password"
              value={password.value}
              onChange={onChange}
            />
            <p className={styles.error}>{password.error}</p>
          </div>
  
          <div className={styles.formControl}>
            <label>Confirm Password</label>
            <input
              name='confirmPassword'
              type="password"
              value={confirmPassword.value}
              onChange={onChange}
            />
            <p className={styles.error}>{confirmPassword.error}</p>
          </div>

          <Button size="md">Sign Up</Button>
        </div>

      </div>
    </div>
  )
}