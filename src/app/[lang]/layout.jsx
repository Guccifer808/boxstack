import { RootLayout } from '@/components/RootLayout'
import '@/styles/tailwind.css'
import { defaultLocale } from '../../../middleware'
export const metadata = {
  title: {
    template: '%s - МедСервісГруп',
    default:
      'МедСервісГруп - Сертифікований фахівець в галузі високотехнічного обладнання',
  },
}

export default function Layout({ children, params }) {
  return (
    <html
      lang={params.lang ?? defaultLocale}
      className="h-full bg-blue-950 text-base antialiased"
    >
      <body className="flex min-h-full flex-col ">
        <RootLayout params={params}>{children}</RootLayout>
      </body>
    </html>
  )
}
