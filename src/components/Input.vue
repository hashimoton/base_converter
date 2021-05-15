<template>
  <div id="cauldronInput">
    <p class="inputTitle">Input Data</p>
    <textarea v-model="inputData" placeholder="Please, input data"></textarea>
    <div class="selectBtn">
      <span>
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>copy</option>
          <option>quote</option>
          <option>line_count</option>
          <option>encode_utf8</option>
          <option>shorttrace</option>
        </select>
      </span>
      <button v-on:click="clickConvert">CONVERT</button>
      <Modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">
          Warning!
          <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
        </h3>
        <h5 slot="body">Please Select a Converter!</h5>
      </Modal>
    </div>
    <p class="inputTitle">Output Result</p>
    <textarea v-model="outputResult"></textarea>
  </div>
</template>

<script>
import Modal from "./common/Modal";
import { Converter } from './../../docs/js/converter.js';

const converter = new Converter();

export default {
  data() {
    return {
      inputData: "",
      selected: "",
      outputResult: "",
      showModal: false,
    };
  },
  methods: {
    clickConvert() {
      if (this.selected === "") {
        // Alert wnen the converter is not specified
        this.showModal = !this.showModal;
      } else {
        this.outputResult = converter.convert(this.selected, "" + this.inputData);
      }
    },
  },
  components: {
    Modal,
  },
};
</script>

<style scoped>
textarea {
  height: 300px;
  width: 80%;
  font-family: Consolas, "Courier New", monospace;
}
#cauldronInput {
  color: rgb(49, 49, 153);
}
.inputTitle {
  font-size: 2rem;
  margin-bottom: 10px;
}
.selectBtn > button {
  margin-left: 5px;
}
.closeModalBtn {
  color: #42b983;
}
</style>
