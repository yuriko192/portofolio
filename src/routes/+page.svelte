<script lang="ts">
    import type {scrambledTextAnimationObj, subJobType} from "$lib/types";
    import {onMount} from "svelte";
    import Showcases from "$lib/components/Showcases.svelte";
    import {LocalstorageSet} from "$lib/utils";
    import selfImg from '$lib/assets/self.png';
    import { Button } from '@/components/ui/button';
    import { toggleMode, setMode} from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import { Github } from 'lucide-svelte';

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
            setMode(DARK)
            LocalstorageSet("theme", DARK)
            document.documentElement.classList.add(DARK)
        } else {
            setMode(LIGHT)
            LocalstorageSet("theme", LIGHT)
            document.documentElement.classList.remove(DARK)
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
        if (!blob){return;}
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

  #blob {
    height: 34vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: white linear-gradient(to right, aquamarine, mediumpurple);
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



  @keyframes animate {

      0%{
          transform: translateY(-130vh) rotate(0deg);
          opacity: 1;
          border-radius: 0;
      }

      100%{
          transform: translateY(0) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
      }

  }

  .circles{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
  }

  .circles li{
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgba(252, 233, 169, 0.5);
      animation: animate 25s linear infinite;
      bottom: -150px;

  }


  .circles li:nth-child(1){
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
  }


  .circles li:nth-child(2){
      left: 10%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
  }

  .circles li:nth-child(3){
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
  }

  .circles li:nth-child(4){
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
  }

  .circles li:nth-child(5){
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
  }

  .circles li:nth-child(6){
      left: 75%;
      width: 110px;
      height: 110px;
      animation-delay: 3s;
  }

  .circles li:nth-child(7){
      left: 35%;
      width: 150px;
      height: 150px;
      animation-delay: 7s;
  }

  .circles li:nth-child(8){
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
  }

  .circles li:nth-child(9){
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
  }

  .circles li:nth-child(10){
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
  }

</style>

<!--BACKGROUND ANIMATIONS-->
<div class="fixed dark:bg-slate-800 bg-white w-screen h-screen z-[-99]">
    <!--    MOVING RAINBOW BLOB-->
    {#if isDarkMode}
        <div id="blob" bind:this={blob}></div>
        <div id="blur"></div>
        {:else }
        <div class="relative w-full h-full">
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >
    {/if}
</div>

<div class="dark:text-slate-100 px-8 py-2 min-h-screen overflow-hidden" on:pointermove={handleBlobMove}>

    <!--    NAVBAR-->
    <div class="flex mb-4 mt-4 gap-4s">
        <div class="flex flex-grow justify-items-center items-center font-bold">
            <span>IVAN.W</span>
        </div>
        <div class="flex justify-items-center items-center mx-4">
            <a href="https://github.com/Ivan-Wij"
               class="
               flex gap-2
               rounded-lg py-1 px-3 hover:shadow
               bg-transparent
               dark:hover:text-slate-700 dark:hover:bg-slate-300 dark:text-white dark:border-white
               hover:bg-slate-800 hover:text-slate-300 text-black border border-black
               transition">
                <Github />
                Github
            </a>
        </div>
        <div class="flex justify-items-center items-center mr-4">
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
            <Button variant="outline"
              class="rounded-full w-14 h-8 transition-transform duration-300 p-0 bg-transparent"
              on:click={toggleDark}>
                <div class={`flex relative transition-all ${isDarkMode ? 'translate-x-0' : 'translate-x-1'}`}>
                    <Moon
                      class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all  dark:rotate-0 dark:scale-100"
                    />
                    <Sun
                      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                </div>
            </Button>
        </div>
    </div>
    <!--    HERO TITLE-->
    <div class="flex py-5 align-middle flex-col sm:flex-row">
        <div class="shrink-0 m-auto mb-8 px-8">
            <img class="rounded-full w-full max-w-[32rem] aspect-square" src={selfImg} alt="ivan wijaya">
        </div>
        <div class="my-auto pr-32">
            <h1 class="text-6xl font-bold mb-4 text-justify">Ivan Wijaya</h1>
            <p class="text-2xl mb-4">💻 A passionate software engineer focused on web technologies</p>
            <p class="text-lg text-base text-justify">
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
    <div class="my-4 grid gap-4 grid-flow-row-dense sm:grid-flow-col-dense grid-cols-4 grid-rows-2 lg:grid-rows-1">
        {#each subJobs as subJob, idx}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div class={`rounded py-1 px-1 bg-gray-200 dark:bg-gray-700 text-xl ${subJob.spans}`}
                 on:mouseover={()=>{onSubJobsHover(idx)}}
                 on:mouseleave={()=>{subJobs[idx].desc = subJobs[idx].originalDesc}}
            >{subJob.icon} {subJob.desc}
            </div>
        {/each}
    </div>

    <Showcases Title="Featured Projects" JsonURL="/data/projects.json"/>
    <Showcases Title="Work Experiences" JsonURL="/data/works.json"/>

</div>
