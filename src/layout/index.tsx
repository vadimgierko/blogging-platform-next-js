import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: JSX.Element }) {
	return (
		<div className="layout">
			<Header />
			<Container as="main" style={{ marginTop: 140 }}>
				{children}
			</Container>
			<Footer />
		</div>
	);
}
