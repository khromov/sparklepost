<script lang="ts">
	import Message from '$lib/Message.svelte';
	import ScrollableView from '$lib/ScrollableView.svelte';
	import { activeTabIndex } from '$lib/stores/tab';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import { generateRandomComments } from '$lib/random';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import StackedMessages from '$lib/StackedMessages.svelte';
	import { spaNavigation } from '$lib/stores/load';

	let swiper = $state<Swiper | null>(null);
	let swiperEl = $state<HTMLElement | null>(null);

	let mounted = $state(false);

	let stackedComponents = $state<Array<{ componentName: any; props: any }>>([]);

	let scrollableViews = $state<HTMLElement[]>([]);

	$effect(() => {
		if ($page.state.stackedComponents) {
			stackedComponents = $page.state.stackedComponents;
		}
	});

	$effect(() => {
		if (swiperEl) {
			swiper = new Swiper(swiperEl, {
				direction: 'horizontal',
				slidesPerView: 1,
				speed: 400,
				grabCursor: true,
				shortSwipes: true,
				longSwipesRatio: 0.1,
				on: {
					slideChange: function (e) {
						activeTabIndex.set(e.activeIndex);
					}
				}
			});

			// To avoid rerenders
			mounted = true;
		}
	});

	$effect(() => {
		if (swiper && mounted) {
			swiper.slideTo($activeTabIndex);
		}
	});

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

	export const snapshot = {
		capture: () => {
			return {
				scrollPositions: scrollableViews.map((view) => view?.scrollTop ?? 0),
				activeTabIndex: $activeTabIndex
			};
		},
		restore: (value: { scrollPositions: number[]; activeTabIndex: number }) => {
			// We do not want to restore the tab index and Swiper if it's a full page reload
			if (!$spaNavigation) {
				return;
			}

			scrollableViews.forEach((view, index) => {
				if (view) {
					view.scrollTop = value.scrollPositions[index] ?? 0;
				}
			});
			activeTabIndex.set(value.activeTabIndex);
			swiper?.slideTo(value.activeTabIndex);
		}
	};
</script>

<div class="page-wrapper">
	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each Array(3) as _, i}
				<div class="swiper-slide">
					<ScrollableView bind:scrollableView={scrollableViews[i]}>
						{#each Array(10) as _, x}
							<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
							<div
								onclick={() =>
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
