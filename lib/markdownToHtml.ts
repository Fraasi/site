import remark from 'remark'
import html from 'remark-html'
// import headings from 'remark-autolink-headings'
// import highlight from 'remark-highlight.js'
import prism from 'remark-prism'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(prism, {
      transformInlineCode: true,
    //   plugins: [
    //     'autolinker',
    //     'data-uri-highlight',
    //     'diff-highlight',
    //     'inline-color',
    //     'line-numbers',
    //     'show-invisibles',
    //     'treeview',
    //   ],
    })
    .process(markdown)
  return result.toString()
}
