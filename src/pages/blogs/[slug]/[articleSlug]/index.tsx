import { child, get, ref } from "firebase/database";
import { useRouter } from "next/router";
import { rtdb } from "../../../../../firebaseConfig";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const getServerSideProps = async ({ params }) => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch article data by slug (link):

	const articleData = await get(
		child(dbRef, `articles/listOrderedByLinks/${params.articleSlug}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch article by key:
	const article = await get(child(dbRef, `articles/${articleData.key}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// Pass data to the page via props
	return { props: { article } };
}; //satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({ article }: { article: any }) {
	const router = useRouter();
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
