<template>
  <div>
    <BlackList @onSubmit="search" />
    <BlackListTable
      :tableData="tableData"
      @recovery="recovery"
      @movein="movein"
      @remove="remove"
    />
    <el-pagination
        class="custom-pagination"
        slot="append"
        background
        layout="total, sizes,prev, pager, next, jumper"
        :current-page="pages"
        :total="pageTotal"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="rows"
        @current-change="currentChange"
        @size-change="sizeChange"
    />
  </div>
</template>

<script>
import BlackList from "./blackList.vue";
import BlackListTable from "./blackListTable.vue";
export default {
  components: {
    BlackList,
    BlackListTable,
  },
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
      rows:1,
      pages:1,
      pageTotal:120
    };
  },
  methods: {
    // 查询
    search(data) {
      console.log("查询", data);
    },
    // 恢复
    recovery(data) {
      console.log("恢复", data);
    },
    // 移入黑名单
    movein(data) {
      this.isShow = true;
      console.log("移入黑名单", data);
    },
    // 移出黑名单
    remove(data) {
      this.isShow = true;
      console.log("移除", data);
    },
    // 切换页数
    currentChange(data){
      console.log(data)
    },
    // 切换每页最大条数
    sizeChange(data){
      console.log(data)
    }
  },
};
</script>

<style lang="scss" scoped></style>
