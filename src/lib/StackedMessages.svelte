<script lang="ts">
    import { fly } from 'svelte/transition';

    export let components: Array<{ component: any, props: any }> = [];
</script>

<div class="stacked-container">
    {#each components as layer, index (index)}
        <div 
            class="message-layer" 
            style="z-index: {index + 1}"
            in:fly="{{ x: 300, duration: 300, delay: 0 }}"
            out:fly="{{ x: 300, duration: 300 }}"
        >
            <svelte:component this={layer.component} {...layer.props} />
            <p class="layer-info">Layer {index + 1} of {components.length}</p>
        </div>
    {/each}
</div>

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
        background-color: rgba(0, 0, 0, 1);
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
        opacity: 1;
    }
</style>