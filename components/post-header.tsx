import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 ml-2 text-base">
        <DateFormatter dateString={date} />
      </div>
      <div className="hidden md:block md:mb-2"></div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {coverImage && (<CoverImage title={title} src={coverImage} />)}
      </div>
      <div className="max-w-2xl mx-auto mb-6">
        <div className="block md:hidden mb-6">
        </div>
      </div>
    </>
  )
}

export default PostHeader
