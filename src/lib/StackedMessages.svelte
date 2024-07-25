<script lang="ts">
	import { fly } from 'svelte/transition';
	import { pushState } from '$app/navigation';
	import MessageWithComments from './MessageWithComments.svelte';

	interface MyProps {
		components: Array<{ componentName: string; props: any }>;
	}

	//export let components: Array<{ componentName: string; props: any }> = [];
	let { components = $bindable([]) }: MyProps = $props();

	const componentMappings = {
		MessageWithComments: MessageWithComments
		// Add other components here as needed
	};

	function handleClose() {
		if (components.length > 0) {
			const newComponents = components.slice(0, -1);
			pushState('', { stackedComponents: newComponents });
		}
	}
</script>

<div class="stacked-container">
	{#each components as layer, index (index)}
		<div
			class="message-layer"
			style="z-index: {index + 1}"
			in:fly={{ x: 300, duration: 300, delay: 0 }}
			out:fly={{ x: 300, duration: 300 }}
		>
			<button class="close-button" onclick={handleClose}>Close</button>
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
