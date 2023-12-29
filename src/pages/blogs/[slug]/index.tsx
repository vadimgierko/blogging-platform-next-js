import { child, get, ref } from "firebase/database";
import { useRouter } from "next/router";
import { rtdb } from "../../../../firebaseConfig";
import Link from "next/link";

type Blog = {
	author: string;
	blogId: string;
	description: string;
	link: string;
	title: string;
	userId: string;
	userName: string;
};

export const getServerSideProps = async ({ params }) => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch blog data by slug (link):

	const blogData = await get(
		child(dbRef, `blogs/listOrderedByLinks/${params.slug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch blog by blogId:
	const blog = await get(child(dbRef, `blogs/${blogData.key}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// Pass data to the page via props
	return { props: { blog } };
}; //satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({ blog }: { blog: any }) {
	const router = useRouter();
	return (
		<>
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
