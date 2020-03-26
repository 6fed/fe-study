<template>
  <div>
    <p v-html="readme">vue demo</p>
  </div>
</template>

<script>
import readme from "../readme.md";
console.log(readme);
export default {
  data() {
    return {
      readme
    };
  }
};
</script>

  