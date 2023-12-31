import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }: { children: JSX.Element }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="layout">
				<Header />
				<Container as="main" style={{ marginTop: 140 }}>
					{children}
				</Container>
				<Footer />
			</div>
		</>
	);
}
