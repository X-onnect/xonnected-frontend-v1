import React, { useState } from 'react';
import { BigLogo, Button, Modal } from "components/Shared";
import styles from './index.module.scss';
import { api } from 'helpers';
import { io } from "socket.io-client";
import { API_URL } from 'helpers';


export function LoginPage(){
  const [showQrCode, setShowQrCode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const onLogIn = async () => {
    const response = await api.post('auth/login', { email, password });

    if (response.statusCode === 401) {
      setIsError(true);
    }
    else {
      const auth = { authorization: `Bearer ${response.access_token}` };
      const socket = io(API_URL, { autoConnect: false, auth });

      await socket.connect();

      socket.on("connect", () => {
        console.log("we're in baby");
      });

      socket.emit('connect-wallet');

      socket.on('connect-wallet', (data) => {
        console.log(data)
      })

      socket.on("disconnect", () => {
        console.log("we're out of this baby");
      })

      setShowQrCode(true);
    }
  }

  const hideQrCode = () => {
    setShowQrCode(false);
  }

  const canLogIn = () => {
    if (password && email) return true;
    else return false;
  }

  return(
    <div className={styles.wrapper}>

      {
        showQrCode &&
        <Modal header="To proceed, please scan this QR code with your XUMM App." canClose handleClose={hideQrCode}>
          <img src="/img/qr-code-sample.png" className={styles['qr-code']}/>
        </Modal>
      }

      <BigLogo />

      <div className={styles.formWrapper}>
        <p className={styles.headerText}>Sign In</p>

        <div className={styles.form}>

          <div className={styles.formControl}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => {setEmail(event.target.value); setIsError(false);}}
            />
          </div>

          <div className={styles.formControl}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => { setPassword(event.target.value); setIsError(false)}}
            />
          </div>

          <div className={styles.errorControl}>
            <label>{ isError? `Invalid email and/or password.` : ' ' }</label>
          </div>

          <Button size="md" onClick={onLogIn} disabled={!canLogIn()}>Log In</Button>
        </div>

      </div>
    </div>
  )
}