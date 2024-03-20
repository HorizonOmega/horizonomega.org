import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: 'Horizon Omega',
    description: 'Reducing AI Risk through Collaboration and Operational Acceleration',
  }

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
