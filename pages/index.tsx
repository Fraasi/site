import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { BLOG_NAME } from '../lib/constants'
import Post from '../types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  if (process.env.NODE_ENV === 'development') {
    const res = await fetch(`http://localhost:1337/posts`)
    const allPosts = await res.json()

    if (!allPosts) {
      return {
        notFound: true,
      }
    }

    return {
      props: { allPosts },
    }
  } else {
    // const allPosts = getAllPosts([
    //   'title',
    //   'date',
    //   'slug',
    //   'author',
    // ])

    // return {
    //   props: { allPosts },
    // }
    return {
      notFound: true,
    }
  }
}
