<script lang="ts">
	import { onMount } from 'svelte';
	import type { ShowcaseObj } from '$lib/types';
	import { X } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';

	export let JsonURL: string;
	export let Title: string;

	let isShowDetail = false;
	let currShowcase: ShowcaseObj;
	let ShowcaseList: ShowcaseObj[] = [];

	function showDetail(cond: boolean, selectedShowcase: ShowcaseObj) {
		if (!selectedShowcase.details) {
			return;
		}
		isShowDetail = cond;
		currShowcase = selectedShowcase;
	}

	onMount(async () => {
		try {
			const response = await fetch(JsonURL);
			let resultJson = await response.json();
			let result: ShowcaseObj[] = resultJson['data'];
			ShowcaseList = [...ShowcaseList, ...result];
		} catch (e) {
			console.log(e);
		}

	});
</script>
<style lang="scss">
  @media screen and (min-width: 780px) {
    .ShowcaseModalDesc {
      display: grid;
    }
  }

  @media screen and (max-width: 779px) {
    .ShowcaseModalDesc {
      display: flex;
      flex-direction: column;
    }
  }


  .BGImg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }

  .dark-BG:hover {
    background-color: rgba(black, 0.5);

    * {
      @apply visible translate-y-0
    }
  }

  .modalCont {
    background-color: rgba(black, 0.7);
  }
</style>

<div class="mt-10">
	<h1 class="font-bold text-2xl">{Title} </h1>
	<div class="my-4 grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))">
		{#each ShowcaseList as showcase}
			<div class="relative overflow-hidden h-64 rounded drop-shadow-lg">
				<div>
					<div class="absolute BGImg"
							 style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+showcase.image+');'}"></div>
					<div class="absolute h-full w-full grid pb-16">
						<h1
							class="place-self-center text-3xl font-bold w-full text-center align-middle text-white">{showcase.title}</h1>
					</div>
					<div class="absolute dark:bg-gray-900 bg-gray-200 bottom-0 w-full h-2/5 p-3">
						<p class="dark:text-white text-black">{showcase.desc}</p>
					</div>
				</div>
				{#if (showcase.details)}
					<div class="absolute w-full h-full dark-BG grid transition"
							 on:click={()=>{showDetail(true, showcase)}}>
						<div class="place-self-center overflow-hidden p-1">
							<button
								class="invisible rounded-lg py-2 px-4 hover:bg-slate-600 active:bg-gray-100 text-gray-100 active:text-slate-600 outline outline-2 outline-gray-100 active:outline-slate-600 translate-y-10 transition-all">
								More Details
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	{#if (isShowDetail)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="fixed top-0 left-0 h-screen w-screen z-50 modalCont grid backdrop-blur p-4"
				 on:click={(e)=>{if(e.target===e.currentTarget)showDetail(false, currShowcase)}}>
			<div class="relative place-self-center bg-gray-50 rounded shadow z-50 m-5"
					 style="width: min(50.375rem, 100%); height: min(100%, 84rem); overflow: auto">
				<div class="absolute dark:bg-gray-900 bg-gray-200 w-full h-full -z-50">
				</div>
				<div class="grid grid-rows-5 h-full">
					<div class="row-span-2 w-full flex items-center relative justify-between">
						<div class="absolute top-4 right-4">
							<Button variant="ghost" size="icon" class="text-white" on:click={(e)=>{showDetail(false, currShowcase)}}>
								<X />
							</Button>
						</div>
						<div class="absolute BGImg"
								 style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+currShowcase.details.images[0]+');'}"></div>
					</div>
					<div class="bg-transparent h-fit w-full p-3 grid-cols-4 gap-4 ShowcaseModalDesc">
						<div class="col-span-3 dark:text-white text-black z-10">
							<h1 class="font-bold text-2xl py-3">{currShowcase.title}</h1>
							<br>
							<p class="text-md">{currShowcase.details.desc}</p>
						</div>
						<div class="col-span-1 dark:text-white text-black">
							{#if currShowcase.details.client}
								<h2 class="font-bold text-xl pt-3">Client</h2>
								<p class="">{currShowcase.details.client.name}</p>
								<br>
							{/if}

							<h2 class="font-bold dark:text-white text-black">Frameworks</h2>
							{#each currShowcase.details.frameworks as framework}
								<p class="mt-2">{framework}</p>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>