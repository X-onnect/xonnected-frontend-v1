import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";
import { api } from "helpers";
import { PostInterface } from 'helpers';
import { useRouter } from 'next/router';
import { CreatePost } from 'components/Shared';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'shared/state/user';

export const Comments = () => {
    const { asPath, push } = useRouter();
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState<PostInterface>();
    const [comments, setComments] = useState<PostInterface[]>([]);

    const setLoggedInUser = useSetRecoilState(userAtom);

    const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
    const [parentId, setParentId] = useState('');

    const getLoggedInUserInfo = async () => {
        const response = await api.get('auth/user');

        if (response.statusCode === 401) {
            push('/');
        }

        setLoggedInUser(response);
    }

    const fetchAllPosts =  async(id: string) => {
        const response = await api.get(`post/id/${id}`);

        if (response.statusCode === 401) push('/');
        const sortedPost = { ...response.post, canBeViewed: response.canBeViewed, comments: response.comments }

        setPost(sortedPost);
        setComments(sortedPost.comments);
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

    const onComment = (id: string) => {
        setParentId(id);
        setShowCreateCommentModal(true);
    }

    const closeCommentModal = () => {
        setParentId('')
        setShowCreateCommentModal(false);
    }

    const refreshPosts = async () => {
        await fetchAllPosts(postId);
        closeCommentModal();
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
                    commentOnPost = { onComment }
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
                    commentOnPost = { onComment }
                />
            )
        }
        else {
            return null
        }
    }

    useEffect(() => {
        getLoggedInUserInfo();
        setPostId(asPath.replace('/post/', ''))
        fetchAllPosts(asPath.replace('/post/', ''))
    }, [asPath])

    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar />

            {
                showCreateCommentModal &&
                <CreatePost 
                    isComment = { true }
                    id = { parentId }
                    handleClose = { closeCommentModal }
                    refresh = { refreshPosts }
                />
            }

            <div className={styles['post-wrapper']}>
                { unpackPost() }

                <div className={styles['comments-wrapper']}>
                    { unpackComments() }
                </div>
            </div>

            
        </div>
    )
}