import Author from './author'

type PostType = {
  slug: string
  title: string
  createdAt: string
  coverImage: string
  published_at: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}

export default PostType
