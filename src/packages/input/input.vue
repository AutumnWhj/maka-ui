<template>
  <div class="mk-input-container">
    <input
      type="text"
      class="mk-input"
      :value="currentValue"
      :class="inputClass"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>
<script>
import { oneOf } from "../../utils/assist";
import Emitter from "../../mixins/emitter";

export default {
  name: "Input",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: "",
    },
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      },
      default: "default",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(v) {
      this.currentValue = v;
    },
  },
  computed: {
    inputClass() {
      const prefix = "mk-input";
      return {
        [`${prefix}__size-${this.size}`]: true,
      };
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit("input", value);
      this.dispatch("FormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("FormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>
