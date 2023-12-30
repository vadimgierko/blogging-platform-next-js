import { child, ref, get } from "firebase/database";
import Link from "next/link";
import { rtdb } from "../../../firebaseConfig";
import { Bloggers } from "@/types/Bloggers";

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
