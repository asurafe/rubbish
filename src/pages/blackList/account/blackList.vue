<template>
  <div>
    <div>
      <el-form
        ref="form"
        :model="cancelForm"
        :inline="true"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="用户">
          <el-input v-model="cancelForm.user"></el-input>
        </el-form-item>
        <el-form-item label="注销渠道">
          <el-select v-model="cancelForm.cancelChannel" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注销时间">
          <el-date-picker
            v-model="cancelForm.cancelDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small"
            >查询</el-button
          >
          <el-button type="primary" @click="reset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cancelForm: {
        user: "",
        cancelChannel: "",
        cancelDate: [],
      },
      options: [
        {
          value: "whole",
          label: "全部",
        },
        {
          value: "crm",
          label: "CRM",
        },
        {
          value: "app1",
          label: "智慧云app",
        },
        {
          value: "app2",
          label: "二郎神app",
        },
        {
          value: "web",
          label: "二郎神web",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.cancelForm);
    },
    reset() {
      Object.keys(this.cancelForm).forEach((key) => {
        this.cancelForm[key] = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
