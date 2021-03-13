import DateFormatter from './date-formatter'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  date: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  date,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
      </div>
      <h3 className="text-lg font-bold leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-4">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview
