<template>
  <div class="dialog-box">
    <el-dialog
      title="批量导入信息"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="720px"
      center
      class="dialog"
    >
      <div class="import-box">
        <div class="basic-title">基本信息</div>
        <div class="basic-msg">
          <div v-for="item in options" :key="item.name" class="msg-box">
            <div>{{ item.label }}</div>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="list-box">
        <div class="list-title">列表详情</div>
        <div class="list-msg">
          <div class="list-box">支持{{ 5 }}个</div>
          <div class="list-box">不支持{{ 6 }}个</div>
        </div>
        <el-table :data="gridData" class="table">
          <el-table-column
            property="date"
            label="日期"
            width="150"
          ></el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="200"
          ></el-table-column>
          <el-table-column property="companyStatus" label="状态">
            <template slot-scope="scope">
              <div class="status-name">
                <div
                  class="status-round"
                  :class="{
                    'status-round-invalid': scope.row.companyStatus == 1,
                  }"
                ></div>
                <div>{{ scope.row.statusName }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="isShow = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          companyStatus: "1",
          statusName: "我",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          companyStatus: "2",
          statusName: "我",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          companyStatus: "1",
          statusName: "我",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          companyStatus: "2",
          statusName: "我",
        },
      ],
      options: [
        { label: "产品名称", name: "智慧云" },
        { label: "细项", name: "购买" },
        { label: "时长", name: "365天" },
      ],
    };
  },
  methods: {
    changeState(data) {
      console.log(data);
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-box {
  /deep/.el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      height: 52px;
      background: #f0f2f5;
      border-radius: 8px 8px 0 0;
      padding: 0;
      line-height: 52px;
    }
  }
  .import-box {
    .basic-title:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 16px;
      margin-right: 8px;
      background: #81281e;
    }
    .basic-title {
      width: 76px;
      height: 21px;
      font-size: 16px;
      color: #262626;
    }
    .basic-msg {
      display: flex;
      .msg-box {
        width: 210px;
        height: 80px;
        box-sizing: border-box;
        padding: 16px 0 16px 20px;
        background: #f5f7fa;
        border-radius: 6px;
        margin-right: 21px;
      }
    }
  }
  .list-box {
    .list-title:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 16px;
      margin-right: 8px;
      background: #81281e;
    }
    .list-title {
      width: 76px;
      height: 21px;
      font-size: 16px;
      color: #262626;
    }
    .list-msg {
      display: flex;
      .list-box {
        width: 326px;
        height: 40px;
        box-sizing: border-box;
        padding: 10px 0 11px 14px;
        background: #f5f7fa;
        border-radius: 6px;
        margin-right: 20px;
      }
    }
  }
}
/deep/.el-table {
  .status-name {
    display: flex;
    .status-round {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
      margin-top: 8px;
      background: #ff4545;
    }
    .status-round-invalid {
      background: #47c23a;
    }
  }
}
</style>
