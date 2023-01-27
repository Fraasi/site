import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from './components/container'
import PostBody from './components/post-body'
import Header from './components/header'
import PostHeader from './components/post-header'
import Layout from './components/layout'
import { getAllPosts } from './lib/api'
import PostTitle from './components/post-title'
import Head from 'next/head'
import { BLOG_NAME } from './lib/constants'
import markdownToHtml from './lib/markdownToHtml'
import PostType from './types/post'

type Props = {
  post: PostType
  preview?: boolean
  coverImage?: string
}

const Post = ({ post, preview, coverImage }: Props) => {
  const router = useRouter()

  if (!router.isFallback && !post?.title) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | {BLOG_NAME}
                </title>
              </Head>
              <PostHeader
                title={post.title}
                coverImage={coverImage}
                date={post.updatedAt}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {

  // const data = await getAllPosts()
  // const post = data.posts.find(p => p.title == params.slug)
  const post = {
    id: 2,
    createdAt: '2023-01-27T18:03:14.997Z',
    updatedAt: '2023-01-27T18:03:14.997Z',
    published_at: '2023-01-27T18:03:14.997Z',
    title: 'test',
    content: 'test content',
    ogImage: {
      url: 'http://image.url'
    }
  }
  // const content: string = await markdownToHtml(post?.content || '')

  return {
    props: {
      post: {
        ...post,
        content: post.content,
      },
    },
  }
}

export async function getStaticPaths() {
  // const data = await getAllPosts()
  // console.log('data:', data)
  // if (!data) return { notFound: true }

  return {
    paths: [{
      params: {
        slug: 'test',
      },
    }],
  // return {
  //   paths: data.posts.map((post) => {
  //     return {
  //       params: {
  //         slug: post.title,
  //       },
  //     }
  //   }),
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  fallback: true,
  }
}