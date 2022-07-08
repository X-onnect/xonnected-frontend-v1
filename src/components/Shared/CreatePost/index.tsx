import { api, convertToBase64 } from 'helpers'
import { ChangeEventHandler, useState } from 'react'
import { BsX } from 'react-icons/bs'
import { SpinnerCircular } from 'spinners-react'
import styles from './index.module.scss'

interface CreatePostProps {
  isComment?: boolean
  handleClose?: () => any
  refresh: () => any 
  id?: string
}
export function CreatePost({ isComment, handleClose, refresh, id } : CreatePostProps){
  const [ text, setText ] = useState('')
  const [ image, setImage ] = useState('')
  const [ isFree, setIsFree ] = useState(true)
  const [ price, setPrice ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  const onImageUpload = async (e: any) => {
    const { files } = e.target
    const image = await convertToBase64(files[0])
    if(!image.error) setImage(image)
  }

  const resetState = () => {
    setText('')
    setImage('')
    setIsFree(true)
    setPrice('')
    setError(false)
    setSuccess(false)
  }

  const handleSubmit = async () => {
    setError(false)
    setLoading(true)
    const payload = isComment ? { image, text, isFree: true, price: 0 } : { image, text, isFree, price: parseInt(price) }
    const response = isComment? await api.post(`post/comment/${id}`, payload): await api.post('post', payload)
    setLoading(false)
    if(response.error) {
      setError(true)
    }
    else{
      setSuccess(true)
      setTimeout(() => {
        resetState()
        refresh()
      }, 2000);
    }
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <BsX onClick={ loading ? () => {} : handleClose } className={styles.closeIcon}/>
        <div className={styles.post}>
          <p className={styles.header}>
            {
              isComment ? 'Comment On Post' : 'Create Post'
            }
          </p>
          {
            image && 
            <img src={image} />
          }
          <textarea onChange={e => setText(e.target.value)} className={styles.article} cols={10} value={text}/>
          <div className={styles['image-input']}>
            <label className={styles.label}>Upload Image: </label>
            <input onChange={onImageUpload} type='file' accept='image/*'/>
          </div>
          {
            !isComment &&
            <div className={styles.price}>
              <div>
                <label className={styles.label}>Can be viewed for free</label>
                <input  style={{cursor: 'pointer'}} onClick={() => setIsFree(value => !value)} checked={isFree} type={'checkbox'} />
              </div>
              {
                !isFree && 
                <div>
                  <label className={styles.label}>Price (XRP)</label>
                  <input onChange={e => setPrice(e.target.value)} className={styles.number} type={'number'}/>
                </div>
              }
              
            </div> 
          }
          
          <button onClick={handleSubmit} disabled={ text==='' || loading || success } className={styles['post-button']}>
            {
              loading ? <SpinnerCircular size={20} speed={200} color={'white'}/> : error ? 'Retry' : isComment ? 'Comment' : 'Post'
            }
          </button>
          {
            error && 
            <small className={styles.feedback}>
              Upload failed. Please try again
            </small>
          }
          {
            success && 
            <small className={styles.feedback} style={{color: 'green'}}>
              Upload successful
            </small>
          }

        </div>
      </div>
    </div>
  )
}