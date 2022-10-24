<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog v-model="dialogVisible" title="上传文件" @close="closeDialog">
    <div class="upload-content">
      <div class="single-upload">
        <h3>上传单个文件</h3>
        <form id="singleUploadForm" name="singleUploadForm" @submit.prevent="singleSubmit">
          <input id="singleFileUploadInput" type="file" name="file" class="file-input" required ref="singleInput" />
          <button type="submit" class="primary submit-btn">提交</button>
        </form>
      </div>
      <div class="multiple-upload">
        <h3>上传多个文件</h3>
        <form id="multipleUploadForm" name="multipleUploadForm" @submit.prevent="multiSubmit">
          <input id="multipleFileUploadInput" type="file" name="files" class="file-input" ref="multiInput" multiple
            required />
          <button type="submit" class="primary submit-btn">提交</button>
        </form>
      </div>
    </div>
  </el-dialog>
</template>
  
<script>
import { localFileMultiUpload, localFileUpload } from "../../../request/file";
export default {
  data() {
    return {
      fileList: [],
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("handleUploadFile", false);
    },
    handleRemove(file, uploadFiles) {
      console.log(file, uploadFiles);
    },
    singleSubmit() {
      let files = this.$refs.singleInput.files;
      if (files.length == 0) {
        console.log("文件数量为0");
      }
      this.uploadSingleFile(files[0]);
    },
    multiSubmit() {
      let files = this.$refs.multiInput.files;
      console.log(files[0]);
      if (files.length == 0) {
        console.log("文件数量为0");
      }
      this.uploadMultiFile(files);
    },
    uploadSingleFile(file) {
      this.$emit("handleUploadFile", false);
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      localFileUpload(formData)
        .then((res) => {
          if (res.success) {
            this.$message.success("文件上传成功");
          } else {
            this.$message.error("文件上传失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "服务器出错",
          });
        });
    },
    uploadMultiFile(files) {
      this.$emit("handleUploadFile", false);
      let formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        formData.append("files", files[index]);
      }

      localFileMultiUpload(formData)
        .then((res) => {
          if (res.success) {
            this.$message.success("文件上传成功");
          } else {
            this.$message.error("文件上传失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "服务器出错",
          });
        });
    },
  },
};
</script>

<style scoped>
/**解决元素浮动 */
h3 {
  margin-top: 20px;
  margin-bottom: 20px;
}

a {
  color: #128ff2;
}

button {
  box-shadow: none;
  border: 1px solid transparent;
  font-size: 14px;
  outline: none;
  line-height: 100%;
  white-space: nowrap;
  vertical-align: middle;
  padding: 0.6rem 1rem;
  border-radius: 2px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  min-height: 38px;
}

button.primary {
  background-color: #128ff2;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
  color: #fff;
}

input {
  font-size: 1rem;
}

input[type="file"] {
  border: 1px solid #128ff2;
  padding: 6px;
  max-width: 100%;
}

.file-input {
  width: 100%;
}

.submit-btn {
  display: block;
  margin-top: 15px;
  min-width: 100px;
}

@media screen and (min-width: 500px) {
  .file-input {
    width: calc(100% - 115px);
  }

  .submit-btn {
    display: inline-block;
    margin-top: 0;
    margin-left: 10px;
  }
}

.upload-container {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  margin-top: 60px;
  min-height: 400px;
  position: relative;
  padding: 20px;
}

.upload-header {
  border-bottom: 1px solid #ececec;
}

.upload-header h2 {
  font-weight: 500;
}

.single-upload {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.upload-response {
  overflow-x: hidden;
  word-break: break-all;
}
</style>