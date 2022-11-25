<template>
  <div class="dialog-box">
    <el-dialog
      title="合同回滚"
      :visible.sync="isShow"
      width="480px"
      center
      :close-on-click-modal="false"
    >
      <div class="warning-tips">
        <div class="tips-box">
          <div class="tips">!</div>
          <div class="tips-text">
            合同回滚后，用户的产品使用信息将回滚至合同创建之前，请谨慎操作！
          </div>
        </div>
      </div>
      <el-form :model="form" label-position="top">
        <el-form-item label="回滚备注" :label-width="width">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea"
            maxlength="50"
            show-word-limit
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4 }"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" class="cancel-button"
          >取消</el-button
        >
        <el-button type="primary" @click="contractBack" class="confirm-button"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      width: "120px",
      form: {
        textarea: "",
      },
    };
  },
  methods: {
    changeState() {
      this.isShow = !this.isShow;
    },
    contractBack() {
      this.isShow = false;
      this.$message.success("合同回滚成功");
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-box {
  .warning-tips {
    width: 480px;
    height: 56px;
    background: #fff7e8;
    box-sizing: border-box;
    .tips-box {
      padding: 8px 24px;
      display: flex;
      .tips {
        width: 16px;
        height: 16px;
        background: #f77c00;
        border-radius: 8px;
        color: #fff;
        text-align: center;
        line-height: 16px;
        margin-top: 3px;
      }
      .tips-text {
        width: 408px;
        height: 40px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #f77c00;
        line-height: 20px;
        margin-left: 8px;
      }
    }
  }
  /deep/.el-dialog {
    border-radius: 8px;
    .el-dialog__header {
      height: 52px;
      background: #f0f2f5;
      border-radius: 8px 8px 0 0;
      padding: 0;
      line-height: 52px;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-form {
      padding: 24px;
      .el-form-item__label {
        height: 27px;
        line-height: 9px;
      }
    }
    .dialog-footer {
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
      .confirm-button {
        width: 60px;
        height: 32px;
        text-align: center;
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
    }
  }
}
</style>
