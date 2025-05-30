import React from 'react';
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { resetServerContext } from 'react-beautiful-dnd';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      resetServerContext();

      return {
        ...initialProps,
        styles: React.Children.toArray([initialProps.styles, sheet.getStyleElement()]),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en" className="no-fouc">
        <Head>{/* your head content here */}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
