<script lang="ts">
    export let title: string;
</script>

<div class="inner-component">
    <h2>{title}</h2>
    <p>This is an inner component with a title.</p>
</div>

<style>
    .inner-component {
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
    }
    h2 {
        margin-bottom: 10px;
    }
</style>