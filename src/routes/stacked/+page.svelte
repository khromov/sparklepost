<script lang="ts">
    import StackedMessages from '$lib/StackedMessages.svelte';
    import Inner from '$lib/Inner.svelte';

    const components = [
        { component: Inner, props: { title: 'First Component' } },
        { component: Inner, props: { title: 'Second Component' } },
        { component: Inner, props: { title: 'Third Component' } },
    ];
</script>

<h1>Stacked Messages Demo</h1>

<StackedMessages {components} />