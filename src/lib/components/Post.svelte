<script lang="ts">
	import type { Post } from '$lib/models/Post';
	import { removePost } from '$lib/services/PostsSevice';

	export let post: [string, Post];
</script>

<div class="d-flex flex-column bg-light text-dark rounded h-100 shadow-sm">
	<div class="p-3 flex-grow-1">
		<div class="d-flex justify-content-between align-items-center">
			<h5>{post[1].title}</h5>
			<button
				class="btn btn-sm btn-dark text-light"
				on:click={async () => {
					removePost(post[0]);
				}}
			>
				Удалить
			</button>
		</div>
		<div>{post[1].description}</div>
	</div>
	<div class="rounded-bottom" style="height: 10em; background: url({post[1].cover}) center; backgroundSize: cover"></div>
</div>
