<script>
    import * as WorkJson from '../Data/Works.json'
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

<h1 class="font-bold text-2xl">Past Work Experience </h1>
<div class="my-4 grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))">
    {#each WorkJson['jobs'] as job}
        <div class="relative h-64 pt-[10%]">
            <div class="absolute BGImg"
                 style="{'background-image: linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5) 100%), url('+job.image+');'}"></div>
            <div class="absolute h-full w-full grid pb-16">
                <h1 class="place-self-center text-3xl font-bold w-full text-center align-middle text-white">{job.title}</h1>
            </div>
            <div class="absolute bg-gray-900 bottom-0 w-full h-2/5 p-3">
                <p class="text-white">{job.desc}</p>
            </div>
        </div>
    {/each}
</div>