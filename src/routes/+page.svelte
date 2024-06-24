<script lang="ts">
	import Message from '$lib/Message.svelte';
	import { onMount } from 'svelte';

	let activeTab = 'For you';
	const tabs = ['For you', 'Following', 'Svelte Society'];

	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';

	let swiper: Swiper | null;
	let swiperEl: HTMLElement;

	const tabSlides = ['For you', 'Following', 'Svelte Society'];

	onMount(() => {
		swiper = new Swiper(swiperEl, {
			direction: 'horizontal',
            slidesPerView: 1,
			speed: 400,
			grabCursor: true,
			shortSwipes: true,
			longSwipesRatio: 0.1
		});
	});
</script>

<div class="content">
	<nav>
		{#each tabs as tab}
			<button class:active={activeTab === tab}>
				{tab}
			</button>
		{/each}
	</nav>

	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
            <div class="swiper-slide">
                {#each Array(10) as _, i}
                    <Message />
                {/each}
            </div>
            <div class="swiper-slide">
                {#each Array(10) as _, i}
                    <Message />
                {/each}
            </div>
            <div class="swiper-slide">
                {#each Array(10) as _, i}
                    <Message />
                {/each}
            </div>
        </div>
	</div>
</div>

<style>
	nav {
		display: flex;
		border-bottom: 1px solid #2f3336;
	}

	nav button {
		flex: 1;
		background: none;
		border: none;
		color: #71767b;
		font-weight: bold;
		padding: 15px 0;
		cursor: pointer;
	}

	nav button.active {
		color: white;
		border-bottom: 4px solid #1d9bf0;
	}
</style>
