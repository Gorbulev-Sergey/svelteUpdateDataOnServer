export class Post {
	title: string = '';
	description: string | null = null;
	cover: string | null = null;
}

export interface IDictionary<T> {
	[key: string]: T;
}
