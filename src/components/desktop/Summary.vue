<template>
  <div class="summary">
    <!-- <img :src="this.categories[this.categoryIndex].items[0].srcSummary" alt=""> -->
  </div>
</template>

<script>
// import axios from "axios"

export default {
  name: 'Summary',
  props: ["summary", "categoryIndex", "categories"],
  mounted() {
    document.body.classList.remove('bg-blur');
    console.log(this.categories[this.categoryIndex]);
    console.log(this.summary);
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
