<script lang="ts">
	import { Post as classPost } from '$lib/models/Post.js';
	import Post from '$lib/components/Post.svelte';
	import { addPost, removePost } from '$lib/services/PostsSevice.js';
	import { onMount } from 'svelte';
	import { onValue, ref } from 'firebase/database';
	import { db } from '$lib/scripts/firebase';

	let posts: [string, classPost][] = new Array();
	let search: string = '';
	let searchPosts: [string, classPost][] = new Array();
	let newPost = new classPost();

	onMount(async () => {
		onValue(ref(db, '/posts'), s => {
			if (s.exists()) posts = searchPosts = Object.entries(s.val());
		});
	});
</script>

<div class="bg-light text-dark p-3 rounded mb-3 shadow-sm">
	<div class="d-flex align-items-center justify-content-between mb-3">
		<h4 class="mb-0">Новая публикация</h4>
		<button
			class="btn btn-dark text-light"
			on:click={async () => {
				if (newPost.title.trim() != '') {
					addPost(newPost);
					newPost = new classPost();
				}
			}}>Создать</button
		>
	</div>
	<div class="d-flex flex-column gap-2">
		<div class="flex-grow-1 d-flex flex-column gap-2">
			<input class="form-control" type="text" bind:value={newPost.title} placeholder="Заголовок" />
			<textarea class="form-control" bind:value={newPost.description} placeholder="Описание" />
			<input class="form-control" type="text" bind:value={newPost.cover} placeholder="url фотографии" />
		</div>
		{#if newPost.cover}
			<div class="rounded" style="height: 11em; background:url({newPost.cover}) center; backdrop-size:cover"></div>
		{/if}
	</div>
</div>

<div class="bg-light text-dark p-3 rounded mb-3 shadow-sm input-group">
	<input
		class="form-control"
		bind:value={search}
		placeholder="Строка поиска"
		on:input={() => {
			searchPosts = posts.filter(post => post[1].title.toLowerCase().includes(search.toLowerCase()));
			console.log(searchPosts);
		}}
	/>
	<button class="btn btn-outline-dark" on:click={() => (search = '')}>Очистить</button>
</div>
<div class="bg-light text-dark p-3 rounded mb-3 shadow-sm">
	<h4>Список публикаций</h4>
	<div class="d-flex flex-column gap-1">
		{#each searchPosts as [key, post], i (key)}
			<div class="d-flex align-items-center justify-content-between">
				<div id={key}>{i + 1}. {post.title}</div>
				<button
					class="btn btn-sm btn-dark text-light"
					on:click={async () => {
						removePost(key);
					}}
				>
					Удалить
				</button>
			</div>
		{/each}
	</div>
</div>

<div class="row row-cols-1 row-cols-md-3 g-4">
	{#each searchPosts as [key, post], i}
		<div class="col">
			<Post post={[key, post]} />
		</div>
	{/each}
</div>
