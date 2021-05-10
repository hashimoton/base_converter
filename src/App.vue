<template>
  <div id="app">
    <Header></Header>
    <Input></Input>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Input from "./components/Input";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Input,
    Footer,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: Consolas, "Courier New", monospace;
}
</style>
