<script>
	import { createAvatar } from '@dicebear/core';
	import { bottts } from '@dicebear/collection';

	export let name = 'Stanislav';
	export let handle = '@khromov';
	export let time = '8h';
	export let content =
		"This is an example tweet! It's very long: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel felis et nunc lacinia.";
	export let tab = 0;
	export let number = 0;

	// Generate a unique avatar based on tab and number
	const avatar = createAvatar(bottts, {
		seed: `${tab}-${number}`,
		size: 48
	});

  const avatarUri = avatar.toDataUri();
</script>

<div class="tweet">
	<img class="avatar" src={avatarUri} alt="Avatar" />
	<div class="tweet-content">
		<div class="tweet-header">
			<span class="name">{name}</span>
			<span class="handle">{handle}</span>
			<span class="time">· {time}</span>
		</div>
		<p>{content}</p>
	</div>
</div>

<style>
	.tweet {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #2f3336;
	}

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 10px;
  }

	.tweet-content {
		flex: 1;
	}

	.tweet-header {
		margin-bottom: 5px;
	}

	.name {
		font-weight: bold;
		margin-right: 5px;
	}

	.handle,
	.time {
		color: #71767b;
	}

	p {
		margin: 0;
		line-height: 1.3;
	}
</style>
