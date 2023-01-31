import Head from 'next/head'

type Props =  {
  title?: string
}

const Meta = ({ title }: Props) => {
  return (
    <Head>
      <title>{title || ''}</title>
    </Head>
  )
}

export default Meta
