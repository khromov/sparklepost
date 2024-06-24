<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
  
    function closeSettings() {
      dispatch('close');
    }
  </script>
  
  <div class="settings-screen">
    <header>
      <button class="back-button" on:click={closeSettings}>←</button>
      <h1>Settings</h1>
    </header>
    
    <main>
      <section>
        <h2>Account</h2>
        <ul>
          <li>Profile</li>
          <li>Password</li>
          <li>Privacy</li>
        </ul>
      </section>
      
      <section>
        <h2>Display</h2>
        <ul>
          <li>Theme</li>
          <li>Font Size</li>
        </ul>
      </section>
      
      <section>
        <h2>Notifications</h2>
        <ul>
          <li>Push Notifications</li>
          <li>Email Notifications</li>
        </ul>
      </section>
    </main>
  </div>
  
  <style>
    .settings-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      color: white;
      z-index: 1000;
    }
  
    header {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      border-bottom: 1px solid #2f3336;
    }
  
    .back-button {
      background: none;
      border: none;
      color: #1d9bf0;
      font-size: 20px;
      cursor: pointer;
      padding: 5px 10px;
      margin-right: 20px;
    }
  
    h1 {
      font-size: 20px;
      font-weight: bold;
    }
  
    main {
      padding: 20px;
    }
  
    section {
      margin-bottom: 30px;
    }
  
    h2 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    li {
      padding: 10px 0;
      border-bottom: 1px solid #2f3336;
    }
  
    li:last-child {
      border-bottom: none;
    }
  </style>