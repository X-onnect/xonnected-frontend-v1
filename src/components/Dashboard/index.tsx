import React, { useEffect, useState } from 'react';
import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";
import { api } from "helpers";
import { PostInterface } from 'helpers';
import { useRouter } from 'next/router';
import { CreatePost } from 'components/Shared';

export const Dashboard = () => {
    const { push } = useRouter();

    const [posts, setPosts] = useState<PostInterface[]>([]);

    const fetchAllPosts =  async() => {
        const response = await api.get('post/all');

        if (response.statusCode === 401) {
            push('/');
        }

        try {
            const sortedPosts = response.map((post: any) => {
                return { canBeViewed: post.canBeViewed, ...post.post }
            });

            setPosts(sortedPosts);
        }
        catch (e) {
            console.log(e);
        }
    }

    const unPackPosts = () => {
        return posts.map((post) => (
            <Post 
                data = { post }
            />
        ))
    }

    useEffect(() => {
        fetchAllPosts();
    }, []);
    
    return (
        <div className={styles['desktop-wrapper']}>
            
            <Navbar />

            <div style={{width: '100%', padding: '20px', marginTop: '40px', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                { unPackPosts() }
            </div>
            <CreatePost />
        </div>
    )
};
