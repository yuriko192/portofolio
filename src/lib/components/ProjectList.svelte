<script lang="ts">
    import {onMount} from "svelte";
    import type {ProjectObj} from "../../types";

    let isShowDetail = false;
    let currProject: ProjectObj;
    let projectList: ProjectObj[] = [];

    function showDetail(Cond, Project) {
        isShowDetail = Cond;
        currProject = Project;
    }

    onMount(async () => {
        const response = await fetch('/data/projects.json');
        let resultJson = await response.json();
        let result:ProjectObj[] = resultJson["projects"]
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
    <h1 class="font-bold text-2xl">Featured Projects </h1>
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
                <div class="absolute w-full h-full dark-BG grid transition" on:click={()=>{showDetail(true, project)}}>
                    <div class="place-self-center overflow-hidden p-1">
                        <button class="invisible rounded-lg py-2 px-4 hover:bg-slate-600 active:bg-gray-100 text-gray-100 active:text-slate-600 outline outline-2 outline-gray-100 active:outline-slate-600 translate-y-10 transition-all">
                            More Details
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {#if (isShowDetail)}
        <div class="fixed top-0 left-0 h-screen w-screen z-50 modalCont grid backdrop-blur p-4"
             on:click={(e)=>{if(e.target===e.currentTarget)showDetail(false, currProject)}}>
            <div class="relative place-self-center bg-gray-50 rounded shadow z-50 m-5" style="width: min(50.375rem, 100%); height: min(100%, 84rem); overflow: auto">
                <div class="absolute bg-gray-900 w-full h-full -z-50">
                </div>
                <div class="grid grid-rows-5 h-full">
                    <div class="row-span-2 w-full flex items-center relative justify-between">
                        <div class="absolute top-0 right-0">
                            <i class="fa-solid fa-xmark p-5" on:click={(e)=>{if(e.target===e.currentTarget)showDetail(false, currProject)}}></i>
                        </div>
                        <div class="absolute BGImg"
                             style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+currProject.image+');'}"></div>
                        <h1 class="font-bold text-white text-5xl px-10 py-3">{currProject.title}</h1>
                    </div>
                    <div class="bg-gray-900 row-span-3 h-fit w-full p-3 grid-cols-4 gap-4 ProjectModalDesc">
                        <div class="col-span-3 text-white z-10">
                            <h2 class="font-bold text-xl pt-3">Description:</h2>
                            <br>
                            <p class="">{currProject.details.desc}</p>
                        </div>
                        <div class="col-span-1 text-white">
                            <h2 class="font-bold text-xl pt-3">Frameworks:</h2>
                            {#each currProject.details.frameworks as framework}
                                <br>
                                <p class="">{framework}</p>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/if}
</div>