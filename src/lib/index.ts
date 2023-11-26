export class Post {
	title: string = '';
	description?: string;
	cover?: string;
}

export interface IDictionary<T> {
	[key: string]: T;
}
