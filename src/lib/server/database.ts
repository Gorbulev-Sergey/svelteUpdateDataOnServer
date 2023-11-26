import { db } from '$lib/scripts/firebase';
import { onValue, ref } from 'firebase/database';

export function getData(path: string) {
	return new Promise((res) => {
		onValue(ref(db, path), (r) => {
			res(Object.values(r.val()));
		});
	});
}
