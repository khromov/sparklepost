export function generateRandomComments(minCount = 10, maxCount = 20) {
    const commenters = ['Alex', 'Sam', 'Taylor', 'Jordan', 'Casey'];
    const contents = [
        'Interesting point!',
        'I disagree, actually.',
        'Can you elaborate on that?',
        'This thread is getting deep!',
        'I love this discussion!'
    ];

    return Array.from({ length: Math.floor(Math.random() * (maxCount - minCount)) + minCount }, (_, index) => ({
        name: commenters[Math.floor(Math.random() * commenters.length)],
        handle: `@user${Math.floor(Math.random() * 1000)}`,
        time: `${Math.floor(Math.random() * 59) + 1}m`,
        content: contents[Math.floor(Math.random() * contents.length)],
        avatarSeed: `comment-${index}-${Date.now()}`
    }));
};