<script lang="ts">
	import Message from '$lib/Message.svelte';
	import ScrollableView from '$lib/ScrollableView.svelte';
	import { activeTabIndex } from '$lib/stores/tab';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import { generateRandomComments } from '$lib/random';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import StackedMessages from '$lib/StackedMessages.svelte';

	let swiper: Swiper | null;
	let swiperEl: HTMLElement;

	let mounted = false;

	let stackedComponents: Array<{ componentName: any; props: any }> = [];

	$: {
		if ($page.state.stackedComponents) {
			stackedComponents = $page.state.stackedComponents;
		}
	}

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

		// To avoid rerenders
		mounted = true;
	});

	$: swiper && mounted && swiper?.slideTo($activeTabIndex);

	function handleMessageClick(message: any) {
		const currentComponents = $page.state.stackedComponents || [];
		const newComponents = [
			...currentComponents,
			{
				componentName: 'MessageWithComments',
				props: {
					tweet: {
						name: message.name,
						handle: message.handle,
						time: message.time,
						content: message.content,
						avatarSeed: message.avatarSeed
					},
					comments: generateRandomComments()
				}
			}
		];
		pushState('', { stackedComponents: newComponents });
	}
</script>

<div class="page-wrapper">
	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each Array(3) as _, i}
				<div class="swiper-slide">
					<ScrollableView>
						{#each Array(10) as _, x}
							<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
							<div
								on:click={() =>
									handleMessageClick({
										name: 'User',
										handle: '@user',
										time: '1h',
										content: `Message ${x + 1} in tab ${i + 1}`,
										avatarSeed: `${i}-${x}`
									})}
							>
								<Message tab={i} number={x} />
							</div>
						{/each}
					</ScrollableView>
				</div>				
			{/each}
		</div>
	</div>
	<StackedMessages components={stackedComponents} />
</div>

<style>
	.page-wrapper {
		overflow-y: hidden;
		position: relative;
	}
</style>
