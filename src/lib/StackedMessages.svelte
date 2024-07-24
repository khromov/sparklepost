<script lang="ts">
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	export let components: Array<{ component: any; props: any }> = [];

	const messageStack = writable(components.map((comp, index) => ({ ...comp, zIndex: index + 1 })));

	function addLayer(component: any, props: any = {}) {
		messageStack.update((stack) => {
			const newZIndex = stack.length + 1;
			return [...stack, { component, props, zIndex: newZIndex }];
		});
	}

	function removeTopLayer() {
		messageStack.update((stack) => stack.slice(0, -1));
	}

	$: console.log($messageStack);
</script>

<div class="stacked-container">
	{#each $messageStack as layer, index (layer.zIndex)}
		<div
			class="message-layer"
			style="z-index: {layer.zIndex}"
			in:fly={{ x: 300, duration: 300, delay: 0 }}
			out:fly={{ x: 300, duration: 300 }}
		>
			<svelte:component this={layer.component} {...layer.props} />
			<p class="layer-info">Layer {index + 1} of {$messageStack.length}</p>
		</div>
	{/each}
</div>

<button on:click={() => addLayer(components[0].component, components[0].props)}>Add Layer</button>
<button on:click={removeTopLayer}>Remove Top Layer</button>

<style>
	.stacked-container {
		position: relative;
		width: 100%;
		height: 300px;
		overflow: hidden;
	}

	.message-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 20px;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.layer-info {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 0.8em;
		opacity: 0.7;
	}

	button {
		margin-top: 10px;
		margin-right: 10px;
		padding: 5px 10px;
		background-color: #1d9bf0;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
