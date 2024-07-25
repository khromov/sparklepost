<script lang="ts">
    import { onMount } from 'svelte';

    let scrollContainer: HTMLElement;
    let scrollPosition = 0;

    onMount(() => {
        scrollContainer.scrollTop = scrollPosition;
    });

    function handleScroll() {
        scrollPosition = scrollContainer.scrollTop;
    }
</script>

<div class="scrollable-content" bind:this={scrollContainer} on:scroll={handleScroll}>
    <slot />
</div>

<style>
    .scrollable-content {
        height: calc(100vh - 56px - 54px - 50px); /* subtract top and bottom bars */
        overflow-y: auto;
    }
</style>