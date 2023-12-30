export namespace Bloggers {
	/*
    {
      [userId]: Blog,
      listOrderedByKeys,
      listOrdereByUserName
    }
  */
	export namespace ListOrderedByUserName {
		export interface List {
			[userName: string]: Item;
		}
		export interface Item {
			firstName: string;
			lastName: string;
			userId: string;
		}
	}
	export namespace Blogger {
		export interface PublicData {
			blogs: {
				[blogId: string]: {
					link: string;
					title: string;
				};
			};
			data: {
				firstName: string;
				lastName: string;
				userName: string;
			};
		}
	}
}
