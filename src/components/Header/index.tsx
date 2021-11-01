import React from 'react'
import { SignInButton } from '../SignInButton'
import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/dist/client/router'
import { ActiveLink } from '../ActiveLink'

export function Header() {
    const { asPath } = useRouter()
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logo do Quick News" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}