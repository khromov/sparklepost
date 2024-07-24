<script lang="ts">
	import Message from '$lib/Message.svelte';
	import ScrollableView from '$lib/ScrollableView.svelte';
	import { activeTabIndex } from '$lib/stores/tab';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import StackedMessages from '$lib/StackedMessages.svelte';
	import MessageWithComments from '$lib/MessageWithComments.svelte';
	import { writable, type Writable } from 'svelte/store';

	let swiper: Swiper | null;
	let swiperEl: HTMLElement;

	let mounted = false;

	const componentsStore: Writable<Array<any>> = writable([]);

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
		componentsStore.update((components) => [
			...components,
			{
				component: MessageWithComments,
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
		]);
	}

	function generateRandomComments() {
		const commenters = ['Alex', 'Sam', 'Taylor', 'Jordan', 'Casey'];
		const contents = [
			'Interesting point!',
			'I disagree, actually.',
			'Can you elaborate on that?',
			'This thread is getting deep!',
			'I love this discussion!'
		];

		return Array.from({ length: Math.floor(Math.random() * 3) + 5 }, (_, index) => ({
			name: commenters[Math.floor(Math.random() * commenters.length)],
			handle: `@user${Math.floor(Math.random() * 1000)}`,
			time: `${Math.floor(Math.random() * 59) + 1}m`,
			content: contents[Math.floor(Math.random() * contents.length)],
			avatarSeed: `comment-${index}-${Date.now()}`
		}));
	}
</script>

<div class="page-wrapper">
	<div class="swiper" bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each Array(3) as _, i}
				<div class="swiper-slide">
					<ScrollableView>
						{#each Array(10) as _, x}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
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
	<StackedMessages components={$componentsStore} {componentsStore} />
</div>

<style>
	.page-wrapper {
		overflow-y: hidden;
		position: relative;
	}
</style>
