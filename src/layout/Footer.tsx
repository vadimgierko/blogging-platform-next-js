export default function Footer() {
	return (
		<footer className="text-center text-muted">
			<hr />
			<p>
				<a
					href="https://github.com/vadimgierko/blogging-platform"
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					Blogging Platform
				</a>{" "}
				&{" "}
				<a
					href="https://github.com/vadimgierko/markdown-text-editor"
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					Markdown Editor
				</a>{" "}
				&copy; 2021 - 2024{" "}
				<a
					href="https://github.com/vadimgierko"
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					Vadim Gierko
				</a>
			</p>
		</footer>
	);
}
