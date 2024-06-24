<script lang="ts">
	import Message from '$lib/Message.svelte';
	import { activeTabIndex } from '$lib/stores/tab';
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
					$activeTabIndex = e.activeIndex;
				}
			}
		});
	});

    $: swiper?.slideTo($activeTabIndex);

	function handleTabChange(event: CustomEvent<number>) {
		if (swiper) {
			swiper.slideTo(event.detail);
		}
	}
</script>

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

<style>
    /*
	:global(.swiper-slide) {
		height: auto;
		overflow-y: auto;
	}
    */
</style>