<script lang="ts">
	import { fly } from 'svelte/transition';
	import { pushState, replaceState } from '$app/navigation';
	import MessageWithComments from './MessageWithComments.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface ComponentProps {
		componentName: string;
		props: any;
	}

	let { components = $bindable([]) } = $props<{ components: ComponentProps[] }>();

	const componentMappings = {
		MessageWithComments: MessageWithComments
		// Add other components here as needed
	};

	let messageLayerRefs: HTMLDivElement[] = [];

	function handleClose() {
		if (components.length > 0) {
			const newComponents = $state.snapshot(components).slice(0, -1);
			const currentScrollPositions = $page.state.scrollPositions || [];
			pushState('', { 
				stackedComponents: newComponents,
				scrollPositions: currentScrollPositions.slice(0, -1)
			});
		}
	}

	function handleScroll() {
		const currentScrollPositions = $page.state.scrollPositions || [];
		const updatedScrollPositions = [...currentScrollPositions];
		const lastIndex = updatedScrollPositions.length - 1;
		
		if (lastIndex >= 0 && messageLayerRefs[0]) {
			updatedScrollPositions[lastIndex] = messageLayerRefs[0].scrollTop;

			replaceState('', {
				...$page.state,
				scrollPositions: updatedScrollPositions
			});
		}
	}

	function handleCommentClick(comment: any) {
		const currentComponents = $page.state.stackedComponents || [];
		const currentScrollPositions = $page.state.scrollPositions || [];
		
		const newComponents = [
			...currentComponents,
			{
				componentName: 'MessageWithComments',
				props: {
					tweet: {
						name: comment.name,
						handle: comment.handle,
						time: comment.time,
						content: comment.content,
						avatarSeed: comment.avatarSeed
					},
					comments: comment.comments
				}
			}
		];
		
		pushState('', {
			stackedComponents: newComponents,
			scrollPositions: [...currentScrollPositions, 0]  // Preserve current scroll positions and add 0 for the new component
		});
	}

	let topComponents = $derived.by(() => {
		// Ensure only the top messages are rendered
		return components.slice(-2).reverse();
	});

	$effect(() => {
		const scrollPositions = $page.state.scrollPositions;
		console.log('scrollPositions:', scrollPositions);
		if (Array.isArray(scrollPositions) && messageLayerRefs[0]) {
			const lastIndex = scrollPositions.length - 1;
			if (lastIndex >= 0 && scrollPositions[lastIndex] !== undefined) {
				messageLayerRefs[0].scrollTop = scrollPositions[lastIndex];
			}
		}
	});

	onMount(() => {
		return () => {
			messageLayerRefs[0]?.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="stacked-container">
	{#each topComponents as layer, index (components.length - index - 1)}
		<div
			class="message-layer"
			style="z-index: {components.length - index}"
			in:fly={{ x: 300, duration: 200 }}
			out:fly={{ x: 300, duration: 200 }}
			bind:this={messageLayerRefs[index]}
			onscroll={handleScroll}
		>
			<button class="close-button" onclick={handleClose}>Close</button>
			<svelte:component
				this={componentMappings[layer.componentName as keyof typeof componentMappings]}
				{...layer.props}
				onCommentClick={handleCommentClick}
			/>
		</div>
	{/each}
</div>

<style>
	.stacked-container {
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1000;
		overflow: hidden;
	}

	.message-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 1);
		color: white;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: transparent;
		color: white;
		border: none;
		font-size: 16px;
		cursor: pointer;
	}
</style>