<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action
      :http-request="uploadExcel"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-button size="small" class="button" type="primary" @click="exportExcel">
      导出模板
    </el-button>
    <el-button size="small" class="button" type="primary" @click="batchCreate">
      批量创建
    </el-button>
    <el-button size="small" class="button" type="primary" @click="batchApproval">
      批量审批
    </el-button>
    <el-button size="small" class="button" type="primary" @click="contractBack">
      合同回滚
    </el-button>
    <el-button @click="$router.push('/blackList')" size="small" type="primary">
      黑名单
    </el-button>
    <el-button
      @click="$router.push('/userPortrait')"
      size="small"
      type="primary"
    >
      用户画像
    </el-button>
    <BatchCreate ref="batchCreate" @importFile="importFile" />
    <ImportFile ref="importFile" />
    <ContractBack ref="contractBack" />
    <BatchApproval ref="batchApproval" />
    <router-view />
  </div>
</template>

<script>
import toJson from "./utils/toJson.js";
import exportExcel from "./utils/exportExcel.js";
import isSameArr from "./utils/isSameArr";
import BatchCreate from "./pages/batchCreate.vue";
import ImportFile from "./pages/importFile.vue";
import ContractBack from "./pages/contractBack.vue";
import BatchApproval from "./pages/batchApproval.vue"
export default {
  data() {
    return {
      data: ["组织ID", "智慧云空间", "智慧云人数"],
    };
  },
  methods: {
    uploadExcel(e) {
      const file = e.file;
      if (!file) return;
      const size = Number(file.size / 1024 / 1024);
      if (size > 4) this.$message.warning("请选择4M以内的EXCEL导入");
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        this.$refs.upload.clearFiles();
        let jsonData = toJson(data);
        const dataArr = Object.keys(jsonData[0]);
        console.log(isSameArr(this.data, dataArr));
        console.log("dataArr", dataArr, "jsonData", jsonData);
      };
    },
    exportExcel,
    batchCreate() {
      this.$refs.batchCreate.changeState();
    },
    importFile(data) {
      this.$refs.importFile.changeState(data);
    },
    contractBack(){
      this.$refs.contractBack.changeState();
    },
    batchApproval(){
      this.$refs.batchApproval.changeState();
    }
  },
  components: {
    BatchCreate,
    ImportFile,
    ContractBack,
    BatchApproval
  },
};
</script>

<style scoped>
.upload-demo {
  display: inline-block;
  margin-right: 10px;
}
</style>
