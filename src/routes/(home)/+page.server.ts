import { getData } from '$lib/server/database';

export async function load() {
	return {
		posts: await getData('/posts')
	};
}
