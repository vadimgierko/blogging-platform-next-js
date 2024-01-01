import { child, get, ref } from "firebase/database";
import { rtdb } from "../../../../../firebaseConfig";
import Link from "next/link";
import { Articles } from "@/types/Articles";
import { Blogs } from "@/types/Blogs";
import Head from "next/head";
import MarkdownRenderer from "@/components/MarkdownRenderer";

/* ========================= FOR SSR ============================//
export const getServerSideProps = async ({ params }: { params: any }) => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch article data by slug (link):

	const articleData: Articles.ListOrderedByLinks.Item = await get(
		child(dbRef, `articles/listOrderedByLinks/${params.articleSlug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch article by key:
	const article: Articles.Article = await get(
		child(dbRef, `articles/${articleData.key}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	return { props: { article } };
};
========================= SSR END ===========================*/

//============================ FOR ISR: ========================

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: any }) {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch article data by slug (link):
	const articleData: Articles.ListOrderedByLinks.Item = await get(
		child(dbRef, `articles/listOrderedByLinks/${params.articleSlug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch article by key:
	const article: Articles.Article = await get(
		child(dbRef, `articles/${articleData.key}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	return {
		props: {
			article,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 60 seconds
		revalidate: 60, // In seconds
	};
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch all blogs metadata:
	const blogsListOrderedByKeys: Blogs.ListOrderedByKeys.List = await get(
		child(dbRef, "blogs/listOrderedByKeys")
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch every blog:
	const blogs: Blogs.Blog[] = await Promise.all(
		Object.keys(blogsListOrderedByKeys).map(async (key) => {
			const blog: Blogs.Blog = await get(child(dbRef, `blogs/${key}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						return snapshot.val();
					}
				})
				.catch((error) => console.log(error));

			return blog;
		})
	);

	// Get the paths
	const filteredBlogs = blogs.filter((blog) => blog.articlesListOrderedByLinks);

	const paths = filteredBlogs.reduce(
		(all, blog) => [
			...all,
			...Object.keys(blog.articlesListOrderedByLinks).map((key) => ({
				params: { slug: blog.metadata.link, articleSlug: key },
			})),
		],
		[] as {
			params: { slug: string; articleSlug: string };
		}[]
	);

	// We'll pre-render only these paths at build time.
	// { fallback: 'blocking' } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
//============================= ISR END ==============================*/

export default function Page({ article }: { article: Articles.Article }) {
	return (
		<>
			<Head>
				<title>Blogging Platform | {article.metadata.title}</title>
				<meta name="og:title" content={article.metadata.title} />

				<meta name="description" content={article.metadata.description} />
				<meta name="og:description" content={article.metadata.description} />

				<meta name="author" content={article.metadata.author} />
			</Head>
			<article>
				<header className="text-center">
					<h1>{article.metadata.title}</h1>
					<p>
						by
						<Link
							href={"/bloggers/" + article.metadata.userName}
							className="ms-2"
						>
							{article.metadata.author}
						</Link>
					</p>
					<p>
						{article.metadata.createdAt && article.metadata.createdAt}
						{article.metadata.updatedAt &&
							(article.metadata.updatedAt === article.metadata.createdAt
								? null
								: " / " + article.metadata.updatedAt)}
					</p>
					<p>{article.metadata.description}</p>
				</header>

				<hr />

				<MarkdownRenderer markdown={article.metadata.content} />
			</article>
		</>
	);
}
