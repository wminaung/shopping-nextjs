import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Link rel="shortcut icon" href="favicon.svg" type="image/svg" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
