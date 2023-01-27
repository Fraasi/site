import { useRouter } from 'next/router'
import ErrorPage from 'next/error'


type Props = {
  url: string
}

const IFrame = ({ url }: Props) => {
  return (

    <>
      <iframe
        src={url}
      />
    </>
  )
}

export default IFrame

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {

  const paths = ['https://fraasi.github.io']
  // const content: string = await markdownToHtml(post?.content || '')

  return {
    props: {
      url: paths[0]
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{
      params: {
        slug: 'cv',
      },
    }],

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    fallback: true,
  }
}
