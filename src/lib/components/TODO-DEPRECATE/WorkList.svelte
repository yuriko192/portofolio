<script lang="ts">
    import {onMount} from "svelte";
    import type {ShowcaseObj} from "$lib/types";

    let projectList: ShowcaseObj[] = [];


    onMount(async () => {
        const response = await fetch('/data/works.json');
        let resultJson = await response.json();
        let result:ShowcaseObj[] = resultJson["jobs"]
        projectList = [...projectList, ...result];

        // console.log(projectList)
    });
</script>
<style lang="scss">
  @media screen and (min-width: 780px) {
    .ProjectModalDesc{
      display: grid;
    }
  }
  @media screen and (max-width: 779px) {
    .ProjectModalDesc{
      display: flex;
      flex-direction: column;
    }
  }


  .BGImg {
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
    <h1 class="font-bold text-2xl">Work Experiences </h1>
    <div class="my-4 grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))">
        {#each projectList as project}
            <div class="relative overflow-hidden h-64 rounded drop-shadow-lg">
                <div>
                    <div class="absolute BGImg"
                         style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+project.image+');'}"></div>
                    <div class="absolute h-full w-full grid pb-16">
                        <h1 class="place-self-center text-3xl font-bold w-full text-center align-middle text-white">{project.title}</h1>
                    </div>
                    <div class="absolute bg-gray-900 bottom-0 w-full h-2/5 p-3">
                        <p class="text-white">{project.desc}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>