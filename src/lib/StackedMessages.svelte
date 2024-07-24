<script lang="ts">
    import { writable } from 'svelte/store';

    export let initialContent: string = '';

    const messageStack = writable([{ content: initialContent, zIndex: 1 }]);

    function addLayer(content: string = '') {
        messageStack.update(stack => {
            const newZIndex = stack.length + 1;
            return [...stack, { content, zIndex: newZIndex }];
        });
    }

    function removeTopLayer() {
        messageStack.update(stack => stack.slice(0, -1));
    }

    $: console.log($messageStack);
</script>

<div class="stacked-container">
    {#each $messageStack as layer}
        <div class="message-layer" style="z-index: {layer.zIndex}">
            <p>{layer.content}</p>
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