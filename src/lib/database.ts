import type { Post } from '$lib/models/Post';
import { db } from '$lib/scripts/firebase';
import { onValue, push, ref } from 'firebase/database';

export async function getData(path: string): Promise<Map<string, Post>> {
	return (await new Promise(res => {
		onValue(ref(db, path), s => {
			if (s.exists()) {
				res(new Map(Object.entries(s.val())));
			}
		});
	})) as Map<string, Post>;
}

export function addData<T>(path: string, data: T) {
	push(ref(db, path), data).then(() => {});
}
