<template>
  <Form @submit="submitRegister">
    <div class="form-group">
      <label for="userName">Tên người dùng:</label>
      <Field
        name="userName"
        type="text"
        class="form-control"
        v-model="infoRegisterLocal.userName"
      />
      <ErrorMessage name="userName" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu:</label>
      <Field
        name="password"
        type="text"
        class="form-control"
        v-model="infoRegisterLocal.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="cfPassword">Nhập mật khẩu:</label>
      <Field name="cfPassword" type="text" class="form-control" />
      <ErrorMessage name="cfPassword" class="error-feedback" />
    </div>

    <div class="form-group d-flex justify-content-end">
      <button class="btn btn-success">Đăng ký</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  emits: ["submit:infoRegister"],
  props: {
    infoRegister: { type: Object, required: true },
  },

  data() {
    const contactFormSchema = yup.object().shape({
      userName: yup
        .string()
        .required("Tên người dùng phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự."),
      password: yup.string().required("Mật khẩu phải có giá trị."),
      cfPassword: yup.string()
      .required("Nhập lại mật khẩu phải có giá trị."),
    });
    return {
      infoRegisterLocal: this.infoRegister,
      contactFormSchema,
    };
  },

  methods: {
    submitRegister() {
      this.$emit("submit:infoRegister", this.infoRegisterLocal);
    },
  },
};
</script>
