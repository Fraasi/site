import DateFormatter from './date-formatter'
import Link from 'next/link'

type Props = {
  title: string
  date: string
  slug: string
}

const PostPreview = ({
  title,
  date,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-2">
      </div>
      <h3 className="text-lg font-bold leading-snug">
        <Link legacyBehavior as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-1 text-gray-700">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview
