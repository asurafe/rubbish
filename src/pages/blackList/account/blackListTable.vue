<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="date" label="用户ID"/> 
    <el-table-column prop="name" label="ID"/> 
    <el-table-column prop="province" label="手机号"/> 
    <el-table-column prop="city" label="用户姓名"/> 
    <el-table-column prop="address" label="公司"/> 
    <el-table-column prop="zip" label="创建时间"/> 
    <el-table-column prop="zip" label="来源"/> 
    <el-table-column prop="zip" label="操作时间"/> 
    <el-table-column prop="zip" label="操作人"/> 
    <el-table-column prop="isBlack" label="是否黑名单" :formatter="isBlackFormat"/> 
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="recovery(scope.row)" v-if="!scope.row.isBlack">
            恢复
        </el-button>
        <el-button type="text" size="small" @click="movein(scope.row)" v-if="!scope.row.isBlack">
            移入黑名单
        </el-button>
        <el-button type="text" size="small" @click="remove(scope.row)" v-if="scope.row.isBlack">
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
    recovery(row) {
      this.$emit("recovery", row);
    },
    movein(row){
      this.$emit("movein",row)
    },
    remove(row){
      this.$emit("remove",row)
    },
    isBlackFormat(row,col,value){
      return value ? '是':'否'
    }
  },
  created() {
  },
};
</script>

<style scoped></style>
