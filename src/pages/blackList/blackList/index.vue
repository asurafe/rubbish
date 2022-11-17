<template>
  <div>
    <div class="select-box">
      <el-input
        v-model="name"
        placeholder="请输入姓名/手机号/公司"
        class="name-input"
      />
      <el-button @click="isShow = true">添加外部黑名单</el-button>
    </div>
    <BlackTable :tableData="tableData" @remove="remove" />
    <el-dialog title="收货地址" :visible.sync="isShow">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="labelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="labelWidth">
          <el-input v-model="form.phone" @blur="changeNumber"></el-input>
        </el-form-item>
        <el-form-item label="公司" :label-width="labelWidth">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="isShow = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BlackTable from "./blackListTable.vue";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          isBlack: true,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          isBlack: true,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          isBlack: false,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
          isBlack: false,
        },
      ],
      isShow: false,
      isBlackShow: false,
      name: "",
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
        company: "",
      },
      labelWidth: "120px",
    };
  },
  methods: {
    // 移出黑名单
    remove(data) {
      this.isShow = true;
      console.log("移除", data);
    },
    onSubmit(data) {
      console.log("提交", data);
    },
    changeNumber(){

    }
  },
  components: {
    BlackTable,
  },
};
</script>

<style scoped>
.select-box {
  display: flex;
  justify-content: space-between;
}
.name-input {
  width: 200px;
}
</style>
