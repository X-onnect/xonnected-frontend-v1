import styles from "./index.module.scss";
import { Navbar } from "components/Shared/Navbar";

export const Dashboard = () => {
    return (
        <div className={styles['desktop-wrapper']}>
            <Navbar />
        </div>
    )
};
