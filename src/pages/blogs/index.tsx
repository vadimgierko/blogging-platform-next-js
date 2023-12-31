import { child, ref, get } from "firebase/database";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { rtdb } from "../../../firebaseConfig";
import { Blogs } from "@/types/Blogs";
import Head from "next/head";

export const getServerSideProps = async () => {
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

	// Pass data to the page via props
	return { props: { blogsListOrderedByKeys } };
};

export default function Page({
	blogsListOrderedByKeys,
}: {
	blogsListOrderedByKeys: Blogs.ListOrderedByKeys.List;
}) {
	return (
		<>
			<Head>
				<title>Blogging Platform | Blogs</title>
				<meta name="title" content="Blogging Platform | Blogs" />

				<meta
					name="description"
					content="See the list of all of the blogs available in Blogging Platform!"
				/>
				<meta
					name="og:description"
					content="See the list of all of the blogs available in Blogging Platform!"
				/>
			</Head>

			<h1>Blogs</h1>

			<nav>
				{Object.keys(blogsListOrderedByKeys).map((key) => {
					const blog = blogsListOrderedByKeys[key];

					return (
						<div key={key}>
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
					);
				})}
			</nav>
		</>
	);
}
