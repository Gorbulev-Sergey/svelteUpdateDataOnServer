<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	class Post {
		title: string = '';
		description?: string;
		cover?: string;
	}
	let newPost = new Post();

	onMount(() => {
		console.log(data.posts);
	});
</script>

<div class="bg-light text-dark p-3 rounded">
	<div class="d-flex align-items-center justify-content-between mb-3">
		<h4 class="mb-0">Новая публикация</h4>
		<button class="btn btn-dark text-light">Создать</button>
	</div>
	<div class="d-flex gap-2">
		<div class="flex-grow-1 d-flex flex-column gap-2">
			<input class="form-control" type="text" bind:value={newPost.title} placeholder="Заголовок" />
			<textarea class="form-control" bind:value={newPost.description} placeholder="Описание" />
			<input class="form-control" type="text" bind:value={newPost.cover} placeholder="url фотографии" />
		</div>
		{#if newPost.cover}
			<div class="w-25 rounded" style="height: 11em; background:url({newPost.cover}) center; backdrop-size:cover"></div>
		{/if}
	</div>
</div>
