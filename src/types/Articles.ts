export namespace Articles {
	/*
    {
      [articleId]: {
        metadata: Article
      },
      listOrderedByLinks: ListOrderedByLinks.List,
    }
  */

	export namespace ListOrderedByLinks {
		export interface List {}
		export interface Item {
			key: string;
			title: string;
			userId: string;
		}
	}

	export interface Article {
		metadata: {
			author: string; // Vadim Gierko
			blogKey: string;
			blogLink: string; // slug => TODO: auto slugify(blogTitle) !!!
			blogTitle: string;
			content: string;
			createdAt: string; // 2021.12.28 change to timestamp?
			description: string;
			link: string; // slug => TODO: auto slugify(title) !!!
			title: string;
			updatedAt: string; // 2021.12.28 change to timestamp?
			userId: string;
			userName: string; // vadimgierko
		};
	}
}
