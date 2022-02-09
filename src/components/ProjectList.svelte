<script>
    import * as ProjectJson from '../Data/Projects.json'
</script>
<style lang="scss">
  .BGImg {
    z-index: -2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }
</style>

<h1 class="font-bold text-2xl">Featured Projects </h1>
<div class="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each ProjectJson['projects'] as project}
        <div class="relative h-[25vh] pt-[10%]">
            <div class="absolute BGImg"
                 style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+project.image+');'}"></div>
            <h1 class="absolute text-3xl font-bold w-full text-center align-middle text-white">{project.title}</h1>
            <div class="absolute bg-gray-900 bottom-0 w-full h-1/3 p-3">
                <p class="text-white">{project.desc}</p>
            </div>
        </div>
    {/each}
</div>