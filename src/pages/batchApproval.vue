<template>
  <div class="dialog-box">
    <el-dialog
      title="批量审批"
      :visible.sync="isShow"
      width="480px"
      center
      class="dialog"
      :close-on-click-modal="false"
    >
      <div class="basic-title">合同信息</div>
      <el-form :model="form" label-position="top">
        <el-form-item label="订单说明" :label-width="width">
          <div class="order-description">
            <el-input placeholder="请输入准确的订单说明" v-model="form.input" />
            <el-button class="search-button" @click="search"> 查询 </el-button>
          </div>
        </el-form-item>
        <el-form-item
          label="合同数量"
          :label-width="width"
          class="contract-num"
        >
          <el-input
            placeholder="输入订单说明并点击查询后，信息将自动回显"
            v-model="num"
            :disabled="true"
          />
        </el-form-item>
      </el-form>
      <div class="basic-title">审批信息</div>
      <el-radio-group v-model="radio">
        <el-radio :label="3">通过</el-radio>
        <el-radio :label="6">驳回</el-radio>
      </el-radio-group>
      <el-form :model="form" label-position="top" class="opinion">
        <el-form-item label="审批意见" :label-width="width">
          <el-input
            class="input"
            type="textarea"
            placeholder="请输入审批意见"
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
        <el-button @click="isShow = false" class="cancel-button">取消</el-button>
        <el-button type="primary" @click="confirm" class="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      width: "360px",
      radio: 3,
      num: "",
      form: {
        input: "",
      },
    };
  },
  methods: {
    changeState() {
      this.isShow = !this.isShow;
    },
    // 查询
    async search() {
      // const res = await search({
      //   data:form.input
      // })
      this.num = 20;
      console.log("这是查询");
    },
    confirm(){
      this.isShow = false
      this.$message.success("批量审批成功")
    }
  },
};
</script>

<style lang="less" scoped>
.dialog-box {
  /deep/.el-dialog {
    border-radius: 8px;
    .order-description {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-input__inner {
        width: 360px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #81281e;
        border-radius: 6px;
      }
      .search-button {
        width: 60px;
        height: 32px;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        position: relative;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .contract-num {
      .el-input__inner {
        height: 32px;
        border-radius: 6px;
      }
    }
    .el-form--label-top .el-form-item__label {
      padding: 0;
      line-height: 0;
      margin-bottom: 8px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-dialog__header {
      height: 52px;
      background: #f0f2f5;
      border-radius: 8px 8px 0 0;
      padding: 0;
      line-height: 52px;
    }
    .dialog-footer {
      text-align: right;
      .cancel-button {
        color: #000;
        width: 60px;
        height: 32px;
        border-radius: 6px;
        position: relative;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .confirm {
        width: 74px;
        height: 32px;
        text-align: center;
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
  }
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
    padding-bottom: 20px;
    color: #262626;
  }
  .dialog-footer {
    text-align: right;
  }
  .opinion {
    margin-top: 20px;
    .input {
      margin-top: 8px;
    }
  }
  /deep/.el-radio__input.is-checked + .el-radio__label {
    color: black;
  }
  /deep/.el-radio__input.is-checked .el-radio__inner {
    border: #81281e;
    background-color: #81281e;
  }
}
</style>
