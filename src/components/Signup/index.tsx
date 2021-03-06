import { BigLogo, Button, Modal } from 'components/Shared'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import { string as yupString } from 'yup'
import { api } from 'helpers'
import { useRouter } from 'next/router'

export function SignupPage(){
  const router = useRouter()
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
  const [ loading, setLoading ] = useState(false)
  const [ signupError, setSignupError ] = useState(false)
  const [ signupSuccess, setSignupSuccess ] = useState(false)

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

  const isValid = () => {
    if((email.touched && !email.error) &&
    (username.touched && !username.error) && 
    (password.touched && !password.error) && 
    (confirmPassword.touched && !confirmPassword.error)){
      return true
    } 
    return false
  }

  const handleSubmit = async () => {
    setSignupSuccess(false)
    setSignupError(false)
    setLoading(true);
    const payload = {
      email: email.value,
      username: username.value,
      password: password.value,
    }

    const response = await api.post('auth/signup', payload)
    setLoading(false)
    if(response.error){
      console.log(response)
      setSignupError(true)
    }
    else{
      console.log(response)
      setSignupSuccess(true)
    }
  }

  return(
    <div className={styles.wrapper}>
      {
        signupSuccess && 
        <Modal
          header='SUCCESS'
          buttonText='Log In'
          onButtonClick={() => {
            router.push('/auth/login')
          }}
        >
          Your profile was successfully created. Please go to login page.
        </Modal>
      }

      {
        signupError &&
        <Modal
          header='FAILED'
          buttonText='Retry'
          canClose={true}
          handleClose={() => setSignupError(false)}
          onButtonClick={() => {
            handleSubmit()
          }}
        >
          There was an error. Kindly check your network and try again.
        </Modal>
      }
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

          <Button 
            disabled={!isValid() || loading}
            size="md" 
            loading={loading}
            onClick={handleSubmit}
            >Sign Up</Button>
        </div>

      </div>
    </div>
  )
}