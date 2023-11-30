import { db } from '$lib/scripts/firebase';
import { getPosts } from '$lib/services/PostsSevice';
import { json } from '@sveltejs/kit';
import { get, ref } from 'firebase/database';

export async function GET() {
	let posts = await new Promise(res => {
		get(ref(db, '/posts')).then(s => {
			res(Object.entries(s.val()));
		});
	});
	return json(posts);
}
