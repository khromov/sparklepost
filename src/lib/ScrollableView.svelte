<script lang="ts">
    import { onMount } from 'svelte';

    let { scrollableView = $bindable<HTMLElement | undefined>() } = $props();

    let scrollContainer: HTMLElement;
    let scrollPosition = $state(0);

    onMount(() => {
        scrollContainer.scrollTop = scrollPosition;
        scrollableView = scrollContainer;
    });

    function handleScroll() {
        scrollPosition = scrollContainer.scrollTop;
    }
</script>

<div class="scrollable-content" bind:this={scrollContainer} onscroll={handleScroll}>
	<slot />
</div>

<style>
	.scrollable-content {
		height: calc(100vh - 56px - 54px - 50px); /* subtract top and bottom bars */
		overflow-y: auto;
	}
</style>
