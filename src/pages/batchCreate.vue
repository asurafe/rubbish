<template>
  <div class="dialog-box">
    <el-dialog
      title="批量创建合同"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="480px"
      center
      class="dialog"
    >
      <div v-show="active == 1">
        <div class="create-title">
          合同基本信息<span class="title-right">（必填）</span>
        </div>
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-position="top"
        >
          <el-form-item label="产品">
            <el-select v-model="form.product">
              <el-option
                v-for="item in product"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="细项">
            <el-select v-model="form.details" @change="changeDetails">
              <el-option
                v-for="item in details"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时长" v-show="type == 'buy'">
            <el-select v-model="form.duration">
              <el-option
                v-for="item in duration"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="扩容权限" v-show="type == 'capacity'">
            <el-select v-model="form.duration">
              <el-option
                v-for="item in jurisdict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型" prop="ordertype">
            <el-select v-model="form.ordertype">
              <el-option
                v-for="item in ordertype"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单说明" prop="explain">
            <el-input
              type="textarea"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入订单说明"
              v-model="form.explain"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="next('ruleForm')">下一步</el-button>
        </div>
      </div>
      <div v-show="active == 2" class="upload-box">
        <div>
          <div class="download-title">下载模板</div>
          <div class="download">
            <span class="download-button" @click="exportExcel">下载空模板</span
            >，填完信息后上传以批量创建合同
          </div>
        </div>
        <div>
          <div class="upload-title">上传完善后的模板</div>
          <el-upload
            ref="upload"
            drag
            action
            :on-change="changeFile"
            :http-request="uploadExcel"
            :file-list="fileList"
            show-file-list
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>{{
                fileList.length > 0 ? "重新上传" : "点击上传"
              }}</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              <p>1.请选择4M以内的EXCEL导入，仅支持格式</p>
              <p>2.表中各列仅支持数字</p>
              <p>3.单次最高支持导入200条数据，超过200条的部分忽略不计</p>
            </div>
          </el-upload>
        </div>
        <div slot="footer" class="create-dialog-footer">
          <el-button @click="isShow = false" class="cancel-button"
            >取消</el-button
          >
          <el-button type="primary" @click="active = 1" class="previous-step"
            >上一步</el-button
          >
          <el-button
            type="primary"
            class="import-file"
            :disabled="!(fileList.length > 0)"
            @click="importFile"
            :loading="isLoading"
            >导入文件</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import toJson from "@/utils/toJson.js";
import exportExcel from "@/utils/exportExcel.js";
import isSameArr from "@/utils/isSameArr";
import isExcel from "@/utils/isExcel";
import {
  product,
  details,
  duration,
  jurisdict,
  ordertype,
} from "@/assets/options.js";
export default {
  data() {
    return {
      isShow: false,
      width: "432px",
      type: "buy",
      product,
      details,
      duration,
      jurisdict,
      ordertype,
      active: 1,
      isLoading: false,
      form: {
        product: "wisdom-cloud",
        details: "buy",
        duration: "half-year",
        ordertype: "",
        explain: "",
      },
      data: ["组织ID", "智慧云空间", "智慧云人数"],
      fileList: [],
      rules: {
        ordertype: [
          { required: true, message: "请选择订单类型", trigger: "change" },
        ],
        explain: [
          { required: true, message: "请输入订单说明", trigger: "blur" },
        ],
      },
      jsonData: [],
    };
  },
  methods: {
    changeState() {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields();
      this.isShow = !this.isShow;
    },
    // 下一步
    next(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.active = 2;
        } else {
          return false;
        }
      });
    },
    // 重新上传
    changeFile(file, fileList) {
      if (!isExcel(file)) {
        this.fileList = [];
        return;
      }
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.fileList = fileList;
    },
    // 更改细项
    changeDetails(data) {
      data == "buy"
        ? (this.form.duration = "half-year")
        : (this.form.duration = "current");
      this.type = data;
    },
    //上传文件
    uploadExcel(e) {
      const file = e.file;
      if (!file) return;
      if (isExcel(file)) {
        const size = Number(file.size / 1024 / 1024);
        if (size > 4) {
          this.$message.error("请选择4M以内的EXCEL导入");
          return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          const data = e.target.result;
          let jsonData = toJson(data);
          const dataArr = Object.keys(jsonData[0]);
          console.log(isSameArr(this.data, dataArr));
          this.jsonData = jsonData;
          console.log("dataArr", dataArr, "jsonData", jsonData);
        };
      } else {
        this.$message.error("请选择EXCEL类型文件进行导入");
      }
    },
    // 导入文件
    importFile() {
      this.isLoading = true;
      setTimeout(() => {
        this.$emit("importFile", this.jsonData);
        this.isLoading = false;
        this.isShow = false;
        this.active = 1;
        this.$message.success("导入成功");
      }, 1000);
    },
    exportExcel,
  },
};
</script>

<style lang="less" scoped>
.dialog-box {
  /deep/.el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      width: 480px;
      height: 52px;
      background: #f0f2f5;
      border-radius: 8px 8px 0 0;
      padding: 0;
      line-height: 52px;
    }
    .create-title {
      width: 164px;
      height: 21px;
      font-size: 16px;
      color: #262626;
      .title-right {
        width: 48px;
        height: 16px;
        font-size: 12px;
        color: #909399;
      }
    }
    .create-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 16px;
      background: #81281e;
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      padding-top: 16px !important;
      padding-bottom: 8px !important;
      line-height: 14px;
    }
    .el-form-item__error {
      padding-top: 0px;
    }
    .el-input--suffix .el-input__inner {
      width: 432px;
      height: 32px;
    }
    .dialog-footer {
      text-align: right;
      display: flex;
      flex-direction: row-reverse;
      .el-button {
        width: 74px;
        height: 32px;
        text-align: center;
        margin-top: 44px;
        background: #81281e;
        border-radius: 6px;
        border: none;
        position: relative;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .create-dialog-footer {
      text-align: right;
      .el-button {
        position: relative;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .import-file {
        width: 88px;
        height: 32px;
        text-align: center;
        margin-top: 44px;
        background: #81281e;
        border-radius: 6px;
        border: none;
      }
      .is-disabled {
        background: #cda9a5;
      }
      .cancel-button {
        color: #000;
        width: 60px;
        height: 32px;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        background: #ffffff;
      }
      .previous-step {
        color: #000;
        width: 74px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
      }
    }
  }
  /deep/.upload-box {
    .download-title {
    }
    .download {
      .download-button {
        color: rgba(129, 40, 30, 1);
        cursor: pointer;
      }
      box-sizing: border-box;
      width: 432px;
      height: 51px;
      background: #f8f9fa;
      border-radius: 6px;
      color: rgba(96, 98, 102, 1);
      font-size: 14px;
      padding: 16px 16px 0 16px;
    }
    .el-upload-dragger {
      width: 432px;
    }
    .is-dragover {
      background: #f3eae9;
      border-color: #81281e;
    }
    .el-upload-dragger:hover {
      border-color: #81281e;
    }
    .el-upload-list__item-name {
      width: 392px;
      height: 48px;
      line-height: 48px;
      background: #ffffff;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
    }
  }
}
</style>
