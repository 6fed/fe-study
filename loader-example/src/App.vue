<template>
  <div>
    <p v-html="readme">vue demo</p>
    <img src="./test.png" />
  </div>
</template>

<script>
import readme from "../readme.md";
// import img from "./test.png";
// console.log(readme);
export default {
  data() {
    return {
      readme
    };
  }
};
</script>

  