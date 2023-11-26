import type { Post } from '$lib';
import { db } from '$lib/scripts/firebase';
import { onValue, ref } from 'firebase/database';

export async function getData(path: string) {
	return await new Promise((res) => {
		onValue(ref(db, path), (s) => {
			if (s.exists()) {
				res(Object.entries(s.val()));
			}
		});
	});
}
