import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { MdOutlineWavingHand } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { TbDotsVertical } from 'react-icons/tb';
import { FiThumbsUp } from 'react-icons/fi'
import { FaRegCommentDots } from 'react-icons/fa';

interface ImageDimension {
    height?: string;
    width?: string;
}

export const Post = () => {
    const imageUrl1 = "https://innovate-educate.org/wp-content/uploads/2017/08/chicago-skyline-web.jpg";
    const imageUrl2 = 'https://i.pinimg.com/originals/fa/b7/d3/fab7d3cd497298b63f2245d0642a2809.jpg'

    const [imageStyle, setImageStyle] = useState<ImageDimension>({ width: '100%' });

    useEffect(() => {
        const image = document.getElementById(imageUrl1);
        const realWidth = image?.clientWidth;  
        const realHeight = image?.clientHeight;

        if (realHeight && realWidth) {
            if (realHeight > realWidth) {
                setImageStyle({ height: '100%' })
            }
        }
    }, []);

    return (
        <div className={styles['post-wrapper']}>
            <div className={`${styles['image-holder']}`}>
                <div className={`${styles['profile-banner']}`}>
                    <img 
                        className={styles['profile']}
                        src = 'https://th.bing.com/th/id/R.9007f637a39e11c190de868c49e63a7d?rik=jxklFZ9rfjk08g&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f03%2f03%2f319006-portrait-face-women.jpg&ehk=Lh%2fYSglHibTC2R2e5UKQSgDz05rCN8BfPZ6rh%2bK88oU%3d&risl=&pid=ImgRaw&r=0'
                    />

                    <div className={styles['profile-name']}>
                        <p className={styles['display-name']}>Smith Simon</p>
                        <p className={styles['username']}>@smith_simon</p>
                    </div>

                    <MdOutlineWavingHand className={styles['icon']} size={25}/>
                    <AiOutlineMail className={styles['icon']} size={25}/>
                    <TbDotsVertical className={styles['icon']} size={25}/>
                </div>

                <img src={imageUrl2} alt="post" id={imageUrl1} style={imageStyle}/>
            </div>
            <div className={styles['text-holder']}>
                <div className={styles['heading']}>
                    <p>
                        #Travel tips
                    </p>
                </div>
                <div className={styles['content']}>
                    <p>
                        If you needed to use a mobile map or order for a cab in a country that doesn’t speak English, 
                        how do you intend to stay connected? There are various internet bundles that require a 
                        purchase of a new sim.......
                    </p>
                </div>

                <div className={styles['button-holder']}>
                    <div className={styles['icon-holder']}>
                        <FiThumbsUp className={styles['icon']} size={25}/>
                        <FaRegCommentDots className={styles['icon']} size={25}/>
                    </div>
                </div>
            </div>
        </div>
    )
}