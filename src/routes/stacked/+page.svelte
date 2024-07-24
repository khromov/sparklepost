<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import StackedMessages from '$lib/StackedMessages.svelte';
    import TweetWithComments from '$lib/MessageWithComments.svelte';

    const componentsStore: Writable<Array<any>> = writable([]);

    function addLayer() {
        componentsStore.update(components => {
            const newIndex = components.length + 1;
            return [...components, {
                component: TweetWithComments,
                props: {
                    tweet: {
                        name: `User ${newIndex}`,
                        handle: `@user${newIndex}`,
                        time: '1h',
                        content: `This is tweet number ${newIndex} in the stack!`,
                        avatarSeed: `main-tweet-${newIndex}`
                    },
                    comments: [
                        {
                            name: 'Commenter A',
                            handle: '@commenterA',
                            time: '30m',
                            content: 'Great tweet!',
                            avatarSeed: `comment-A-${newIndex}`
                        },
                        {
                            name: 'Commenter B',
                            handle: '@commenterB',
                            time: '15m',
                            content: 'I agree!',
                            avatarSeed: `comment-B-${newIndex}`
                        }
                    ]
                }
            }];
        });
    }

    function removeTopLayer() {
        componentsStore.update(components => components.slice(0, -1));
    }
</script>

<StackedMessages components={$componentsStore} {componentsStore} />

<div class="controls">
    <button on:click={addLayer}>Add Tweet</button>
    <button on:click={removeTopLayer}>Remove Top Tweet</button>
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