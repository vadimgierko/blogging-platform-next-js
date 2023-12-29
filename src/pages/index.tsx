import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Blogging Platform</title>
				<meta
					name="description"
					content="My Blogging Platform App (created in 2021, upgraded in July 2022) rewritten from scratch in Next.js & TypeScript (December 2023)"
				/>
				<meta name="author" content="Vadim Gierko" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<article className="about-page">
				<h1>What you can do with Blogging Platform</h1>
				<hr />
				<ul>
					<li>
						create & run your blog (or many blogs) after creating a free user
						account
					</li>
					<li>
						write & edit your articles with simple & intuitive{" "}
						<a
							href="https://vadimgierko.github.io/markdown-text-editor/"
							rel="noreferrer"
							target="_blank"
						>
							markdown text editor
						</a>
						, which was also created by myself
					</li>
					<li>read published blogs without authentication</li>
				</ul>
				<p>
					Blogging Platform is a responsive full-stack single-page application,
					which supports all kinds of CRUD features, in which I have used all of
					my previous knowledge and skills in the field of front-end development
					(React, Bootstrap) and realtime database integration (Firebase).
				</p>
				<p className="text-success">
					Recently the app was updated and rewritten (basically from scratch)
					and adapted to:
				</p>
				<ul className="text-success">
					<li>
						new app structure according to Atomic Web Design pattern (so now
						code is split, and components are reused more efficiently)
					</li>
					<li>
						new, more flatten realtime database structure (so now the app
						downloads up to 10 times less data & does it when necessary)
					</li>
					<li>
						new security rules (so now the app is protected from malicious
						users, and that&apos;s very hard to download big portions of data,
						for example it&apos;s impossible to download the whole database)
					</li>
				</ul>
				<h3>Technologies used in Blogging Platform development</h3>
				<hr />
				<ul>
					<li>React 17</li>
					<li>React Router 5.2 (HashRouter, dynamic & nested routing)</li>
					<li>React Context</li>
					<li>React Markdown 7 & remark-gfm</li>
					<li>Firebase 9.1 (auth, realtime database, security rules)</li>
					<li>Bootstrap 5.1</li>
					<li>Bootswatch 5.1</li>
					<li>GitHub Pages 3.2</li>
					<li>Atomic Web Design pattern</li>
				</ul>
			</article>
		</>
	);
}
