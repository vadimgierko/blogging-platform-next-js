import { child, ref, get } from "firebase/database";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { rtdb } from "../../../firebaseConfig";

type Blog = {
	author: string;
	blogId: string;
	description: string;
	link: string;
	title: string;
	userId: string;
	userName: string;
};

export const getServerSideProps = async () => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	const blogsObject = await get(child(dbRef, "blogs/listOrderedByKeys"))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	const blogs: Blog[] = Object.keys(blogsObject).map((key) => ({
		...blogsObject[key],
		blogId: key,
	}));

	// Pass data to the page via props
	return { props: { blogs } };
}; //satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({ blogs }: { blogs: Blog[] }) {
	return (
		<>
			<h1>Blogs</h1>

			<nav>
				{blogs.map((blog) => (
					<div key={blog.blogId}>
						<hr />
						<Link href={"/blogs/" + blog.link}>
							<h3>{blog.title}</h3>
						</Link>
						<p>
							by
							<Link href={"bloggers/" + blog.userName} className="ms-2">
								{blog.author}
							</Link>
						</p>
						<p>{blog.description}</p>
					</div>
				))}
			</nav>
		</>
	);
}
