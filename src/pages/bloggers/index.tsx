import { child, ref, get } from "firebase/database";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { rtdb } from "../../../firebaseConfig";

type Blogger = {
	firstName: string;
	lastName: string;
	userId: string;
	userName: string;
};

export const getServerSideProps = async () => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	const bloggersObject = await get(child(dbRef, "users/listOrderedByUserName"))
		.then((snapshot) => {
			if (snapshot.exists()) {
				console.log(snapshot.val());
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	const bloggers: Blogger[] = Object.keys(bloggersObject).map((userName) => ({
		...bloggersObject[userName],
		userName,
	}));

	// Pass data to the page via props
	return { props: { bloggers } };
}; //satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({ bloggers }: { bloggers: Blogger[] }) {
	return (
		<>
			<h1>Bloggers</h1>

			<nav>
				{bloggers.map((blogger) => (
					<div key={blogger.userId}>
						<hr />
						<Link
							href={"/bloggers/" + blogger.userName}
							className="d-block my-2"
							style={{ textDecoration: "none" }}
						>
							<i className="bi bi-person-circle me-2"></i>
							{blogger.firstName +
								" " +
								blogger.lastName +
								" | @" +
								blogger.userName}
						</Link>
					</div>
				))}
			</nav>
		</>
	);
}
