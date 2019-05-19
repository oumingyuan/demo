<!--suppress ALL -->
<template>
    <div>
        <el-container>
            <el-aside width="200px" id="left">

                <h3>请选择图片上传</h3>

                <el-upload
                        action="http://localhost:8002/detect/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="successUpload"
                        :on-error="errorUpload"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

            </el-aside>
            <el-main id="main">

                <h3>图片分析结果如下</h3>

                <el-tree
                        class="filter-tree"
                        :data="face_data"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        ref="tree2">
                </el-tree>

            </el-main>
        </el-container>


    </div>


</template>


<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                filterText: '',
                face_data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },


        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successUpload(response, file, fileList) {

                let face_list = response.faces;

                console.log('后端返回的数据', face_list);

                let length = face_list.length;

                if (length >= 5) {
                    length = 5;
                }


                let data = [];
                for (let i = 0; i < length; i++) {

                    let map = {};

                    map.id = i;

                    map.label = 'face_' + i;
                    map.children = this.list_convert_list(this.json_convert_list(face_list[i].attributes));

                    data.push(map)

                }

                console.log('由于免费版本只能获取最多5张人脸的信息，故页面只展示5个信息');

                console.log('页面展示的数据', data);

                // return data
                this.face_data = data;

            },

            errorUpload(err, file, fileList) {
                // console.log(err, file, fileList);

                this.$alert('图片上传失败，请检查网络连接或联系管理员', '后端异常', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${action}`
                        });
                    }
                });
                // alert("图片上传失败，请检查网络连接或联系管理员")
            },


            filterNode(value, data) {
                if (!value) return true;

                console.log("value", value);
                console.log("data", data);
                console.log("data.label.indexOf(value) !== -1", data.label.indexOf(value) !== -1);

                return data.label.indexOf(value) !== -1;
            },


            //第一层
            json_convert_list(obj) {
                let data_list = [];
                Object.keys(obj).forEach(function (key) {
                    let data_map = {};
                    /**
                     * 设置label
                     */
                    data_map.label = key;
                    data_map.id = 1;
                    /**
                     * 设置children分为两种
                     */
                    if (typeof obj[key] === 'object') {
                        data_map.children = obj[key];
                    } else {
                        //设置children
                        data_map.children = [{label: obj[key]}];
                    }
                    // 组装
                    data_list.push(data_map)
                });
                return data_list;
            },


            //第二层，第三层，第四层。。。
            list_convert_list(data_list) {
                for (let j = 0, len = data_list.length; j < len; j++) {
                    let element = data_list[j];
                    if (Array.isArray(element.children)) {

                    } else {
                        element.children = this.json_convert_list(element.children)
                    }
                }
                return data_list;
            }
        }
    }
</script>


<style>
    #left {

        margin-top: 20px;
    }
</style>

