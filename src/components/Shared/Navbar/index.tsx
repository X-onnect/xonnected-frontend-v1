import React, { useState } from 'react';
import styles from './index.module.scss';
import { GiHamburgerMenu, GiWallet } from 'react-icons/gi';
import { BsSearch, BsShare } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiInboxIn } from 'react-icons/hi';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineNotifications } from 'react-icons/md';

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

                <div className={`${styles['nav-menu']} ${!isOpen? styles.hide : ''}`}>
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

            <div className={styles['navbar-wrapper-desktop']}>
                <GiHamburgerMenu 
                    className={styles['hamburger']}
                    size = { 25 }
                    onClick = {() => { setIsOpen(!isOpen); }}
                />

                <div className={styles['logo-text']}>
                    <p>X<span className={styles['smaller']}>onnected</span></p>
                </div>

                <div className={styles['flex-wrapper']}>
                    <div className={styles['input-wrapper']}>
                        <input 
                            placeholder='Search'
                        />

                        <BsSearch 
                            className={styles['search-icon']}
                            size = { 16 }
                        />
                    </div>
                </div>

                <div className={styles['icon-wrapper']}>
                    <AiOutlineHome 
                        className={styles['icon']}
                        size = { 20 }
                    />
                    <MdOutlineNotifications
                        className={styles['icon']}
                        size = { 20 }
                    />
                    <CgProfile 
                        className={styles['icon']}
                        size = { 20 }
                    />
                </div>

                <div className={`${styles['nav-menu']} ${isOpen? '' : styles.hide}`}>
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