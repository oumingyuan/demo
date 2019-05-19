<template>
    <div>
        <el-container>
            <el-aside width="200px" id="left">

                <h3>图片1</h3>

                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8002/compare_base/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess_base"
                        :before-upload="beforeAvatarUpload"
                        id="file_picture"
                >
                    <img v-if="imageUrl_base" :src="imageUrl_base" class="avatar" alt="">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <h3>图片2</h3>
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8002/compare_base/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"

                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>


                <el-button type="primary" :loading=button_state @click="upload">开始比对</el-button>


            </el-aside>
            <el-main id="main">

                <h3>两张图片相似度如下</h3>

                <el-input
                        style="width:400px;color: black"
                        placeholder="等待后端返回数据"
                        v-model="confidence">
                </el-input>


            </el-main>
        </el-container>


    </div>


</template>


<script>
    import axios from 'axios'

    // <!--:http-request="UploadImage2"-->
    export default {
        data() {
            return {
                imageUrl: '',
                imageUrl_base: '',
                file1: '',
                file2: '',
                confidence: '',
                button_state: false

            };
        },
        methods: {

            handleAvatarSuccess_base(res, file) {
                this.file1 = file;
                this.imageUrl_base = URL.createObjectURL(file.raw);
            },

            handleAvatarSuccess(res, file) {
                this.file2 = file;
                this.imageUrl = URL.createObjectURL(file.raw);
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }

                return isJPG && isLt2M;
            },

            // noinspection JSUnresolvedVariable
            upload: function () {

                this.button_state = true;

                let param = new FormData();
                param.append('file1', this.file1.raw);
                param.append('file2', this.file2.raw);

                if (!this.file1) {
                    this.$alert('请选择第一张图片', '图片未选择异常', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                    this.button_state = false;
                    return;
                }
                if (!this.file2) {
                    this.$alert('请选择第二张图片', '图片未选择异常', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                    this.button_state = false;
                    return;
                }

                console.log("file1", this.file1);
                console.log("file2", this.file2);


                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.describe = '正在分析图片，请稍后。。。';
                axios.post('http://localhost:8002/compare/', param, config)
                    .then(response => {
                        console.log(response.data);
                        this.confidence = response.data.confidence;
                        this.button_state = false;
                    })


            },

        }
    }
</script>


<style>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

