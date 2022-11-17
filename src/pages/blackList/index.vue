<template>
  <div>
    <el-tabs v-model="componentId" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in buttonOption"
        :label="item.name"
        :key="item.value"
        :name="item.value"
      />
    </el-tabs>
    <components :is="componentId" />
  </div>
</template>

<script>
import BlackList from "./blackList/index.vue";
import Account from "./account/index.vue";
export default {
  data() {
    return {
      componentId: "Account",
      buttonOption: [
        { name: "荣大用户", value: "Account" },
        { name: "外部用户", value: "BlackList" },
      ],
    };
  },
  methods: {
    handleClick(tabs, event) {
      this.componentId = tabs.name;
    },
  },
  components: {
    Account,
    BlackList,
  },
};
</script>

<style lang="scss" scoped></style>
