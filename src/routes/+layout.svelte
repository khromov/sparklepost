<script lang="ts">
	import '$lib/reset.css';
	import Nav from '$lib/Nav.svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, goto, onNavigate, pushState } from '$app/navigation';
	import { activeTabIndex } from '$lib/stores/tab';
	import { spaNavigation } from '$lib/stores/load';
	import OnlineBanner from '$lib/OnlineBanner.svelte';

	beforeNavigate((navigation) => {
		// If we have navigated at least once, we are in SPA mode
		$spaNavigation = true;
	});

	onNavigate((navigation) => {
		$activeTabIndex = 0;

		if (!document.startViewTransition) return;

		if (navigation.from?.route.id === navigation.to?.route.id) {
			return;
		}

		if (navigation.to?.route.id === '/') {
			document.documentElement.classList.add('back-transition');
		}

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.finished.finally(() => {
				document.documentElement.classList.remove('back-transition');
			});
		});
	});

	const handleLogoClick = (e: any) => {
		e.preventDefault();

		// Clear the stack of components
		if($page.url.pathname === '/' && $page.state.stackedComponents && $page.state.stackedComponents.length > 0) {
			pushState('', { stackedComponents: [] });
		} else {
			goto('/');
		}
	}

	const handleBottomMockClick = () => {
		alert(`I'm not functional, try the tabs and settings button instead!`);
	}
</script>

<main>
	<header>
		<div class="profile-icon"></div>
		<div class="logo">
			<a href="/" onclick={handleLogoClick}>✨</a>
		</div>
		<a href="/settings">
			<div class="settings-icon">
		</a>
	</header>

	{#if $page.url.pathname === '/'}
		<Nav />
	{/if}

	<OnlineBanner />

	<div class="content">
		<slot />
	</div>

	<footer>
		<button class="home-icon" onclick={handleBottomMockClick}></button>
		<button class="search-icon" onclick={handleBottomMockClick}></button>
		<button class="notifications-icon" onclick={handleBottomMockClick}></button>
		<button class="messages-icon" onclick={handleBottomMockClick}></button>
	</footer>
</main>

<style>
	/* Shared CSS */
	:global(body) {
		background-color: black;
		-webkit-tap-highlight-color: transparent;
	}

	main {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		max-width: 600px;
		margin: 0 auto;
		background-color: black;
		color: white;
		height: 100vh;
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	header {
		view-transition-name: header;
		background-color: black;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 15px;
		border-bottom: 1px solid #2f3336;
	}

	.content {
		flex-grow: 1;
		overflow-y: hidden;
	}

	.profile-icon,
	.settings-icon {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #333;
	}

	.logo {
		font-size: 24px;
	}

	.logo a {
		text-decoration: none;
	}

	button {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		font: inherit;
		padding: 0;
	}

	.home-icon {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z'/%3E%3Cpath d='M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z'/%3E%3C/svg%3E");
	}

	.search-icon {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'/%3E%3C/svg%3E");
	}

	.notifications-icon {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z'/%3E%3C/svg%3E");
	}

	.messages-icon {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z'/%3E%3C/svg%3E");
	}

	.settings-icon {
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.028-2.29-2.29S10.738 9.71 12 9.71s2.29 1.028 2.29 2.29-1.028 2.29-2.29 2.29z'/%3E%3Cpath d='M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.472.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z'/%3E%3C/svg%3E");
		background-color: white;
	}

	footer {
		view-transition-name: footer;
		display: flex;
		justify-content: space-around;
		padding: 10px 0;
		border-top: 1px solid #2f3336;
	}

	footer button {
		background: none;
		border: none;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	.home-icon,
	.search-icon,
	.notifications-icon,
	.messages-icon {
		background-color: #71767b;
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
	}

	/* View transitions */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	/* Right to Left */
	@keyframes slide-from-right {
		from {
			transform: translateX(100%);
		}
	}

	@keyframes zoom-out-and-darken {
		to {
			transform: scale(0.9);
			filter: brightness(0);
		}
	}

	/* Left to Right */
	@keyframes zoom-in-and-brighten {
		from {
			transform: scale(0.9);
			filter: brightness(0);
		}
	}

	@keyframes slide-to-right {
		to {
			transform: translateX(100%);
		}
	}

	:root::view-transition-old(root) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both zoom-out-and-darken;
		z-index: 1;
	}

	:root::view-transition-new(root) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
		z-index: 2;
	}

	/* New view transition rules for left-to-right */
	.back-transition:root::view-transition-old(root) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right;
		z-index: 2;
	}

	.back-transition:root::view-transition-new(root) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both zoom-in-and-brighten;
		z-index: 1;
	}
</style>
