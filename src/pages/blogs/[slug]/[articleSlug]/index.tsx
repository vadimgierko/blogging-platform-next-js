import { child, get, ref } from "firebase/database";
import { rtdb } from "../../../../../firebaseConfig";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Articles } from "@/types/Articles";

export const getServerSideProps = async ({ params }) => {
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

export default function Page({ article }: { article: Articles.Article }) {
	return (
		<>
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
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{article.metadata.content}
			</ReactMarkdown>{" "}
		</>
	);
}
