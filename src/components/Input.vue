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
        <h5 slot="body">Please Input Data!</h5>
      </Modal>
    </div>
    <p class="inputTitle">Output Result</p>
    <textarea v-model="outputResult"></textarea>
  </div>
</template>

<script>
import Modal from "./common/Modal";

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
      if (this.inputData !== "") {
        if (this.selected === "copy") {
          this.outputResult = this.inputData;
        } else if (this.selected === "quote") {
          this.outputResult = '"' + this.inputData + '"';
        } else if (this.selected === "line_count") {
          this.outputResult = this.inputData.split("\n").length;
        } else if (this.selected === "encode_utf8") {
          const encoder = new TextEncoder();
          const codes = encoder.encode(this.inputData);
          this.outputResult = codes;
        } else if (this.selected === "shorttrace") {
          const is_skippable = (line) => {
            if (
              line.match(/org\.apache\.felix\.http\.base\.internal\./) ||
              line.match(/\.doFilter\(/)
            ) {
              return true;
            } else {
              return false;
            }
          };
          const input_lines = this.inputData.split("\n");
          let output_lines = [];
          let packages = ["", "", ""];

          const line_count = input_lines.length;
          for (let i = 0; i < line_count; i++) {
            const line = input_lines[i];

            if (!is_skippable(line)) {
              output_lines.push(line);
            }

            const stack_regex = /\s+at ([\w.$<>]+)\(([^)]+)\)/;
            const matches = stack_regex.exec(line) || [];
            console.log({ matches });

            if (matches.length == 3) {
              const modules = matches[1].split(".");
              const j_method = modules.pop();
              const j_class = modules.pop();
              const j_package = modules.join(".");
              packages.push(j_package);
              packages.shift();
              const j_source = matches[2];
              console.log([
                { j_class },
                { j_method },
                { j_source },
                { packages },
              ]);

              if (packages[0] === j_package && packages[1] === j_package) {
                if (
                  !/\s- \w/.exec(input_lines[i + 1]) &&
                  output_lines.slice(-1)[0] !== "..."
                ) {
                  output_lines.pop();
                  output_lines.pop();
                  output_lines.push("...");
                }
              }
            } else {
              packages = ["", "", ""];
            }
          }

          this.outputResult = output_lines.join("\n");
        }
      } else {
        // input text areaに何も入力されない状態でボタンをクリックするとアラートを出す
        this.showModal = !this.showModal;
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
