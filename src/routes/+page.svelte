<script lang="ts">
	import Message from '$lib/Message.svelte';
	import ScrollableView from '$lib/ScrollableView.svelte';
	import { activeTabIndex } from '$lib/stores/tab';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';

	let swiper: Swiper | null;
	let swiperEl: HTMLElement;

	let mounted = false;

	onMount(() => {
		swiper = new Swiper(swiperEl, {
			direction: 'horizontal',
			slidesPerView: 1,
			speed: 400,
			grabCursor: true,
			shortSwipes: true,
			longSwipesRatio: 0.1,
			on: {
				slideChange: function (e) {
					$activeTabIndex = e.activeIndex;
				}
			}
		});

        // To avoid rerenders
		mounted = true;
	});

	$: swiper && mounted && swiper?.slideTo($activeTabIndex);
</script>

<div class="page-wrapper">
    <div class="swiper" bind:this={swiperEl}>
        <div class="swiper-wrapper">
            {#each Array(3) as _, i}
                <div class="swiper-slide">
                    <ScrollableView>
                        {#each Array(10) as _, i}
                            <Message />
                        {/each}
                    </ScrollableView>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .page-wrapper {
        overflow-y: hidden;
    }
</style>
