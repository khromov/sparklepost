<script lang="ts">
	import { fly } from 'svelte/transition';
	import { pushState } from '$app/navigation';
	import MessageWithComments from './MessageWithComments.svelte';

	interface ComponentProps {
		componentName: string;
		props: any;
	}

	let { components = $bindable([]) } = $props<{ components: ComponentProps[] }>();

	const componentMappings = {
		"MessageWithComments": MessageWithComments,
		// Add other components here as needed
	};

	function handleClose() {
		if (components.length > 0) {
			const newComponents = components.slice(0, -1);
			pushState('', { stackedComponents: newComponents });
		}
	}

	let topComponents = $derived.by(() => {
		// Ensure only the top messages are rendered
		return components.slice(-3).reverse();
	});
</script>

<div class="stacked-container">
	{#each topComponents as layer, index (components.length - index - 1)}
		<div
			class="message-layer"
			style="z-index: {components.length - index}"
			in:fly={{ x: 300, duration: 200 }}
			out:fly={{ x: 300, duration: 200 }}
		>
			<button class="close-button" on:click={handleClose}>Close</button>
			<svelte:component this={componentMappings[layer.componentName]} {...layer.props} />
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