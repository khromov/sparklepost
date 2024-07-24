<script lang="ts">
    import { writable } from 'svelte/store';
    import StackedMessages from '$lib/StackedMessages.svelte';
    import Inner from '$lib/Inner.svelte';

    const componentsStore = writable([
        { component: Inner, props: { title: 'First Component' } },
        { component: Inner, props: { title: 'Second Component' } },
        { component: Inner, props: { title: 'Third Component' } },
    ]);

    function addLayer() {
        componentsStore.update(components => {
            const newIndex = components.length + 1;
            return [...components, { component: Inner, props: { title: `Component ${newIndex}` } }];
        });
    }

    function removeTopLayer() {
        componentsStore.update(components => components.slice(0, -1));
    }
</script>

<h1>Stacked Messages Demo</h1>

<StackedMessages components={$componentsStore} />

<div class="controls">
    <button on:click={addLayer}>Add Layer</button>
    <button on:click={removeTopLayer}>Remove Top Layer</button>
</div>

<style>
    .controls {
        margin-top: 20px;
    }

    button {
        margin-right: 10px;
        padding: 5px 10px;
        background-color: #1d9bf0;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>