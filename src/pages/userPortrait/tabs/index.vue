<template>
  <div>
    <div class="header-box">
      <el-input
        v-model="input"
        placeholder="请输入标签名称/所属主题/一级类型"
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
    <CreateDialog ref="create" @submit="createTabs" :option="option" />
    <EditDialog ref="edit" @submit="editTabs" :option="option" />
  </div>
</template>

<script>
import TabsTable from "./tabsTable.vue";
import CreateDialog from "./createDialog.vue";
import EditDialog from "./editDialog.vue";
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      createDialog: false,
      tableData: [],
      option: [],
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
      const { name, textarea } = data;
      const tabs = [...new Set(textarea.split("\n"))];
      // await insertMoreLabel({
      //   nameList:tabs,
      //   creationMode:"1",
      //   typeId:name[1],
      // })
      // axios.post('http://192.168.7.152:19007/portrait/metadataPortrait/insertMoreLabel').then((res)=>{
      //   console.log(res)
      // })
    },
    // 编辑
    async editTabs(data) {
      console.log(data);
      // const res = await update({
      //   id:data.id,
      //   name:data.name,
      //   status:data.statusType ? "1" : "0",
      //   typeId:data.value[1]
      // })
    },
    // 切换页数
    async currentChange(data) {
      // this.getTable();
      console.log(data);
    },
    // 切换每页最大条数
    async sizeChange(data) {
      // this.getTable();
      console.log(data);
    },
    // 是否应用
    async changeState(state) {
      const { status } = state;
      // const res = await upadte({
      //   id: state.id,
      //   name: state.name,
      //   status: state.statusType ? "1" : "0",
      //   typeId: state.typeId,
      // });
      console.log(state);
    },
    // 类型管理搜索
    async changeType() {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.input) return;
        // this.getTable();
        console.log(this.input);
      }, 500);
    },
    async getTable() {
      // const res = await listLabel({
      //   pageNo:this.pages,
      //   pageSize:this.rows,
      //   data:this.input
      // })
      // this.tableData = res.data.list
    },
    init() {
      // this.tableData = await listLabel({      
      //   pageNo:this.pages,
      //   pageSize:this.rows,
      // });
      // this.option = await toUpdateLabel();
      this.tableData = [
        {
          id: 1,
          name: "NULL",
          updateTime: "2022-10-31 14:42:35",
          createTime: "2022-10-31 14:42:35",
          status: "1",
          creationMode: "0",
          typeId: 1,
          typeName: "性别",
          topicName: "人物属性",
        },
        {
          id: 3,
          name: "NULL",
          updateTime: "2022-10-31 15:04:39",
          createTime: "2022-10-31 15:04:39",
          status: "0",
          creationMode: "0",
          typeId: 1,
          typeName: "性别",
          topicName: "人物属性",
        },
      ];
      this.option = [
        {
          id: 1,
          topicName: "人物属性",
          typeVoList: [
            {
              id: 1,
              typeName: "性别",
            },
            {
              id: 3,
              typeName: "职位",
            },
            {
              id: 5,
              typeName: null,
            },
            {
              id: 7,
              typeName: "test",
            },
          ],
        },
        {
          id: 2,
          topicName: "基金属性",
          typeVoList: [
            {
              id: 9,
              typeName: "test",
            },
            {
              id: 11,
              typeName: "test",
            },
            {
              id: 13,
              typeName: "test",
            },
          ],
        },
        {
          id: 3,
          topicName: "公司属性",
          typeVoList: [
            {
              id: 15,
              typeName: null,
            },
            {
              id: 17,
              typeName: "test",
            },
            {
              id: 19,
              typeName: "test",
            },
          ],
        },
        {
          id: 5,
          topicName: "项目属性",
          typeVoList: [
            {
              id: 21,
              typeName: "test",
            },
          ],
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
