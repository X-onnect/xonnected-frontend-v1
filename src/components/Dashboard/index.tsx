import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";
import { Modal } from 'components/Shared';
import { api } from "helpers";
import { PostInterface, CONNECTION_STATUS, SubscriptionType, User } from 'helpers';
import { useRouter } from 'next/router';
import { PostSubscriptionDto, API_URL } from 'helpers';
import { CreatePost } from 'components/Shared';
import { SpinnerCircular } from 'spinners-react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'shared/state/user';
import { TbMessagePlus } from 'react-icons/tb';
import { io } from "socket.io-client";

export const Dashboard = () => {
    const { push } = useRouter();

    const setLoggedInUser = useSetRecoilState(userAtom);

    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [showQrCode, setShowQrCode] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
    const [postId, setPostId] = useState('');

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const [qrCodeError, setQrCodeError] = useState(false);
    const [qrCodeSuccess, setQrCodeSuccess] = useState(false);

    const socket = io(API_URL, { autoConnect: false });

    const getLoggedInUserInfo = async () => {
        const response = await api.get('auth/user');

        if (response.statusCode === 401) {
            push('/');
        }

        setLoggedInUser(response);
    }

    const fetchAllPosts =  async() => {
        setLoading(true);
        const response = await api.get('post/all');

        if (response.statusCode === 401) push('/');

        try {
            const sortedPosts = response.map((post: any) => {
                return { canBeViewed: post.canBeViewed, ...post.post }
            });

            setPosts(sortedPosts);
        }
        catch (e) { console.log(e) }

        setLoading(false);
    }

    const handleLikePost = async (id: string) => {
        setLoading(true);
        const response = await api.get(`post/like/${id}`);
        if (response.statusCode === 401) push('/');
        await fetchAllPosts();
        setLoading(false);
    }

    const handleDisLikePost = async (id: string) => {
        setLoading(true);
        const response = await api.get(`post/dislike/${id}`);
        if (response.statusCode === 401) push('/');
        await fetchAllPosts();
        setLoading(false);
    }

    const subscribeToPost = async (info: PostSubscriptionDto, type: SubscriptionType) => {
        setLoading(true);

        const token = localStorage.getItem("accessToken");
        const auth = { Authorization: `Bearer ${token}` };

        socket.auth = auth;

        await socket.connect();

        const requestObject = {
            receiverId: info.postCreatorId,
            amount: info.amount
        };

        socket.on('request-payment', async (data) => {
            const { error, qrCode, status } = data;

            if (error) socket.disconnect();
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
                        const apiPath = type === SubscriptionType.POST_SUBSCRIPTION? `subscribe-to-post/${info.postId}` : `subscribe-to-user/${info.postCreatorId}`;
                        const response = await api.get(`post/${apiPath}`);

                        if (response.statusCode === 401) push('/');

                        setQrCodeSuccess(true);
                        await fetchAllPosts();
                        socket.disconnect();
                    }

                }
            }
        })

        socket.emit('request-payment', JSON.stringify(requestObject));

        socket.on("connect_error", (error) => {
            console.log('connection error')
            console.log(error)
            setShowQrCode(false);
            setLoading(false);
            socket.disconnect();
        });

        socket.on("disconnect", () => {
            console.log('disconnected')
            setLoading(false);
        });
    }

    const onComment = (id: string) => {
        setPostId(id);
        setShowCreateCommentModal(true);
    }

    const onCreatePost = () => setShowCreatePostModal(true);

    const closeCommentModal = () => {
        setPostId('')
        setShowCreateCommentModal(false);
        setShowCreatePostModal(false);
    }

    const refreshPosts = async () => {
        await fetchAllPosts();
        closeCommentModal();
    }

    const unPackPosts = () => {
        return posts.map((post) => (
            <Post 
                data = { post }
                key = { post._id }
                likePost = { handleLikePost }
                unlikePost = { handleDisLikePost }
                subscribeToPost = { subscribeToPost }
                commentOnPost = { onComment }
            />
        ))
    }

    const hideQrCode = () => {
        setShowQrCode(false);
        setQrCodeError(false);
        setQrCodeSuccess(false);
    }

    const generateQrCodeMessage = () => {
        if (qrCodeSuccess) return `Payment made successfully!`
        else if (qrCodeError) return `There was an error connecting to your wallet. Please try again.`
        else return "Check the Events tab of your Xumm App to approve the transaction or scan the QR code below."
      }

    useEffect(() => {
        getLoggedInUserInfo()
        fetchAllPosts();
    }, []);
    
    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar/>

            {
                loading &&
                <div className={styles['overlay']}>
                    <SpinnerCircular size={50} speed={200} color={'white'}/>
                </div>
            }

            <div className={styles['create-post-wrapper']} onClick={onCreatePost}>
                <abbr title='Make a new post.'><TbMessagePlus className={styles['icon']} size = {40}/></abbr>
            </div>

            {
                showCreateCommentModal &&
                <CreatePost 
                    isComment = { true }
                    id = { postId }
                    handleClose = { closeCommentModal }
                    refresh = { refreshPosts }
                />
            }

            {
                showCreatePostModal &&
                <CreatePost 
                    isComment = { false }
                    handleClose = { closeCommentModal }
                    refresh = { refreshPosts }
                />
            }

            {
                showQrCode &&
                <Modal header={generateQrCodeMessage()} canClose handleClose={hideQrCode}>
                    <img src={qrCodeUrl} className={styles['qr-code']}/>
                </Modal>
            }

            <div style={{width: '100%', padding: '20px', marginTop: '40px', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                { unPackPosts() }
            </div>
        </div>
    )
};
