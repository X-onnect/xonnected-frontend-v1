import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";
import { Modal } from 'components/Shared';
import { api } from "helpers";
import { PostInterface, CONNECTION_STATUS } from 'helpers';
import { useRouter } from 'next/router';
import { PostSubscriptionDto, API_URL } from 'helpers';

export const Comments = () => {
    const { asPath, push } = useRouter();
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState<PostInterface>();
    const [comments, setComments] = useState<PostInterface[]>([]);

    const fetchAllPosts =  async(id: string) => {
        const response = await api.get(`post/id/${id}`);

        if (response.statusCode === 401) push('/');
        const sortedPost = { ...response.post, canBeViewed: response.canBeViewed, comments: response.comments }

        setPost(sortedPost);
        setComments(sortedPost.comments);

        console.log(response)
    }

    const handleLikePost = async (id: string) => {
        const response = await api.get(`post/like/${id}`);
        if (response.statusCode === 401) push('/');
        fetchAllPosts(postId);
    }

    const handleDisLikePost = async (id: string) => {
        const response = await api.get(`post/dislike/${id}`);
        if (response.statusCode === 401) push('/');
        fetchAllPosts(postId);
    }

    const unpackComments = () => {
        try {
            return comments.map((comment) => (
                <Post 
                    data = { { ...comment, canBeViewed: true } }
                    key = { comment._id }
                    likePost = { handleLikePost }
                    unlikePost = { handleDisLikePost }
                    subscribeToPost = { () => {} }
                />
            ))
        } catch(e) {
            return []
        }
    }

    const unpackPost = () => {
        if (post) {
            return (
                <Post 
                    data= { post }
                    key={ post._id }
                    likePost = { handleLikePost }
                    unlikePost = { handleDisLikePost }
                    subscribeToPost = { () => {} }
                />
            )
        }
        else {
            return null
        }
    }

    useEffect(() => {
        setPostId(asPath.replace('/post/', ''))
        fetchAllPosts(asPath.replace('/post/', ''))
    }, [asPath])

    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar />

            <div className={styles['post-wrapper']}>
                { unpackPost() }

                <div className={styles['comments-wrapper']}>
                    { unpackComments() }
                </div>
            </div>

            
        </div>
    )
}