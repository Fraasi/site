import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

/* old, for directory structure
const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
*/

// for strapi
async function fetchAPI(query: String, { variables } = {}) {
  const URI = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  const res = await fetch(`${URI}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

type Post = {
  title: String
  content: String
  id: Number
  published_at: String
}
type Data = {
  posts: Post[]
}
export async function getAllPosts() {
  const data: Promise<Data> = fetchAPI(`
  {
    posts {
      title
      content
      id
      published_at
    }
  }
  `)
  return data
}
