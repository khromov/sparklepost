<script lang="ts">
	import { spaNavigation } from '$lib/stores/load';

	let displayName = 'Stanislav';
	let bio = 'Just another Svelte user';
	let darkMode = true;
	let emailNotifications = true;
	let pushNotifications = false;
	let language = 'en';
	let privacyLevel = 'public';

	let settingsContainer: HTMLDivElement;

	function saveSettings() {
		// Implement save functionality here
		alert('Settings saved!');
	}

	export const snapshot = {
		capture: () => {
			return { scrollY: settingsContainer?.scrollTop ?? 0 };
		},
		restore: (value: { scrollY: number }) => {
			if (!$spaNavigation) {
				return;
			}
			settingsContainer.scrollTop = value.scrollY;
		}
	};
</script>

<div class="settings-container" bind:this={settingsContainer}>
	<h1>Settings</h1>

	<div class="setting-group">
		<label for="displayName">Display Name</label>
		<input type="text" id="displayName" bind:value={displayName} />
	</div>

	<div class="setting-group">
		<label for="bio">Bio</label>
		<textarea id="bio" bind:value={bio}></textarea>
	</div>

	<div class="setting-group">
		<label>
			<input type="checkbox" bind:checked={darkMode} />
			Dark Mode
		</label>
	</div>

	<div class="setting-group">
		<h2>Notifications</h2>
		<label>
			<input type="checkbox" bind:checked={emailNotifications} />
			Email Notifications
		</label>
		<label>
			<input type="checkbox" bind:checked={pushNotifications} />
			Push Notifications
		</label>
	</div>

	<div class="setting-group">
		<label for="language">Language</label>
		<select id="language" bind:value={language}>
			<option value="en">English</option>
			<option value="es">Español</option>
			<option value="fr">Français</option>
			<option value="de">Deutsch</option>
		</select>
	</div>

	<div class="setting-group">
		<label for="privacyLevel">Privacy Level</label>
		<select id="privacyLevel" bind:value={privacyLevel}>
			<option value="public">Public</option>
			<option value="friends">Friends Only</option>
			<option value="private">Private</option>
		</select>
	</div>

	<button on:click={saveSettings}>Save Settings</button>
</div>

<style>
	.settings-container {
		padding: 20px;
		color: #fff;
		height: 100%;
		overflow-y: auto;
	}

	h1,
	h2 {
		margin-bottom: 20px;
	}

	.setting-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input[type='text'],
	textarea,
	select {
		width: 100%;
		padding: 8px;
		border: 1px solid #2f3336;
		background-color: #000;
		color: #fff;
		border-radius: 4px;
	}

	textarea {
		height: 100px;
		resize: vertical;
	}

	input[type='checkbox'] {
		margin-right: 8px;
	}

	button {
		background-color: #1d9bf0;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 20px;
		cursor: pointer;
		font-weight: bold;
	}

	button:hover {
		background-color: #1a8cd8;
	}
</style>