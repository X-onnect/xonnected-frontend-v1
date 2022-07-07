import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";
import { Modal } from 'components/Shared';
import { api } from "helpers";
import { PostInterface, CONNECTION_STATUS } from 'helpers';
import { useRouter } from 'next/router';
import { PostSubscriptionDto, API_URL } from 'helpers';
import { io } from "socket.io-client";

export const Dashboard = () => {
    const { push } = useRouter();

    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [showQrCode, setShowQrCode] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [qrCodeError, setQrCodeError] = useState(false);
    const [qrCodeSuccess, setQrCodeSuccess] = useState(false);

    const socket = io(API_URL, { autoConnect: false });

    const fetchAllPosts =  async() => {
        const response = await api.get('post/all');

        if (response.statusCode === 401) push('/');

        try {
            const sortedPosts = response.map((post: any) => {
                return { canBeViewed: post.canBeViewed, ...post.post }
            });

            setPosts(sortedPosts);
        }
        catch (e) { console.log(e) }
    }

    const handleLikePost = async (id: string) => {
        const response = await api.get(`post/like/${id}`);
        if (response.statusCode === 401) push('/');
        fetchAllPosts();
    }

    const handleDisLikePost = async (id: string) => {
        const response = await api.get(`post/dislike/${id}`);
        if (response.statusCode === 401) push('/');
        fetchAllPosts();
    }

    const subscribeToPost = async (info: PostSubscriptionDto) => {
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
                        const response = await api.get(`post/subscribe-to-post/${info.postId}`);

                        if (response.statusCode === 401) push('/');

                        setQrCodeSuccess(true);
                        fetchAllPosts();
                        socket.disconnect();
                    }

                }
            }
        })

        socket.emit('request-payment', JSON.stringify(requestObject));

        socket.on("connect_error", () => {
            setShowQrCode(false);
            socket.disconnect();
        });
    }

    const unPackPosts = () => {
        return posts.map((post) => (
            <Post 
                data = { post }
                key = { post._id }
                likePost = { handleLikePost }
                unlikePost = { handleDisLikePost }
                subscribeToPost = { subscribeToPost }
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
        else return "Check the Requests tab of your Xumm App to approve the transaction or scan the QR code below."
      }

    useEffect(() => {
        fetchAllPosts();
    }, []);
    
    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar />

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
