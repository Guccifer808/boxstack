import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import remarkUnwrapImages from 'remark-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/uk', // Redirect root URL to the default locale
        permanent: true, // Use a permanent redirect
      },
    ]
  },
}
function remarkMDXLayout(source) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree, file) => {
    let filename = path.relative(file.cwd, file.history[0])
    let segments = filename.split(path.sep)
    let segmentsStr = JSON.stringify(segments)

    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} _segments={${segmentsStr}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      }
    )
  }
}
export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        [
          unifiedConditional,
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/[lang]/blog'))}`
            ),
            [[remarkMDXLayout, '@/app/[lang]/blog/wrapper']],
          ],
          [
            new RegExp(
              `^${escapeStringRegexp(path.resolve('src/app/[lang]/brands'))}`
            ),
            [[remarkMDXLayout, '@/app/[lang]/brands/wrapper']],
          ],
        ],
      ],
    },
  })
  return withMDX(nextConfig)
  // return withNextIntl(withMDX(nextConfig))
}
