import styles from '../styles/products.module.scss';
import Head from 'next/head'
export default function Products() {
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <h2 className={styles.title}>Products </h2>
        </>
    )
}