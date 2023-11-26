import type { IDictionary, Post } from '$lib';
import { getData } from '$lib/server/database';

export async function load() {
	return {
		posts: (await getData('/posts')) as Map<string, Post>
	};
}
