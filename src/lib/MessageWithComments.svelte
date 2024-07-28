<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { generateRandomComments } from './random';

	interface Tweet {
		name: string;
		handle: string;
		time: string;
		content: string;
		avatarSeed: string;
	}

	interface Comment extends Tweet {}

	let {
		tweet = {
			name: 'Placeholder',
			handle: '',
			time: '',
			content: '',
			avatarSeed: 'main-tweet'
		},
		comments = []
	} = $props<{ tweet?: Tweet }>();

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

	function handleCommentClick(comment: Comment) {
		const currentComponents = $page.state.stackedComponents || [];
		const currentScrollPositions = $page.state.scrollPositions || [];

		const newComponents = [
			...currentComponents,
			{
				componentName: 'MessageWithComments',
				props: {
					tweet: {
						name: comment.name,
						handle: comment.handle,
						time: comment.time,
						content: comment.content,
						avatarSeed: comment.avatarSeed
					},
					comments: generateRandomComments()
				}
			}
		];
		pushState('', {
			 stackedComponents: newComponents,
			 scrollPositions: [...currentScrollPositions, 0]
		});
	}
</script>

<div class="tweet-container">
	<div class="tweet main-tweet">
		<img class="avatar" src={getAvatarUrl(tweet.avatarSeed)} alt="Avatar" />
		<div class="tweet-content">
			<div class="tweet-header">
				<span class="name">{tweet.name}</span>
				<span class="handle">{tweet.handle}</span>
				<span class="time">· {tweet.time}</span>
			</div>
			<p>{tweet.content}</p>
		</div>
	</div>

	<div class="comments">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#each comments as comment}
			<div class="tweet comment" onclick={() => handleCommentClick(comment)}>
				<img class="avatar" src={getAvatarUrl(comment.avatarSeed)} alt="Avatar" />
				<div class="tweet-content">
					<div class="tweet-header">
						<span class="name">{comment.name}</span>
						<span class="handle">{comment.handle}</span>
						<span class="time">· {comment.time}</span>
					</div>
					<p>{comment.content}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.tweet-container {
		border: 1px solid #2f3336;
		overflow: hidden;
	}

	.tweet {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #2f3336;
	}

	.main-tweet {
		background-color: #15202b;
	}

	.comment {
		background-color: #1c2732;
		padding-left: 30px;
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
