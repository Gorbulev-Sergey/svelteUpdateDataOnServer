export class Post {
	title: string = '';
	description: string | null = null;
	cover: string | null = null;
	date: string = new Date().toISOString();
}

export interface IDictionary<T> {
	[key: string]: T;
}
