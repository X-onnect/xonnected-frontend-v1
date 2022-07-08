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
    const postId = asPath.replace('/post/', '');
    const [post, setPost] = useState<PostInterface>();
    const [comments, setComments] = useState<PostInterface[]>([]);

    const fetchAllPosts =  async() => {
        const response = await api.get(`post/id/${postId}`);

        if (response.statusCode === 401) push('/');
        console.log(response)
        const sortedPost = { canBeViewed: response.canBeViewed, ...response.post }

        setPost(sortedPost);
        setComments(sortedPost.comments);

        console.log(sortedPost);
        console.log(sortedPost.comments)
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

    const unpackComments = () => {
        return comments.map((comment) => (
            <Post 
                data = { { ...comment, canBeViewed: true } }
                key = { comment._id }
                likePost = { handleLikePost }
                unlikePost = { handleDisLikePost }
                subscribeToPost = { () => {} }
            />
        ))
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
        fetchAllPosts()
    }, [])

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