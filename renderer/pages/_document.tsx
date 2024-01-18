import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="business">
      <Head>
        <meta name="title" content="CajaRegistradora.com.ar" />
        <link rel="icon" href="/images/logo.png" />
        <meta name="description" content="Tu aliado en las ventas!" />
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
