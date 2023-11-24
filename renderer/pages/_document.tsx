import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="title"
          content="Cyberfront.dev | Software desde Traslasierra"
        />
        <link rel="icon" href="/images/logo.png" />
        <meta
          name="description"
          content="Páginas, E-Commerce, Sistemas desde Villa Dolores, Córdoba, Argentina"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content="es" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
