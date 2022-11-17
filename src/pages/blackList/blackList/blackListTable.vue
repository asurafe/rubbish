<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="province" label="手机号" />
    <el-table-column prop="address" label="公司" />
    <el-table-column prop="zip" label="操作时间" />
    <el-table-column prop="zip" label="操作人" />
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="remove(scope.row)">
          移出
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {};
  },
  methods: {
    remove(row) {
      this.$emit("remove", row);
    },
  },
  created() {},
};
</script>
s
<style scoped></style>
