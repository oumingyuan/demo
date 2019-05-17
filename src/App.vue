<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router

        >
            <el-menu-item index="/">主页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">百度AI开放平台</template>
                <el-menu-item index="face">识别单个人脸</el-menu-item>
                <el-menu-item index="2-2">其他</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">Face++旷视</template>
                <el-menu-item index="example">代码示例</el-menu-item>
                <el-menu-item index="2-2">其他</el-menu-item>
            </el-submenu>
        </el-menu>

        <!--        <HelloWorld/>-->
        <router-view/>
<!--        <Face/>-->
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // import Face from './components/Face'

    export default {
        name: 'app',
        // components: {
        //     HelloWorld,
        //     Face
        // },

        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    /*#app {*/
    /*    font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*    -webkit-font-smoothing: antialiased;*/
    /*    -moz-osx-font-smoothing: grayscale;*/
    /*    text-align: center;*/
    /*    color: #2c3e50;*/
    /*    margin-top: 10px;*/
    /*}*/
</style>
