<script lang="ts">
    import "./app.scss"
    import type {scrambledTextAnimationObj, subJobType} from "../types.js";
    import {onMount} from "svelte";
    import ProjectList from "$lib/components/ProjectList.svelte";
    import WorkList from "$lib/components/WorkList.svelte";
    import {LocalstorageSet} from "../utils";
    import selfImg from '$lib/assets/self.png';

    const DARK = 'dark'
    const LIGHT = 'light'
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let isDarkMode = true

    let subJobs: subJobType[] = [];

    let currScrText: scrambledTextAnimationObj;

    onMount(async () => {
        const response = await fetch('/data/subjobs.json');
        let resultJson = await response.json();
        let result: subJobType[] = resultJson["subjobs"].map(
            (item: any) => (
                {
                    ...item,
                    originalDesc: item.desc.toUpperCase(),
                    desc: item.desc.toUpperCase()
                }
            )
        );

        subJobs = [...subJobs, ...result];

        typeof localStorage === 'undefined'
            ? (() => {})()
            : (() => {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    isDarkMode = true
                    document.documentElement.classList.add('dark')
                } else {
                    isDarkMode = false
                    document.documentElement.classList.remove('dark')
                }
            })();
    });

    function toggleDark() {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            LocalstorageSet("theme", DARK)
            document.documentElement.classList.add('dark')
        } else {
            LocalstorageSet("theme", LIGHT)
            document.documentElement.classList.remove('dark')
        }
    }

    function onSubJobsHover(idx: number) {
        let iteration = 0;

        if (currScrText) {
            clearInterval(currScrText.interval);
            subJobs[currScrText.idx].desc = subJobs[currScrText.idx].originalDesc
        }

        let interval = setInterval(() => {
            subJobs[idx].desc = subJobs[idx].originalDesc
                .split("")
                .map((letter: string, index: number) => {
                    if (index < iteration) {
                        return subJobs[idx].originalDesc[index];
                    }

                    if (index < iteration + 5) {
                        return letters[Math.floor(Math.random() * 26)]
                    }

                    return ""
                })
                .join("");

            if (iteration >= subJobs[idx].originalDesc.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 20);

        currScrText = {
            idx: idx,
            interval: interval
        }
    }

    let blob: any;
    let prevCapture: number;

    function handleBlobMove(event: any) {
        const currTime = (new Date()).getTime();

        //in ms
        if (currTime - prevCapture < 20) {
            return
        }


        prevCapture = currTime;
        const {clientX, clientY} = event;

        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, {duration: 3000, fill: "forwards"})

    }
</script>

<svelte:head>
    <title>Ivan Wijaya - Software Engineer</title>
</svelte:head>
<style lang="scss">

  @keyframes rotate {
    from {
      rotate: 0deg;
    }

    50% {
      scale: 1 1.5;
    }

    to {
      rotate: 360deg;
    }
  }

  //TODO
  //ADD DARK & LIGHT MODE
  #blob {
    background-color: white;
    height: 34vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, aquamarine, mediumpurple);
    animation: rotate 20s infinite;
    opacity: 0.8;
  }


  #blur {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    backdrop-filter: blur(12vmax);
  }
</style>

<!--BACKGROUND ANIMATIONS-->
<div class="fixed dark:bg-slate-800 bg-white w-screen h-screen z-[-99]">
    <!--    MOVING RAINBOW BLOB-->
    {#if isDarkMode}
        <div id="blob" bind:this={blob}></div>
        <div id="blur"></div>
    {/if}
</div>

<div class="dark:text-slate-100 px-8 py-2 min-h-screen overflow-hidden" on:pointermove={handleBlobMove}>

    <!--    NAVBAR-->
    <div class="flex mb-4 mt-4 gap-4s">
        <div class="flex flex-grow justify-items-center items-center font-bold">
            <span>IVAN.W</span>
        </div>
        <div class="flex justify-items-center items-center mx-4">
            <a href="https://drive.google.com/file/d/1uVZdRZIvT5WF19So0d63yTEizPci3YvQ/view?usp=sharing"
               class="
               rounded-lg py-1 px-3 shadow-lg hover:shadow
               dark:hover:bg-slate-400 dark:bg-slate-300 dark:text-black dark:font-semibold dark:shadow-slate-500
               hover:bg-slate-600 bg-slate-800 text-white
               transition">
                Get CV
            </a>
        </div>
        <div class="flex flex-row-reverse">
            <div class="relative rounded-full border border-black dark:border-slate-100 py-1 w-14 h-8 transition-transform duration-300"
                 on:click={toggleDark}>
                <div class={`absolute transition-transform ${isDarkMode ? 'translate-x-2' : 'translate-x-8'}`}>
                    {#if isDarkMode}
                        <i class="fa-regular fa-sun"></i>
                    {:else}
                        <i class="fa-regular fa-moon"></i>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <!--    HERO TITLE-->
    <div class="flex py-5 align-middle flex flex-col sm:flex-row">
        <div class="shrink-0 m-auto mb-8 px-8">
            <img class="rounded-full w-full max-w-[16rem] aspect-square" src={selfImg}>
        </div>
        <div class="my-auto">
            <h1 class="text-xl font-bold mb-4 text-justify">Hello There, My name is Ivan Wijaya</h1>
            <p class="text-lg mb-4">💻 A passionate software engineer focused on web technologies</p>
            <p class="text-base text-justify">
                With a strong foundation in backend technologies, I specialize in creating robust and efficient solution
                that's able to solve problems at any scale.
                I occasionally also dive into the frontend development and craft interfaces that's intuitive and user
                friendly.
                This dual expertise enables me to bridge the gap between the server and the user's browser, delivering
                end-to-end solutions that stands out.
            </p>
            <p class="text-base"></p>
            <p class="text-base"></p>
        </div>
    </div>
    <!--    SUBJOBS-->
    <div class="my-4 grid gap-4 grid-flow-col grid-flow-row-dense sm:grid-flow-col-dense grid-cols-4 grid-rows-2 lg:grid-rows-1">
        {#each subJobs as subJob, idx}
            <div class={`rounded py-1 px-1 bg-gray-200 dark:bg-gray-700 ${subJob.spans}`}
                 on:mouseover={()=>{onSubJobsHover(idx)}}
                 on:mouseleave={()=>{subJobs[idx].desc = subJobs[idx].originalDesc}}
            >{subJob.icon} {subJob.desc}
            </div>
        {/each}
        <div class="hidden col-span-4 sm:col-span-2 lg:col-span-1 col-span-4 sm:col-span-2 lg:col-span-1 col-span-2 sm:col-span-2 lg:col-span-1 col-span-2 sm:col-span-2 lg:col-span-1"></div>
    </div>

    <ProjectList/>
    <WorkList/>


</div>
