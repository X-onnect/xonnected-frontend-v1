import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";
import { Post } from "components/Shared/Post";

export const Dashboard = () => {
    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar />

            <div style={{width: '100%', padding: '20px', marginTop: '40px', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
};
