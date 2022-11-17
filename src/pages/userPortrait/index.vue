<template>
  <div>
    <el-tabs v-model="componentId" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in option"
        :label="item.name"
        :key="item.value"
        :name="item.value"
      />
    </el-tabs>
    <component :is="componentId" />
  </div>
</template>

<script>
import Tabs from "./tabs/index.vue";
import Types from "./types/index.vue";
export default {
  data() {
    return {
      componentId: "Tabs",
      option: [
        {
          name: "标签管理",
          value: "Tabs",
        },
        {
          name: "类型管理",
          value: "Types",
        },
      ],
    };
  },
  methods: {
    handleClick(tabs, event) {
      this.componentId = tabs.name;
    },
  },
  components: {
    Tabs,
    Types,
  },
};
</script>

<style lang="scss" scoped></style>
