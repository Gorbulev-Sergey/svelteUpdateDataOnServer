<script lang="ts">
	import { Post } from '$lib/models/Post.js';
	import { addPost, removePost } from '$lib/services/PostsSevice.js';
	import { onMount } from 'svelte';

	export let data;
	//let posts = [] as [string, Post][];
	let { posts } = data;
	let newPost = new Post();

	onMount(async () => {
		//posts = await getPosts();
		console.log(posts);
	});
</script>

<div class="bg-light text-dark p-3 rounded mb-3">
	<div class="d-flex align-items-center justify-content-between mb-3">
		<h4 class="mb-0">Новая публикация</h4>
		<button
			class="btn btn-dark text-light"
			on:click={async () => {
				addPost(newPost);
				newPost = new Post();
			}}>Создать</button
		>
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

<div class="bg-light text-dark p-3 rounded mb-3">
	<h4>Список публикаций</h4>
	{#each posts as [key, post], i (key)}
		<div id={key}>{i + 1}. {post.title}</div>
	{/each}
</div>

<div class="row row-cols-1 row-cols-md-3 g-4">
	{#each posts as [key, post], i}
		<div class="col">
			<div class="d-flex flex-column bg-light text-dark rounded h-100">
				<div class="p-3 flex-grow-1">
					<div class="d-flex justify-content-between align-items-center">
						<h5>{post.title}</h5>
						<button
							class="btn btn-sm btn-dark text-light"
							on:click={async () => {
								removePost(key);
							}}
						>
							Удалить
						</button>
					</div>
					<div>{post.description}</div>
				</div>
				<div class="rounded-bottom" style=" height: 10em; background: url({post.cover}) center; backgroundSize: cover"></div>
			</div>
		</div>
	{/each}
</div>
