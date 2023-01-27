import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../src/pages/posts/lib/api'
import Head from 'next/head'
import { BLOG_NAME } from '../src/pages/posts/lib/constants'
import Post from '../src/pages/posts/types/post'

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
  const URI = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  const res = await fetch(`${URI}/posts`)
  const allPosts = await res.json()

  if (!allPosts) {
    return {
      notFound: true,
    }
  }

  return {
    props: { allPosts },
  }

}
