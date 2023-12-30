export namespace Blogs {
	/*
    {
      [blogId]: Blog,
      listOrderedByLinks: ListOrderedByLinks.List,
      listOrderedByKeys: ListOrderedByKeys.List
    }
  */

	export namespace ListOrderedByKeys {
		export interface List {
			[key: string]: Item;
		}
		export interface Item {
			author: string;
			description: string;
			link: string;
			title: string;
			userId: string;
			userName: string;
		}
	}

	export namespace ListOrderedByLinks {
		export interface List {
			[link: string]: Item;
		}
		export interface Item {
			key: string;
			title: string;
			userId: string;
		}
	}

	export interface Blog {
		articlesListOrderedByKeys: ListOrderedByKeys.List;
		articlesListOrderedByLinks: ListOrderedByLinks.List;
		metadata: {
			author: string;
			createdAt: string; // 2021.12.28 change to timestamp?
			description: string;
			link: string;
			title: string;
			updatedAt: string; // 2021.12.28 change to timestamp?
			userId: string;
			userName: string;
		};
	}
}
