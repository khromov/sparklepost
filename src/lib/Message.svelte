<script lang="ts">
	let {
		name = 'Stanislav',
		handle = '@khromov',
		time = '8h',
		content = "This is an example tweet! It's very long: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel felis et nunc lacinia.",
		tab = 0,
		number = 0
	} = $props();

	function getAvatarUrl(id: string) {
		// Simple hash function to convert string to number
		const hash = id.split('').reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0);

		// Use the hash to select an avatar (1-20)
		const avatarNumber = (Math.abs(hash) % 20) + 1;
		return `/avatars/${avatarNumber}.svg`;
	}
</script>

<div class="tweet">
	<img class="avatar" src={getAvatarUrl(`${tab}-${number}`)} alt="Avatar" />
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
