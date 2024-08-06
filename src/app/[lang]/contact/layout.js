export const metadata = {
  title: 'МедСервісГруп',
  description:
    'Медичні інновації: обладнання для забезпечення найвищого стандарту догляду та діагностики.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
