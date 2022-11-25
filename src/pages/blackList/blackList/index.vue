<template>
  <div>
    <div class="select-box">
      <el-input
        v-model="input"
        placeholder="请输入姓名/手机号/公司"
        class="name-input"
        @input="searchName"
      />
      <el-button @click="create">添加外部黑名单</el-button>
    </div>
    <BlackTable :tableData="tableData" @remove="remove" />
    <CreateDialog ref="create" @addBlackList="addBlackList"/>
  </div>
</template>

<script>
import BlackTable from "./blackListTable.vue";
import CreateDialog from "./createDialog.vue"
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
      input: "",
      timer: null,
    };
  },
  methods: {
    // 移出黑名单
    remove(data) {
      // 展示提示弹窗
      console.log("移除", data);
    },
    searchName() {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.input) return;
        console.log(this.input);
      }, 500);
    },
    addBlackList(data){
      console.log(data)
    },
    create(){
      this.$refs.create.changeState()
    },

  },
  components: {
    BlackTable,
    CreateDialog
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
