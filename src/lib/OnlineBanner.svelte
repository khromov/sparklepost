<script lang="ts">
	import { onMount } from 'svelte';

	let isOnline = $state(navigator.onLine);

	function updateOnlineStatus() {
		isOnline = navigator.onLine;
	}

	onMount(() => {
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);

		return () => {
			window.removeEventListener('online', updateOnlineStatus);
			window.removeEventListener('offline', updateOnlineStatus);
		};
	});
</script>

{#if !isOnline}
	<div class="online-status offline">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<line x1="1" y1="1" x2="23" y2="23"></line>
			<path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
			<path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
			<path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
			<path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
			<path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
			<line x1="12" y1="20" x2="12.01" y2="20"></line>
		</svg>
		You are currently offline
	</div>
{/if}

<style>
	.online-status {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		font-size: 14px;
		font-weight: 500;
		border-bottom: 1px solid #2f3336;
	}

	.offline {
		background-color: #080808;
		color: #e81c1c;
	}

	.online-status svg {
		margin-right: 8px;
	}
</style>
