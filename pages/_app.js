import '../styles/globals.css'

import { Fragment } from "react";

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}