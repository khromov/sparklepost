<script lang="ts">
    import { writable } from 'svelte/store';

    export let initialContent: string = '';

    const messageStack = writable([{ content: initialContent, zIndex: 1 }]);

    function addLayer(content: string = '') {
        messageStack.update(stack => {
            const newZIndex = stack.length + 1;
            const newContent = content || `Layer ${newZIndex} - ${Date.now()}`;
            return [...stack, { content: newContent, zIndex: newZIndex }];
        });
    }

    function removeTopLayer() {
        messageStack.update(stack => stack.slice(0, -1));
    }

    $: console.log($messageStack);
</script>

<div class="stacked-container">
    {#each $messageStack as layer, index}
        <div class="message-layer" style="z-index: {layer.zIndex}">
            <p>{layer.content}</p>
            <p class="layer-info">Layer {index + 1} of {$messageStack.length}</p>
        </div>
    {/each}
</div>

<button on:click={() => addLayer()}>Add Layer</button>
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