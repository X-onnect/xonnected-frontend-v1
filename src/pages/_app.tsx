import { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

import GlobalStyles from 'styles/global'

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Xonnected</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="A platform that rewards content creators"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default App
