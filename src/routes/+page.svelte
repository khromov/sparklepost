<script lang="ts">
	import Message from '$lib/Message.svelte';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';

	const tabs = ['For you', 'Following', 'Svelte Society'];
	let activeIndex = 0;
	let swiper: Swiper | null;
	let swiperEl: HTMLElement;

	onMount(() => {
		swiper = new Swiper(swiperEl, {
			direction: 'horizontal',
			slidesPerView: 1,
			speed: 400,
			grabCursor: true,
			shortSwipes: true,
			longSwipesRatio: 0.1,
			on: {
				slideChange: function (e) {
					activeIndex = e.activeIndex;
				}
			}
		});
	});

	function handleTabClick(index: number) {
		if (swiper) {
			swiper.slideTo(index);
		}
	}
</script>

<div class="content">
	<nav>
		{#each tabs as tab, index}
			<button class:active={activeIndex === index} on:click={() => handleTabClick(index)}>
				{tab}
			</button>
		{/each}
	</nav>

	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each tabs as tab}
				<div class="swiper-slide">
					{#each Array(10) as _, i}
						<Message />
					{/each}
				</div>
			{/each}
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

	:global(.swiper-slide) {
		height: auto;
		overflow-y: auto;
	}
</style>
