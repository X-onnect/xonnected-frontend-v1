import classNames from 'classnames'
import { api, convertToBase64 } from 'helpers'
import { ChangeEvent, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { TbCameraPlus } from 'react-icons/tb'
import { SpinnerCircular } from 'spinners-react'
import styles from './index.module.scss'

interface IProfileModal{
  isOpen: boolean
  handleClose: () => void
  image: string 
  displayName: string 
  subscriptionPrice: string
}
export function Profile({ isOpen, handleClose, image, displayName, subscriptionPrice } : IProfileModal){
  const fallbackImage = '/img/icons/default-image.jpg'
  const [ dp, setDp ] = useState(image ? image : fallbackImage)
  const [ name, setName ] = useState(displayName ? displayName : 'N/A')
  const [ sub, setSub ] =  useState(subscriptionPrice ? subscriptionPrice : '0')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  const onImageUpload = async (e: any) => {
    const { files } = e.target
    const image = await convertToBase64(files[0])
    if(!image.error) setDp(image)
  }

  const handleSubmit =  async () => {
    setError(false)
    setLoading(true)
    const payload = {
      image: dp === fallbackImage ? '' : dp,
      displayName: name === 'N/A' ? '' : name,
      subscriptionPrice: parseFloat(sub)
    }
    const response = await api.put('user/profile', payload)
    setLoading(false)

    if(response.error || response.statusCode === 413) {
      setError(true)
    }
    else{
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 2400)
    }
  }
  return(
    <div className={isOpen ? styles['profile-wrapper'] : classNames([styles['profile-wrapper'], styles.close]) }>
      <div className={ styles['profile'] }>
        <BsX className={styles['close-icon']} onClick={handleClose}/>
        <div className={styles['profile-picture']}>
          <img src={dp}/>
          <div className={styles['change-profile-pic-wrapper']}>
            <label className={styles['change-profile-pic']}>
              <TbCameraPlus />
              <input onChange={onImageUpload} type={'file'} accept='image/*'/>
            </label>
          </div>
        </div>  
        <div className={styles['form-row']} title={'Can edit'}>
          <label>Display Name:</label>
          <input value={name} onChange={ e => setName(e.target.value)} name={'name'} type={'text'}/>
        </div>
        <div className={styles['form-row']} title={'Can edit'}>
          <label>Subscription Price (XRP):</label>
          <input value={sub} onChange={e => setSub(e.target.value)} name={'sub'} type={'number'}/>
        </div>
        <div className={styles['form-row']}>
          <button onClick={handleSubmit} className={styles['submit-button']} disabled={ loading || success }>
            {
              loading ? 
                <SpinnerCircular size={25} speed={200} color={'white'}/> : error ? 
                  'Retry' : 'Update'
            }
          </button>
        </div>
        {
            error && 
            <small className={styles.feedback}>
              Update failed. Please choose an image size less than 5mb.
            </small>
          }
          {
            success && 
            <small className={styles.feedback} style={{color: 'green'}}>
              Update successful
            </small>
          }
      </div>
    </div>
  )
}