import { child, get, ref } from "firebase/database";
import Link from "next/link";
import { rtdb } from "../../../../firebaseConfig";

export const getServerSideProps = async ({ params }) => {
	// Fetch data from Firebase RTDB:
	const dbRef = ref(rtdb);

	// fetch blogger data by userName:
	const bloggerData = await get(
		child(dbRef, `users/listOrderedByUserName/${params.userName}`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// fetch blogger by userId:
	const bloggerPublicData = await get(
		child(dbRef, `users/${bloggerData.userId}/publicData`)
	)
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			}
		})
		.catch((error) => console.log(error));

	// Pass data to the page via props
	return { props: { bloggerPublicData } };
}; //satisfies GetServerSideProps<{ repo: Repo }>

export default function Page({
	bloggerPublicData,
}: {
	bloggerPublicData: any;
}) {
	return (
		<div className="blogger-page">
			<h1>
				{bloggerPublicData.data.firstName +
					" " +
					bloggerPublicData.data.lastName}
			</h1>
			<hr />
			<p>user name: {"@" + bloggerPublicData.data.userName}</p>
			<nav className="blogger-blogs">
				{bloggerPublicData.blogs ? (
					Object.keys(bloggerPublicData.blogs).map((blogId) => (
						<Link
							key={blogId}
							href={"/blogs/" + bloggerPublicData.blogs[blogId].link}
						>
							<h3>{bloggerPublicData.blogs[blogId].title}</h3>
						</Link>
					))
				) : (
					<p>Downloading blogger blogs or there are no blogs...</p>
				)}
			</nav>
		</div>
	);
}
