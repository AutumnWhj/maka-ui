<template>
  <div>
    <div v-if="label" :class="{ 'mk-form-item__label-required': isRequired }">
      {{ label }}
    </div>
    <slot></slot>
    <div v-if="validateState === 'error'" class="mk-form-item__error">
      {{ validateMessage }}
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
import Emitter from "../../mixins/emitter";

export default {
  name: "FormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    }
  },
  data() {
    return {
      isRequired: false,
      validateState: "",
      validataMessage: "",
      initialValue: ''
    };
  },
  mounted() {
    if (this.prop) {
      this.dispatch("Form", "on-form-item-add", this);
      this.setRules();
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
    }
  },
  beforeDestroy() {
    this.dispatch("Form", "on-form-item-remove", this);
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : [];
      return formRules || []
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    validata(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";

        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      this.validata("blur");
    },
    onFieldChange() {
      this.validata("change");
    },
    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    },
  },
};
</script>
