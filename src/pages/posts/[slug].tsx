import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from './components/post-body'
import PostHeader from './components/post-header'
import sanityApi from './lib/api'
import PostTitle from './components/post-title'
import Head from 'next/head'
import markdownToHtml from './lib/markdownToHtml'

type Props = {
  content: string
  title: string
  createdAt: string
  updatedAt: string
  image?: string
  slug: string
}

const Post = (post: Props) => {
  console.log('post in func:', post)

  const router = useRouter()

  if (!router.isFallback && !post?.title) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
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
              date={new Date().toDateString()}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </>
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
  console.log('post:', post)
  console.log(posts)
  return {
    props: {
      content: toPlainText(post.content),
      title: post.title || 'not found',
      createdAt: post._createdAt,
      updatedAt: post._updatedAt,
      image: post.image?.asset._ref || null,
      slug: post.slug.current
    },
  }
}

export async function getStaticPaths() {
  const posts = await sanityApi(`*[_type == "post"]`)
  if (!posts) return { notFound: true }

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

type Block = {
  _type: string
  children: Array<{ text: string }>

}

function toPlainText<Array>(blocks = []) {
  return blocks
    // loop through each block
    .map((block: Block) => {
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
