<script lang="ts">
	import type { Post } from '$lib/models/Post';
	import { removePost } from '$lib/services/PostsSevice';

	export let uid: string;
	export let post: Post;
</script>

<div class="d-flex flex-column bg-light text-dark rounded h-100 shadow-sm">
	<div class="p-3 flex-grow-1">
		<div class="d-flex justify-content-between align-items-center">
			<h5>{post.title}</h5>
			<button
				class="btn btn-sm btn-dark text-light"
				on:click={async () => {
					removePost(uid);
				}}
			>
				Удалить
			</button>
		</div>
		<div>{post.description}</div>
	</div>
	<div class="rounded-bottom" style="height: 10em; background: url({post.cover}) center; backgroundSize: cover"></div>
</div>
