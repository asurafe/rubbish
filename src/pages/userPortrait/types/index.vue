<template>
  <div>
    <div class="header-box">
      <el-input
        v-model="input"
        placeholder="请输入类型主题/所属主题"
        class="input"
        @input="changeType"
      />
      <el-button @click="open">新建</el-button>
    </div>
    <TabsTable :tableData="tableData" @changeState="changeState" @edit="edit" />
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
    <CreateDialog ref="create" @submit="createTabs" :options="options" />
    <EditDialog ref="edit" @submit="editTabs" :options="options" />
  </div>
</template>

<script>
import TabsTable from "./tabsTable.vue";
import CreateDialog from "./createDialog.vue";
import EditDialog from "./editDialog.vue";
export default {
  data() {
    return {
      input: "",
      createDialog: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: true,
          value: "yizhi",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: true,
          value: "yizhi",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: true,
          value: "fankui",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: false,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: false,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: true,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          application: false,
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      rows: 1,
      pages: 1,
      pageTotal: 120,
      timer: null,
    };
  },
  methods: {
    // 打开新建弹窗
    open() {
      this.$refs.create.changeState();
    },
    // 打开编辑弹窗
    edit(data) {
      this.$refs.edit.changeState(data);
    },
    // 新建
    async createTabs(data) {
      const { name, value } = data;
      // const res = await insert({
      //   typeName:name,
      //   topicId:value
      // })
      console.log(data);
    },
    // 编辑
    editTabs(data) {
      // const res = await update({
      //   id: data.id,
      //   typeName: data.typeName,
      //   status: data.statusType ? "1" : "0",
      // });
      console.log(1, data);
    },
    // 切换页数
    currentChange(data) {
      // this.getTable()
      console.log(data);
    },
    // 切换每页最大条数
    sizeChange(data) {
      // this.getTable()
      console.log(data);
    },
    // 是否应用
    changeState(state) {
      // const res = await update({
      //   id: state.id,
      //   typeName: state.typeName,
      //   status: state.statusType ? "1" : "0",
      // });
      console.log(state);
    },
    async getTable() {
      // const res = await listType({
      //   pageNo:this.pages,
      //   pageSize:this.rows,
      //   data:this.input
      // })
      // this.tableData = res.data.list
    },
    // 类型管理搜索
    changeType() {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.input) return;
        // this.getTable()
        console.log(this.input);
      }, 500);
    },
    init() {
      // this.tableData = await listType({
      //   pageNo:this.pages,
      //   pageSize:this.rows,
      // });
      // this.option = await toUpdateType();
      this.tableData = [
        {
          id: 1,
          typeName: "性别",
          typeId: "sex",
          status: "0",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 1,
          topicName: "人物属性",
        },
        {
          id: 3,
          typeName: "职位",
          typeId: "p",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 1,
          topicName: "人物属性",
        },
        {
          id: 5,
          typeName: "3333",
          typeId: null,
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 3,
          topicName: "公司属性",
        },
        {
          id: 7,
          typeName: "test",
          typeId: "test",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 1,
          topicName: "人物属性",
        },
        {
          id: 9,
          typeName: "test",
          typeId: "test2",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 2,
          topicName: "基金属性",
        },
        {
          id: 11,
          typeName: "test",
          typeId: "test",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 2,
          topicName: "基金属性",
        },
        {
          id: 13,
          typeName: "test",
          typeId: "test",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 2,
          topicName: "基金属性",
        },
        {
          id: 15,
          typeName: null,
          typeId: null,
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 3,
          topicName: "公司属性",
        },
        {
          id: 17,
          typeName: "test",
          typeId: "test",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 3,
          topicName: "公司属性",
        },
        {
          id: 19,
          typeName: "test",
          typeId: "test",
          status: "1",
          createTime: "2022-11-24 10:38:50",
          updateTime: "2022-11-24 10:39:13",
          topicId: 3,
          topicName: "公司属性",
        },
      ];
      this.options = [
        {
          id: 1,
          name: "人物属性",
          list: null,
        },
        {
          id: 2,
          name: "基金属性",
          list: null,
        },
        {
          id: 3,
          name: "公司属性",
          list: null,
        },
        {
          id: 5,
          name: "项目属性",
          list: null,
        },
      ];
    },
  },
  created() {
    this.init();
    this.tableData.map((item) => {
      const status = item.status == 0 ? false : true;
      this.$set(item, "statusType", status);
    });
  },
  components: {
    TabsTable,
    CreateDialog,
    EditDialog,
  },
};
</script>

<style scoped>
.input {
  width: 300px;
}
.header-box {
  display: flex;
  justify-content: space-between;
}
</style>
