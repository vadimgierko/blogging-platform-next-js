import { child, ref, get } from "firebase/database";
import Link from "next/link";
import { rtdb } from "../../../firebaseConfig";
import { Bloggers } from "@/types/Bloggers";
import Head from "next/head";

export const getServerSideProps = async () => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	const bloggersListOrderedByUserName: Bloggers.ListOrderedByUserName.List =
		await get(child(dbRef, "users/listOrderedByUserName"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());
					return snapshot.val();
				}
			})
			.catch((error) => console.log(error));

	return { props: { bloggersListOrderedByUserName } };
};

export default function Page({
	bloggersListOrderedByUserName,
}: {
	bloggersListOrderedByUserName: Bloggers.ListOrderedByUserName.List;
}) {
	return (
		<>
			<Head>
				<title>Blogging Platform | Bloggers</title>
				<meta name="title" content="Blogging Platform | Bloggers" />

				<meta
					name="description"
					content="See the list of all of bloggers registered in Blogging Platform & their list of blogs!"
				/>
				<meta
					name="og:description"
					content="See the list of all of bloggers registered in Blogging Platform & their list of blogs!"
				/>
			</Head>

			<h1>Bloggers</h1>

			<nav>
				{Object.keys(bloggersListOrderedByUserName).map((userName) => {
					const blogger = bloggersListOrderedByUserName[userName];

					return (
						<div key={blogger.userId}>
							<hr />
							<Link
								href={"/bloggers/" + userName}
								className="d-block my-2"
								style={{ textDecoration: "none" }}
							>
								<i className="bi bi-person-circle me-2"></i>
								{blogger.firstName + " " + blogger.lastName + " | @" + userName}
							</Link>
						</div>
					);
				})}
			</nav>
		</>
	);
}
