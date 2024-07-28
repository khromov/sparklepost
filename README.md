# SparklePost

SparklePost is a demo application used to show of interface patterns that are commonly found in native iOS and Android apps using modern web development techniques. 

Try the demo yourself at: https://sparklepost.vercel.app/ (works best on mobile)

![Screen Recording 2024-07-28 at 04 18 14](https://github.com/user-attachments/assets/0054ed3d-c744-4d5d-bdf2-284c6bf8c5a8)


## Features

* Swipeable tabs navigation with maintained scroll position in each tab (SwiperJS)
* Stacked message threads with back support - click on a single tweet to initiate stack (SvetleKit Shallow Routing and partial DOM rendering)
* State restoration when using back navigation (SvelteKit Snapshots)
* Installation & Offline support (PWA, Service Worker & online/offline event)
* Native-like navigation transitions (View Transitions API)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
nvm use
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
