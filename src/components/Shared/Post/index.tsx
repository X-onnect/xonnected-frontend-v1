import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { PostInterface, User, api, profileImagePlaceholder } from 'helpers';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { PostSubscriptionDto, SubscriptionType } from 'helpers';
import { BsFillHandThumbsUpFill, BsCashCoin } from 'react-icons/bs';
import { MdOutlineWavingHand } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { TbDotsVertical } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'shared/state/user';
import { FiThumbsUp } from 'react-icons/fi'
import { FaRegCommentDots } from 'react-icons/fa';

interface ImageDimension {
    height?: string;
    width?: string;
}

interface PostProp {
    data: PostInterface;
    likePost: (id: string) => any;
    unlikePost: (id: string) => any;
    subscribeToPost: (data: PostSubscriptionDto, type: SubscriptionType) => any;
    commentOnPost?: (id: string) => any;
}

export const Post = (prop: PostProp) => {
    const { push } = useRouter();
    const { data, likePost, unlikePost, subscribeToPost, commentOnPost = () => {} } = prop;

    const [imageStyle, setImageStyle] = useState<ImageDimension>({ width: '100%' });
    const [userInfo, setUserInfo] = useState<User>();
    const loggedInUser = useRecoilValue(userAtom);

    const getUserInfo = async () => {
        const response = await api.get(`user/${data.createdBy}`);

        if (response.statusCode === 401) {
            push('/');
        }

        setUserInfo(response);
    }

    const resizeImage = () => {
        const image = document.getElementById(data._id);
        const realWidth = image?.clientWidth;  
        const realHeight = image?.clientHeight;

        if (realHeight && realWidth) {
            if (realHeight > realWidth) {
                setImageStyle({ height: '100%' })
            }
        }
    }

    const userLikedPostAlready = () => {
        if (data.likes.indexOf(loggedInUser?._id || '') === -1) return false;
        else return true;
    }

    const onLikePost = () => {
        if (data.canBeViewed) {
            likePost(data._id);
        }
    }

    const onDislikePost = () => {
        if (data.canBeViewed) {
            unlikePost(data._id);
        }
    }

    const subscribe = (type: SubscriptionType) => {
        const info: PostSubscriptionDto = {
            amount: type === SubscriptionType.POST_SUBSCRIPTION? data.price : parseFloat(userInfo?.profile.subscriptionPrice || '0'),
            postId: data._id,
            postCreatorId: data.createdBy,
        };

        subscribeToPost(info, type);
    }
    
    const viewFullPost = () => {
        if (data.canBeViewed) {
            push(`/post/${data._id}`);
        }
    }

    useEffect(() => {
        getUserInfo();

        resizeImage()

        const timer = setTimeout(() => {
            resizeImage()
        }, 7000)
        
        return(() => {
            clearInterval(timer);
        })
    }, []);

    return (
        <div className={styles['post-wrapper']}>
            <div className= { classNames(styles['image-holder'], data.image? '' : styles['no-image']) }>
                <div className={`${styles['profile-banner']}`} onClick={viewFullPost}>
                    <img 
                        className={classNames(styles['profile'])}
                        src = { userInfo?.profile.image || profileImagePlaceholder }
                    />

                    <div className={styles['profile-name']}>
                        <p className={styles['display-name']}>{userInfo?.profile.displayName || userInfo?.username || ''}</p>
                        <p className={styles['username']}>{userInfo? `@${userInfo.username}` : ''}</p>
                    </div>

                    <MdOutlineWavingHand className={styles['icon']} size={25}/>
                    <AiOutlineMail className={styles['icon']} size={25}/>
                    <TbDotsVertical className={styles['icon']} size={25}/>
                </div>

                { data.image && <img src={data.image} alt="post" id={data._id} style={imageStyle} className={data.canBeViewed? '' : styles.blur}/>}
            </div>
            <div className={styles['text-holder']}>
                <div className={styles['heading']}>
                    <p>
                        { ' ' }
                    </p>
                </div>
                <div className={classNames(styles['content'], data.canBeViewed? '' : styles.blur)}>
                    <p>
                        { data.text }
                    </p>
                </div>

                <div className={classNames(styles['button-holder'], data.canBeViewed? '' : styles.blur)}>
                    <div className={styles['icon-holder']}>
                        <p className={styles['text']}>{data.likes.length}</p>

                        {
                            userLikedPostAlready()?
                            <BsFillHandThumbsUpFill className={classNames(styles.icon)} size={25} onClick={() => onDislikePost() }/>
                            :
                            <FiThumbsUp className={styles['icon']} size={25} onClick={() => onLikePost() }/>
                        }

                        <p className={styles['text']}>{data.comments.length}</p>

                        <FaRegCommentDots className={styles['icon']} size={25} onClick={() => commentOnPost(data._id)}/>
                    </div>
                </div>
            </div>

            {
                !data.canBeViewed &&
                <div className={styles['vertical-wrapper']} style={{ zIndex: data.image? undefined : 12 }}>
                    <div className={styles['payment-request-wrapper']} onClick={() => subscribe(SubscriptionType.POST_SUBSCRIPTION)}>
                        <BsCashCoin className={styles['icon']} size={30}/>
                        <p className={styles['text']}>{`Pay ${data.price} XRP to subscribe to this post.`}</p>
                    </div>

                    {
                        ((userInfo?.profile.subscriptionPrice || 0) > 0) &&
                        <div className={classNames(styles['payment-request-wrapper'], styles['margin-top'])} onClick={() => subscribe(SubscriptionType.USER_SUBSCRIPTION)}>
                            <BsCashCoin className={styles['icon']} size={30}/>
                            <p className={styles['text']}>{`Pay ${userInfo?.profile.subscriptionPrice} XRP to subscribe to @${userInfo?.username} and be able to view all posts by them.`}</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}