<script lang="ts">
    import "./app.scss"
    import type {subJobType} from "../types.js";
    import {onMount} from "svelte";
    import {SaveLocalstorageSet} from "../utils";

    const DARK = 'dark'
    const LIGHT = 'light'
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let isDarkMode = true

    let subJobs: subJobType[] = [];
    let loading = true;

    let interval = null;

    onMount(async () => {
        const response = await fetch('/data/subjobs.json');
        let resultJson = await response.json();
        let result:subJobType[] = resultJson["subjobs"].map(
            item=>(
                {
                    ...item,
                    originalDesc : item.desc.toUpperCase(),
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

        loading = false
    });

    function toggleDark() {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            SaveLocalstorageSet("theme", DARK)
            document.documentElement.classList.add('dark')
        } else {
            SaveLocalstorageSet("theme", LIGHT)
            document.documentElement.classList.remove('dark')
        }
    }

    function onSubJobsHover(idx){
        let iteration = 0;

        clearInterval(interval);
        interval = setInterval(() => {
            subJobs[idx].desc  = subJobs[idx].originalDesc
                    .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return subJobs[idx].originalDesc[index];
                    }

                    return letters[Math.floor(Math.random() * 26)]
                })
                .join("");

            if(iteration >= subJobs[idx].originalDesc.length){
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 20);
    }
</script>

<svelte:head>
    <title>Ivan Wijaya - Software Engineer</title>
</svelte:head>

<div class="dark:bg-slate-800 bg-white dark:text-slate-100 px-8 py-2 min-h-screen overflow-hidden z-[-99]">

    <div class="flex mb-4 mt-4">
        <div class="flex-auto flex justify-items-center items-center">
            <a href="https://drive.google.com/file/d/1lThHt7vgwAQk5AIwHCbaQ-hasYgcTm_s/view?usp=sharing"
               class="
               rounded-lg py-1 px-3 shadow-lg hover:shadow
               dark:hover:bg-slate-400 dark:bg-slate-300 dark:text-black dark:font-semibold dark:shadow-slate-500
               hover:bg-slate-600 bg-slate-800 text-white
               transition">
                Get CV
            </a>
        </div>
        <div>
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


    <div class="mt-8">
        <h2 class="text-xl">Hello There, The name is</h2>
        <h1 class="font-bold text-4xl my-2">Ivan Wijaya</h1>
        <span class="text-xl">💻 Software Engineer</span>
    </div>
    <div class="my-4 grid gap-4 grid-flow-col grid-flow-row-dense sm:grid-flow-col-dense grid-cols-4 grid-rows-2 lg:grid-rows-1">
        {#each subJobs as subJob, idx}
            <div class={`rounded py-1 px-1 bg-gray-200 dark:bg-gray-700 ${subJob.spans}`}
                 on:mouseover={()=>{onSubJobsHover(idx)}}
                 on:mouseleave={()=>{subJobs[idx].desc = subJobs[idx].originalDesc}}
            >{subJob.icon} {subJob.desc}
            </div>
        {/each}
    </div>
</div>
