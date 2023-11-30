import type { Post } from '$lib/models/Post';
import { db } from '$lib/scripts/firebase';
import { onValue, get, push, ref, update, remove } from 'firebase/database';

export async function getPosts(): Promise<[string, Post][]> {
	let posts: [string, Post][] = new Array();
	posts = await new Promise(res => {
		get(ref(db, '/posts')).then(s => {
			res(Object.entries(s.val()));
		});
	});
	return posts;
}

export async function getPost(id: string): Promise<[string, Post]> {
	return new Promise(res => {
		get(ref(db, `/posts/${id}`)).then(s => {
			if (s.exists()) res(s.val());
		});
	});
}

export function addPost(post: Post) {
	push(ref(db, '/posts'), post);
}

export function updatePost(id: string, post: Post) {
	update(ref(db, `/posts/${id}`), post);
}

export function removePost(id: string) {
	remove(ref(db, `/posts/${id}`));
}
