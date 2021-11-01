import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'
//useSession traz informações do usuário, se ele ta logado ou não
import styles from './styles.module.scss'
export function SignInButton() {
    const [session] = useSession()

    //console.log(session)

    return session ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#04d361" />
            {session.user?.name}
            <FiX onClick={() => signOut()} color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button type="button" onClick={() => signIn()} className={styles.signInButton}>
            <FaGithub color="#eba417" />
            Sign in with GitHub
        </button>
    )
}