<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { tabs, activeTabIndex } from './stores/tab';

	const dispatch = createEventDispatcher();

	function handleTabClick(index: number) {
		dispatch('tabchange', index);
	}
</script>

<nav>
	{#each tabs as tab, index}
		<button class:active={$activeTabIndex === index} on:click={() => handleTabClick(index)}>
			{tab}
			<div class="underline" class:active={$activeTabIndex === index}></div>
		</button>
	{/each}
</nav>

<style>
	nav {
		position: sticky;
		top: 51px; /* Adjust this value to match the height of your header */
		z-index: 5;
		background-color: black;
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
		position: relative;
		overflow: hidden;
	}

	nav button.active {
		color: white;
	}

	.underline {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: #1d9bf0;
		transform: scaleX(0);
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
		opacity: 0;
	}

	.underline.active {
		transform: scaleX(1);
		opacity: 1;
	}
</style>