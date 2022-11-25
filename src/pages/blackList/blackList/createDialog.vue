<template>
  <el-dialog
    title="收货地址"
    :visible.sync="isShow"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="姓名" :label-width="labelWidth" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="labelWidth" prop="phone">
        <el-input v-model="form.phone" maxLength="11"></el-input>
      </el-form-item>
      <el-form-item label="公司" :label-width="labelWidth" prop="company">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="onSubmit('ruleForm')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
const limitNumber = (rule, value, callback) => {
  const pattern = new RegExp(/(^[\-0-9][0-9]*(.[0-9]+)?)$/).test(value);
  if (!pattern) {
    callback(new Error("仅支持数字类型，请重新填写"));
  } else {
    callback();
  }
};
// 是否荣大手机号检测
const checkPhone = (rule, value, callback) => {
  setTimeout(() => {
    if ((Math.floor(Math.random() * 10) + 1) % 2 == 0) {
      callback(new Error("账号为荣大用户，请到注册账号管理操作"));
    } else {
      callback();
    }
  }, 500);
};
export default {
  data() {
    return {
      isShow: false,
      labelWidth: "120px",
      form: {
        name: "",
        phone: "",
        company: "",
      },
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { max: 20, message: "姓名上限为20，请重新填写", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { required: true, validator: limitNumber, trigger: "blur" },
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
        company: [
          { required: true, message: "公司不能为空", trigger: "blur" },
          { max: 50, message: "公司上限为50，请重新填写", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('addBlackList',this.form)
          this.isShow = !this.isShow
          console.log("验证成功~");
        } else {
          return false;
        }
      });
    },
    changeState() {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields();
      Object.keys(this.form).forEach((key) => {
        this.form[key] = null;
      });
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss" scoped></style>
