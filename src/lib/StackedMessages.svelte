<script lang="ts">
	import { fly } from 'svelte/transition';
	import { pushState } from '$app/navigation';
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
			const scrollPositions = messageLayerRefs.map(ref => ref?.scrollTop ?? 0);
			pushState('', { 
				stackedComponents: newComponents,
				scrollPositions: scrollPositions.slice(0, -1)
			});
		}
	}

	let topComponents = $derived.by(() => {
		// Ensure only the top messages are rendered
		return components.slice(-2).reverse();
	});

	$effect(() => {
		const scrollPositions = $page.state.scrollPositions;
		console.log('scrollPositions:', scrollPositions);
		if (Array.isArray(scrollPositions)) {
			messageLayerRefs.forEach((ref, index) => {
				if (ref && scrollPositions[index] !== undefined) {
					//ref.scrollTop = scrollPositions[index];
					ref.scrollTop = 20;
				}
			});
		}
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
		>
			<button class="close-button" onclick={handleClose}>Close</button>
			<svelte:component
				this={componentMappings[layer.componentName as keyof typeof componentMappings]}
				{...layer.props}
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