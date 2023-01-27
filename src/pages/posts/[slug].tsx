import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from './components/container'
import PostBody from './components/post-body'
import Header from './components/header'
import PostHeader from './components/post-header'
import Layout from './components/layout'
import sanityApi from './lib/api'
import PostTitle from './components/post-title'
import Head from 'next/head'
import markdownToHtml from './lib/markdownToHtml'
import PostType from './types/post'

type Props = {
  post: PostType
  preview?: boolean
  coverImage?: string
}

const Post = ({ post, preview, coverImage }: Props) => {
  console.log('post:', post)

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
                  {post.title}
                </title>
              </Head>
              <PostHeader
                title={post.title}
                coverImage={coverImage}
                date={post._updatedAt}
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


  // const content: string = await markdownToHtml(post?.content || '')
  const posts = await sanityApi(`*[_type == "post"]`)
  const post = posts.find((p: any) => p.slug.current === params.slug)
  console.log(posts)
  return {
    props: {
      post: toPlainText(post.content)
    },
  }
}

export async function getStaticPaths() {
  const posts = await sanityApi(`*[_type == "post"]`)
  // if (!posts) return { notFound: true }

  return {
    paths: posts.map((post: any) => {
      console.log('post.slug.current:', post.slug.current)

      return {
        params: {
          slug: post.slug.current,
        }
      }
    }),

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    fallback: false,
  }
}

function toPlainText(blocks = []) {
  return blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children,
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join the
      // text strings
      return block.children.map(child => child.text).join('')
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n')
}
