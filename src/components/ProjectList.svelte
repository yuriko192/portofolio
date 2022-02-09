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
<div class="my-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each ProjectJson['projects'] as project}
        <div class="relative h-[25vh] pt-[20%]">
            <div class="absolute BGImg"
                 style="{'background-image: linear-gradient(rgba(MidnightBlue, 0.2), rgba(MidnightBlue, 0.2) 100%), url('+project.image+');'}"></div>
            <h1 class="absolute text-3xl font-bold w-full text-center align-middle text-white">{project.title}</h1>
            <div class="absolute bg-gray-900 bottom-0 w-full h-1/3 p-3">
                <p class="text-white">{project.desc}</p>
            </div>
        </div>
    {/each}

    <div class="">Confins Core Banking System</div>
    <div class="">DeText OCR</div>
    <div class="">Hotel Reservation System</div>
    <div class="">Speedwagon Email Client</div>
    <div class="">Redesign M Banking BCA</div>
</div>