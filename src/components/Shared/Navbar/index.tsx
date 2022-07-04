import React, { useState } from 'react';
import styles from './index.module.scss';
import { GiHamburgerMenu, GiWallet } from 'react-icons/gi';
import { BsSearch, BsShare } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiInboxIn } from 'react-icons/hi';
import { FiSettings, FiLogOut } from 'react-icons/fi';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={styles['navbar-wrapper-mobile']}>
                <GiHamburgerMenu 
                    className={styles['hamburger']}
                    size = { 25 }
                    onClick = {() => { setIsOpen(!isOpen); }}
                />

                <input />

                <BsSearch 
                    className={styles['search-icon']}
                    size = { 16 }
                />

                <div className={`${styles['nav-menu']} ${isOpen? styles.hide : ''}`}>
                    <div className={styles['nav-menu-chip']}></div>

                    <div className={styles.header}>
                        <p>Menu</p>
                    </div>

                    <div className={styles['nav-item']}>
                        <CgProfile 
                            className={styles['icon']}
                            size = { 16 }
                        />
                        <p>Profile</p>
                    </div>

                    <div className={styles['nav-item']}>
                        <HiInboxIn
                            className={styles['icon']}
                            size = { 16 }
                        />
                        <p>Inbox</p>
                    </div>

                    <div className={styles['nav-item']}>
                        <GiWallet 
                            className={styles['icon']}
                            size = { 16 }
                        />
                        <p>Wallet</p>
                    </div>

                    <div className={styles['nav-item']}>
                        <BsShare 
                            className={styles['icon']}
                            size = { 16 }
                        />
                        <p>Share</p>
                    </div>

                    <div className={styles['nav-item']}>
                        <FiSettings 
                            className={styles['icon']}
                            size = { 16 }
                        />
                        <p>Settings</p>
                    </div>

                    <div className={styles['footer']}>
                        <p>Log-out</p>
                        <FiLogOut
                            className={styles['icon']}
                            size = { 16 }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}