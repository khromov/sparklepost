<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { Writable } from 'svelte/store';

    export let components: Array<{ component: any, props: any }> = [];
    export let componentsStore: Writable<Array<any>>; 
</script>

{#if components.length > 0}
    <div class="stacked-container">
        {#each components as layer, index (index)}
            <div 
                class="message-layer" 
                style="z-index: {index + 1}"
                in:fly="{{ x: 300, duration: 300, delay: 0 }}"
                out:fly="{{ x: 300, duration: 300 }}"
            >
                <svelte:component this={layer.component} {...layer.props} {componentsStore} />
            </div>
        {/each}
    </div>
{/if}

<style>
    .stacked-container {
        position: fixed;
        top: 110px; /* Adjust this value to position below the top menu and tab bar */
        left: 0;
        right: 0;
        bottom: 0;
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
</style>