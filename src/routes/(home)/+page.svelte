<script lang="ts">
	import { Post as classPost } from '$lib/models/Post.js';
	import Post from '$lib/components/Post.svelte';
	import { addPost, removePost } from '$lib/services/PostsSevice.js';
	import { onMount } from 'svelte';
	import { onValue, ref } from 'firebase/database';
	import { db } from '$lib/scripts/firebase';

	let newPost = new classPost();
	let search: string = '';
	let isNewPostFirst = true;
	let countPostsColumns = 3;
	/*Изначальный массив постов*/
	let posts: [string, classPost][] = new Array();
	/*Массив постов, отфильтрованных по строке поиска*/
	$: searchPosts = posts.filter(post => post[1].title.toLowerCase().includes(search.toLowerCase()));
	/*Массив постов, отфильтрованных по строке поиска и дате*/
	$: sortedPostsbyDate = isNewPostFirst
		? searchPosts.sort((v1, v2) => new Date(v2[1].date).getTime() - new Date(v1[1].date).getTime())
		: searchPosts.sort((v1, v2) => new Date(v1[1].date).getTime() - new Date(v2[1].date).getTime());

	let isListPostsHide = true;

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
	<input class="form-control" bind:value={search} placeholder="Строка поиска" />
	<button class="btn btn-light border-dark-subtle" on:click={() => (search = '')}><i class="fa-solid fa-xmark"></i></button>
</div>

<div class="bg-light text-dark p-3 rounded mb-3 shadow-sm">
	<h4>Фильтры:</h4>
	<div class="d-flex align-items-center gap-2">
		<div class="d-flex align-items-center gap-1">
			<div class="small">сначала:</div>
			<button class="btn btn-sm btn-dark" on:click={() => (isNewPostFirst = !isNewPostFirst)}>{isNewPostFirst ? 'новые' : 'старые'}</button>
		</div>
		<div class="d-flex align-items-center gap-1">
			<div class="small">колонок:</div>
			<div class="btn-group btn-group-sm">
				<button class="btn btn-dark" on:click={() => (countPostsColumns = countPostsColumns > 0 ? countPostsColumns - 1 : countPostsColumns)}>
					<i class="fa-solid fa-angle-down"></i>
				</button>
				<div class="btn btn-dark bg-dark border-dark">{countPostsColumns}</div>
				<button class="btn btn-dark" on:click={() => (countPostsColumns = countPostsColumns < 6 ? countPostsColumns + 1 : countPostsColumns)}>
					<i class="fa-solid fa-angle-up"></i>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="bg-light text-dark p-3 rounded mb-3 shadow-sm">
	<div class="d-flex align-items-center justify-content-between mb-2">
		<h4 class="mb-0">Список публикаций</h4>
		<button class="btn btn-light" on:click={() => (isListPostsHide = !isListPostsHide)}><i class="fa-solid fa-angle-{isListPostsHide ? 'down' : 'up'}"></i></button>
	</div>
	<div class:d-none={isListPostsHide} class="d-flex flex-column gap-1">
		{#each sortedPostsbyDate as [key, post], i (key)}
			<div class="d-flex align-items-center justify-content-between">
				<div id={key}>{isNewPostFirst ? sortedPostsbyDate.length - i : i + 1}. {post.title}</div>
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

<div class="row row-cols-1 row-cols-md-{countPostsColumns} g-4">
	{#each sortedPostsbyDate as [uid, post], i}
		<div class="col">
			<Post {uid} {post} />
		</div>
	{/each}
</div>
