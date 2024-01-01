import { child, get, ref } from "firebase/database";
import { useRouter } from "next/router";
import { rtdb } from "../../../../firebaseConfig";
import Link from "next/link";
import { Blogs } from "@/types/Blogs";
import Head from "next/head";

/* ========================= FOR SSR ============================//
export const getServerSideProps = async ({ params }) => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch blog data by slug (link):

	const blogData: Blogs.ListOrderedByLinks.Item = await get(
		child(dbRef, `blogs/listOrderedByLinks/${params.slug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch blog by blogId:
	const blog: Blogs.Blog = await get(child(dbRef, `blogs/${blogData.key}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// Pass data to the page via props
	return { props: { blog } };
};
========================= SSR END ===========================*/

//============================ FOR ISR: ========================

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: { params: any }) {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch blog data by slug (link):
	const blogData: Blogs.ListOrderedByLinks.Item = await get(
		child(dbRef, `blogs/listOrderedByLinks/${params.slug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch blog by blogId:
	const blog: Blogs.Blog = await get(child(dbRef, `blogs/${blogData.key}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	return {
		props: {
			blog,
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
	// fetch all blogs metadata:
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	const blogsListOrderedByKeys: Blogs.ListOrderedByKeys.List = await get(
		child(dbRef, "blogs/listOrderedByKeys")
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// Get the paths we want to pre-render
	const paths = Object.keys(blogsListOrderedByKeys).map((key) => ({
		params: { slug: blogsListOrderedByKeys[key].link },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: 'blocking' } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
//============================= ISR END ==============================*/

export default function Page({ blog }: { blog: Blogs.Blog }) {
	const router = useRouter();

	if (!blog)
		return <p className="text-align text-danger">There is no such blog...</p>;

	return (
		<>
			<Head>
				<title>Blogging Platform | {blog.metadata.title}</title>
				<meta property="og:title" content={blog.metadata.title} />

				<meta property="description" content={blog.metadata.description} />
				<meta property="og:description" content={blog.metadata.description} />

				<meta property="author" content={blog.metadata.author} />
			</Head>

			<header className="text-center">
				<h1>{blog.metadata.title}</h1>
				<p>
					by
					<Link href={"/bloggers/" + blog.metadata.userName} className="ms-2">
						{blog.metadata.author}
					</Link>
				</p>
				<p>
					{blog.metadata.createdAt && blog.metadata.createdAt}
					{blog.metadata.updatedAt &&
						(blog.metadata.updatedAt === blog.metadata.createdAt
							? null
							: " / " + blog.metadata.updatedAt)}
				</p>
				<p>{blog.metadata.description}</p>
			</header>

			<nav className="table-of-content">
				<hr />
				<h5 className="text-center">Table of content</h5>
				<ul>
					{Object.keys(blog.articlesListOrderedByKeys).map((key) => (
						<li key={key}>
							<Link
								href={
									router.query.slug +
									"/" +
									blog.articlesListOrderedByKeys[key].link
								}
								className="d-block"
							>
								{blog.articlesListOrderedByKeys[key].title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
