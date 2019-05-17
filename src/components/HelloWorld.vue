<template>

    <div>
        <el-upload
                action="http://localhost:8002/upload_file/"
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


        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="face_data"
                :props="defaultProps"
                :filter-node-method="filterNode"
                ref="tree2">
        </el-tree>


    </div>


</template>


<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,


                filterText: '',
                face_data: [{
                    id: 1,

                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1',
                            // children:['hello']
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }],
                    label: '一级 1',

                }],

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

                // noinspection JSUnresolvedVariable
                let result_map = response.result.face_list[0];

                console.log(result_map, file, fileList);

                let data = [{
                    label: '0',
                    children: this.convert(result_map)
                }];

                console.log(data);
                this.face_data = data;
            },

            errorUpload(err, file, fileList) {
                // console.log(err, file, fileList);

                this.$alert('图片上传失败，请检查网络连接或联系管理员', '后端异常', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
                // alert("图片上传失败，请检查网络连接或联系管理员")
            },


            convert(obj) {
                let data_list = [];
                Object.keys(obj).forEach(function (key) {
                    let data_map = {};
                    data_map.label = key;
                    if (typeof obj[key] === 'object') {
                        let object2 = obj[key];
                        let list2 = [];
                        Object.keys(object2).forEach(function (key2) {
                            let data_map2 = {};
                            data_map2.label = key2;
                            data_map2.children = [{label: object2[key2]}];
                            list2.push(data_map2)
                        });
                        data_map.children = list2;
                    } else {
                        data_map.children = [{label: obj[key]}];
                    }
                    data_list.push(data_map)
                });
                return data_list;
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },

        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
    }
</script>

