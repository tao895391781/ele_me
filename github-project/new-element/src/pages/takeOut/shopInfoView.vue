<template>
    <div class="shopsInfoView" :style='{background:bgc}'>
        <div class="filter" :style='{background:bgc}'></div>
            <header>
                <i class="iconfont" @click='goBack'>&#xe631;</i>
                <span>
                    <i class="iconfont">&#xe6b6;</i>
                    <i class="iconfont">&#xe60f;</i>
                    <i class="iconfont">&#xe676;</i>
                </span>
            </header>
            <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
        computed: {
            bgc() {
                return this.$store.state.bgColor;
            },
        },
        created() {},
        mounted() {},
    }
</script>
<style lang='scss'>
    .shopsInfoView {
        width: 100%;
        height: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        position: relative;
        //  -webkit-filter: blur(20px);
        //     filter: blur(20px);
        .filter {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            -webkit-filter: blur(20px);
            filter: blur(20px);
        }
        header {
            line-height: 2.5rem;
            height: 2.5rem;
            i {
                color: #fff;
                font-size: 1.5rem;
                padding: 0 .5rem;
            }
            &>i {
                float: left;
            }
            span {
                float: right;
            }
        }
    }
</style>