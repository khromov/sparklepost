<script lang="ts">
  let displayName = "Stanislav";
  let bio = "Just another Svelte user";
  let darkMode = true;
  let emailNotifications = true;
  let pushNotifications = false;

  function saveSettings() {
      // Implement save functionality here
      alert("Settings saved!");
  }
</script>

<div class="settings-container">
  <h1>Settings</h1>
  
  <div class="setting-group">
      <label for="displayName">Display Name</label>
      <input type="text" id="displayName" bind:value={displayName}>
  </div>

  <div class="setting-group">
      <label for="bio">Bio</label>
      <textarea id="bio" bind:value={bio}></textarea>
  </div>

  <div class="setting-group">
      <label>
          <input type="checkbox" bind:checked={darkMode}>
          Dark Mode
      </label>
  </div>

  <div class="setting-group">
      <h2>Notifications</h2>
      <label>
          <input type="checkbox" bind:checked={emailNotifications}>
          Email Notifications
      </label>
      <label>
          <input type="checkbox" bind:checked={pushNotifications}>
          Push Notifications
      </label>
  </div>

  <button on:click={saveSettings}>Save Settings</button>
</div>

<style>
  .settings-container {
      padding: 20px;
      color: #fff;
  }

  h1, h2 {
      margin-bottom: 20px;
  }

  .setting-group {
      margin-bottom: 20px;
  }

  label {
      display: block;
      margin-bottom: 5px;
  }

  input[type="text"],
  textarea {
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

  input[type="checkbox"] {
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