<template>
  <el-dialog
    title="编辑标签"
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
      <el-form-item label="标签名称" :label-width="labelWidth" prop="name">
        <el-input placeholder="请输入内容" v-model="form.name" maxlength="20">
        </el-input>
      </el-form-item>
      <el-form-item
        label="所属主题和类型"
        :label-width="labelWidth"
        prop="value"
      >
        <el-cascader
          placeholder="试试搜索：指南"
          v-model="form.value"
          :options="option"
          :props="optionProps"
          filterable
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isSureShow = true">取消</el-button>
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
      labelWidth: "120px",
      optionProps: {
        value: "id",
        label: "topicName",
        children: "typeVoList",
      },
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
    };
  },
  methods: {
    changeState(data) {
      this.form = JSON.parse(JSON.stringify(data));
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields();
      this.isShow = !this.isShow;
    },
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
  },
};
</script>

<style lang="scss" scoped></style>
