import Link from "next/link";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const NAVLINKS = [
	{
		to: "/",
		text: "About",
	},
	{
		to: "/blogs",
		text: "Blogs",
	},
	{
		to: "/bloggers",
		text: "Bloggers",
	},
];

const PUBLIC_LINK_BUTTONS = [
	{
		to: "/login",
		text: "Sign In",
		style: "success",
	},
	{
		to: "/signup",
		text: "Create Account",
		style: "info",
	},
];

const PRIVATE_LINK_BUTTONS = [
	{
		to: "/",
		text: "Log Out",
		style: "danger",
	},
];

export default function Header() {
	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			variant="dark"
			bg="primary"
			fixed="top"
		>
			<Container>
				<Link href="/" passHref legacyBehavior>
					<Navbar.Brand>Blogging Platform</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Link href="/" passHref legacyBehavior>
							<Nav.Link>About</Nav.Link>
						</Link>
						<Link href="/blogs" passHref legacyBehavior>
							<Nav.Link>Blogs</Nav.Link>
						</Link>
						<Link href="/bloggers" passHref legacyBehavior>
							<Nav.Link>Bloggers</Nav.Link>
						</Link>
					</Nav>

					{/* <Nav>
						<Link href="/sign-in" passHref legacyBehavior>
							<Nav.Link>
								<Button variant="outline-success">Sign In</Button>
							</Nav.Link>
						</Link>
						<Link href="/sign-up" passHref legacyBehavior>
							<Nav.Link>
								<Button variant="outline-info">Create Account</Button>
							</Nav.Link>
						</Link>
					</Nav> */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
