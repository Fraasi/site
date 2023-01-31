import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Layout from './components/layout'


export default function Home() {
  return (
    <>
      <Head>
        <title>Fraasi</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>
              Starting form scratch...
            </p>

          </div>
        </main>
      </Layout>
    </>
  )
}
