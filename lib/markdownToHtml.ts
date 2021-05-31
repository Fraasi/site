import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import toc from 'remark-toc'
import slug from 'remark-slug'


export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(slug) // toc needs this, adds anchors to headings
    .use(toc, {
      heading: 'Table of Contents',
      tight: true,
      parents: ['root', 'contents']
    })
    .use(prism, {
      transformInlineCode: true,
      plugins: [
        'line-numbers',
      ],
    })
    .use(html)
    .process(markdown)
  return result.toString()
}
