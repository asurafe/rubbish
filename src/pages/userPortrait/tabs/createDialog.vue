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
      <el-form-item
        label="所属主题和类型"
        :label-width="labelWidth"
        prop="name"
      >
        <el-cascader
          placeholder="试试搜索：指南"
          v-model="form.name"
          :options="option"
          :props="optionProps"
          @change="handleChange"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="批量添加标签页"
        :label-width="labelWidth"
        prop="textarea"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.textarea"
        >
        </el-input>
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
  props: ["option"],
  data() {
    return {
      isShow: false,
      isSureShow: false,
      optionProps: {
        value: "id",
        label: "topicName",
        children: "typeVoList",
      },
      form: {
        name: "",
        textarea: "",
      },
      labelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请选择所属主题与类型", trigger: "blur" },
        ],
        textarea: [
          { required: true, message: "请输入批量添加标签项", trigger: "blur" },
        ],
      },
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
    // 更改所属主题和类型
    handleChange(value) {
      console.log(value, this.form.name);
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
    // 取消
    cancel() {
      if (this.form.name || this.form.textarea) {
        this.isSureShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
