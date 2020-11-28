<template>
  <div class="home">
    <ProjectView></ProjectView>
    <Hero></Hero>
    <contact-methods></contact-methods>
    <AreaOfInterest></AreaOfInterest>
    <project-list></project-list>
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import AreaOfInterest from "@/components/AreaOfInterest";
import ContactMethods from "@/components/ContactMethods";
import ProjectList from "@/components/ProjectList";
import ProjectView from "@/components/ProjectView";

export default {
  name: 'Home',
  components: {
    ProjectView,
    Hero,
    AreaOfInterest,
    ContactMethods,
    ProjectList
  }
}
</script>

<style lang="scss" scoped>
.home {
  @extend .flex-col;
  align-items: center;
  margin: 0;
  position: relative;
  background-color: $bg-col;

  &:before {
    content: '';
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0), $bg-col 60%), url("../assets/BG.jpg");
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }


  * {
    z-index: 2;
  }
}

@media screen and (min-width: 900px) {
  .home {
    display: grid;
    grid-template-areas:
        "Hero contact"
        "Hero AOI"
        "projects projects";
    grid-template-rows: 3rem auto auto;
    grid-template-columns: 50% 50%;
    .Hero {
      margin: 10vh 0 0 0;
      grid-area: Hero;
    }

    .contactmethod {
      align-self: start;
      margin-top: 0;
      margin-right: 0;
      border-radius: 0 0 0 15px;
      grid-area: contact;
    }

    .areaofinterest {
      grid-area: AOI;
    }

    .ProjectList {
      grid-area: projects;
    }
  }
}
</style>