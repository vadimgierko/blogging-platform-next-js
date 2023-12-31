import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
// css for highlighting code in github style
// (without this rehype-highlight will not be working):
import "highlight.js/styles/github.css";

import type { AppProps } from "next/app";
import Layout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
