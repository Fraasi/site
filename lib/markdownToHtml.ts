import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import toc from 'remark-toc'
import slug from 'remark-slug'


export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(toc, {
      heading: 'Contents',
      tight: true,
      parents: ['root', 'contents']
    })
    .use(slug) // toc needs this, adds anchors to headings
    .use(prism, {
      transformInlineCode: true,
      plugins: [
        'line-numbers',
      ],
    })
    .process(markdown)
  return result.toString()
}
