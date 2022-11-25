<template>
  <el-dialog
    title="收货地址"
    :visible.sync="isShow"
    :close-on-click-modal="false"
  >
    <el-dialog
      width="30%"
      title="内层"
      :visible.sync="isSureShow"
      append-to-body
    >
      <span>确认要关闭【编辑标签】弹窗吗？关闭后填写的内容将不会保存。</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isSureShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="(isSureShow = false), (isShow = false)"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="类型名称" :label-width="labelWidth" prop="name">
        <el-input placeholder="请输入内容" v-model="form.name" maxlength="20">
        </el-input>
      </el-form-item>
      <el-form-item label="所属主题" :label-width="labelWidth" prop="value">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      isShow: false,
      isSureShow: false,
      form: {
        name: "",
        value: "",
      },
      rules: {
        name: [
          { required: true, message: "请选择所属主题与类型", trigger: "blur" },
        ],
        value: [
          { required: true, message: "请输入批量添加标签项", trigger: "blur" },
        ],
      },
      labelWidth: "120px",
    };
  },
  methods: {
    changeState() {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields();
      this.isShow = !this.isShow;
      Object.keys(this.form).forEach((key) => {
        this.form[key] = null;
      });
    },
    // 提交
    submit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.isShow = !this.isShow;
          this.$emit("submit", this.form);
        } else {
          return false;
        }
      });
    },
    cancel() {
      if (this.form.name || this.form.value) {
        this.isSureShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
