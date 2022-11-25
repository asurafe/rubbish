<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="typeName" label="类型名称" width="150">
    </el-table-column>
    <el-table-column prop="topicName" label="所属主题"> </el-table-column>
    <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    <el-table-column label="是否应用">
      <template slot-scope="scope">
        <el-switch
          @change="changeState(scope.row)"
          v-model="scope.row.statusType"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ["tableData"],
  methods: {
    edit(row) {
      this.$emit('edit',row)
    },
    changeState(state) {
      this.$emit("changeState", state);
    },
  },
};
</script>
<style lang="scss" scoped></style>
