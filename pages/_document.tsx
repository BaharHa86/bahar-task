 
import { useStateContext } from "@/@core/contexts/context";
import Document, { Html, Main, NextScript, Head, DocumentContext } from "next/document";
import { useRouter } from "next/router";
import { useEffect } from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    return (
      <Html
        // dir={this.props.locale === "fa" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
 }

export default MyDocument;


 