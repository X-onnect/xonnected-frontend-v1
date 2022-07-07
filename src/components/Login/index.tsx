import React, { useState } from 'react';
import { BigLogo, Button, Modal } from "components/Shared";
import styles from './index.module.scss';
import { api } from 'helpers';
import { io } from "socket.io-client";
import { CONNECTION_STATUS } from 'helpers';
import { API_URL } from 'helpers';
import { Router, useRouter } from 'next/router';


export function LoginPage(){
  const API_URL_LOCAL = 'http://localhost:5000';
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [qrCodeError, setQrCodeError] = useState(false);
  const [qrCodeSuccess, setQrCodeSuccess] = useState(false);

  const socket = io(API_URL, { autoConnect: false });

  const { push } = useRouter();

  const onLogIn = async () => {
    setLoading(true);
    const response = await api.post('auth/login', { email, password });

    if (response.statusCode === 401) {
      setIsError(true);
      setLoading(false);
    }
    else {
      const token = response.access_token;
      localStorage.setItem("accessToken", token);
      const auth = { Authorization: `Bearer ${token}` };

      socket.auth = auth;
      await socket.connect();

      socket.on('connect-wallet', (data) => {
        const { error, qrCode, status } = data;

        if (error) {
          setIsError(true);
        }
        else {
          if (qrCode) {
            setLoading(false);
            setQrCodeUrl(qrCode);
            setShowQrCode(true);

            if (status === CONNECTION_STATUS.FAILED) {
              setQrCodeError(true);
              setQrCodeUrl('');
              socket.disconnect();
            }

            if (status === CONNECTION_STATUS.SUCCESSFUL) {
              setQrCodeSuccess(true);
              push('/dashboard');
              socket.disconnect();
            }
          }
        }

      })

      socket.emit('connect-wallet', 'let me in');

      socket.on("connect_error", () => {
        setIsError(true);
      })

      socket.on("connect_error", () => {
        setIsError(true);
        setShowQrCode(false)
      })
    }
  }

  const hideQrCode = () => {
    setShowQrCode(false);
    setQrCodeError(false);
    setQrCodeSuccess(false);
    socket.connect();
    socket.disconnect();
  }

  const canLogIn = () => {
    if (password && email) return true;
    else return false;
  }

  const generateQrCodeMessage = () => {
    if (qrCodeSuccess) return `Connected to your wallet successfully!`
    else if (qrCodeError) return `There was an error connecting to your wallet. Please try logging in again.`
    else return "To proceed, please scan this QR code with your XUMM App."
  }

  return(
    <div className={styles.wrapper}>

      {
        showQrCode &&
        <Modal header={generateQrCodeMessage()} canClose handleClose={hideQrCode}>
          <img src={qrCodeUrl} className={styles['qr-code']}/>
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
            <label>{ isError? `Invalid email and/or password. Also check your connection.` : ' ' }</label>
          </div>

          <Button size="md" onClick={onLogIn} disabled={!canLogIn()} loading={loading}>Log In</Button>
        </div>

      </div>
    </div>
  )
}