import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { PostInterface, User, api } from 'helpers';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { MdOutlineWavingHand } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { TbDotsVertical } from 'react-icons/tb';
import { FiThumbsUp } from 'react-icons/fi'
import { FaRegCommentDots } from 'react-icons/fa';

interface ImageDimension {
    height?: string;
    width?: string;
}

interface PostProp {
    data: PostInterface;
}

export const Post = (prop: PostProp) => {
    const { push } = useRouter();
    const { data } = prop;

    const imageUrl1 = "https://innovate-educate.org/wp-content/uploads/2017/08/chicago-skyline-web.jpg";
    const imageUrl2 = 'https://i.pinimg.com/originals/fa/b7/d3/fab7d3cd497298b63f2245d0642a2809.jpg';

    const profileImagePlaceholder = 'https://th.bing.com/th/id/R.f29406735baf0861647a78ae9c4bf5af?rik=GKTBhov2iZge9Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_206976.png&ehk=gCH45Zmryw3yqyqG%2fhd8WDQ53zwYfmC8K9OIkNHP%2fNU%3d&risl=&pid=ImgRaw&r=0';

    const [imageStyle, setImageStyle] = useState<ImageDimension>({ width: '100%' });
    const [userInfo, setUserInfo] = useState<User>();

    const getUserInfo = async () => {
        const response = await api.get(`user/${data.createdBy}`);

        if (response.statusCode === 401) {
            push('/');
        }

        setUserInfo(response);
    }

    useEffect(() => {
        getUserInfo();
        const image = document.getElementById(data._id);
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
            <div className= { classNames(styles['image-holder'], data.image? '' : styles['no-image']) }>
                <div className={`${styles['profile-banner']}`}>
                    <img 
                        className={styles['profile']}
                        src = { profileImagePlaceholder }
                    />

                    <div className={styles['profile-name']}>
                        <p className={styles['display-name']}>{userInfo?.username || ''}</p>
                        <p className={styles['username']}>{userInfo? `@${userInfo.username}` : ''}</p>
                    </div>

                    <MdOutlineWavingHand className={styles['icon']} size={25}/>
                    <AiOutlineMail className={styles['icon']} size={25}/>
                    <TbDotsVertical className={styles['icon']} size={25}/>
                </div>

                { data.image && <img src={data.image} alt="post" id={data._id} style={imageStyle}/>}
            </div>
            <div className={styles['text-holder']}>
                <div className={styles['heading']}>
                    <p>
                        { ' ' }
                    </p>
                </div>
                <div className={styles['content']}>
                    <p>
                        { data.text }
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