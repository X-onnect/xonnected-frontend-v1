import { BsX } from 'react-icons/bs'
import styles from './index.module.scss'

export function CreatePost(){

  return(
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <BsX className={styles.closeIcon}/>
        <div className={styles.post}>
          <p className={styles.header}>Create Post</p>
          <textarea className={styles.article} cols={10}/>
          <div className={styles['image-input']}>
            <label>Upload Image  </label>
            <input type='file' accept='image/*'/>
          </div>
          <button className={styles['post-button']}>Post</button>
        </div>
      </div>
    </div>
  )
}