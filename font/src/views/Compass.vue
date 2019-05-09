<template>
    <div class="compass">
        <div :class="{'compass-logo':true,'compass-logo-change':changePosition}">
            <span class="blue">谱系罗盘</span>
        </div>
        <div :class="{'compass-search':true,'compass-search-change':changePosition}">
            <div class="search-box">
                <input type="text" name="" id="" placeholder="请输入系或公司名称">
                <button @click="btnClick">搜索</button>
            </div>
            <div class="historylist list-style" v-show="historyShow">
                <ul>
                    <li>
                        <span>小米科技有限公司</span>
                        <span>雷小米（董事）</span>
                    </li>
                    <li>
                        <span>小米科技有限公司</span>
                        <span>雷小米（董事）</span>
                    </li>
                </ul>
                <p><span style="cursor:pointer">删除历史</span></p>
            </div>
            <ul class="search-result list-style" v-show="searchListShow">
                <li>
                        <span>小米科技有限公司</span>
                        <span>雷小米（董事）</span>
                    </li>
                    <li>
                        <span>小米科技有限公司</span>
                        <span>雷小米（董事）</span>
                    </li>
            </ul>
        </div>
        <div class="compass-hotList" v-show="hotlistShow">
            <div class="compass-hotList-title">
                <img src="../assets/images/compass/fire.png" alt="" width="14px">
                <span style="margin-left:4px">热点搜索</span>
            </div>
            <div class="compass-hotList-content">
                <ul class="left">
                    <li>1.上海万达广场置业有限公司</li>
                    <li>2.上海万达广场置业有限公司</li>
                </ul>
                <ul class="righ">
                    <li>6.上海万达广场置业有限公司</li>
                    <li>7.上海万达广场置业有限公司</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"compass",
    data(){
        return{
            historyShow:false,
            searchListShow:false,
            changePosition:false,
            hotlistShow:true
        }
    },
    methods:{
        btnClick(){
            this.changePosition = true;
            this.hotlistShow = false
        }
    }
}
</script>

<style>
.compass .blue{
    color: #4D7CFE;
}
.compass ul,p{
    margin: 0;
    padding: 0;
}
.compass{
    position: relative;
    width: 960px;
    margin: 0 auto;
}
.compass-logo{
    width: 273px;
    height: 147px;
    background: url(../assets/images/compass/compass-logo.png) no-repeat;
    background-size: 100%;
    position: absolute;
    top: 117px;
    left: 0;
    right: 0;
    margin: auto;
}
.compass-logo span{
    font-family: PingFangSC-Medium;
    display: block;
    font-size: 36px;
    text-align: center;
    padding-top: 32px;
}
.compass-search{
    width: 706px;
    position: absolute;
    top: 272px;
    left: 0;
    right: 0;
    margin: auto;
}
.compass-search .search-box{
    display: flex;
    justify-content: center;
}
.compass-search input{
    width: 599px;
    height: 38px;
    text-indent: 2em;
    font-size: 14px;
    border: 1px solid #D8D8D8;
    border-right: 0;
    box-sizing:border-box;
}
.compass-search button{
    width: 105px;
    height: 38px;
    background: #4D7CFE;
    color: #FFF;
    border: 0;
    font-size: 14px;
    box-sizing:border-box;
    cursor: pointer;
    outline: none
}
.compass-search .list-style{
    width: 700px;
    position: absolute;
    top: 38px;
    left: 2px;
    text-align: left;
    font-size: 12px;
    line-height: 18px;
    background: #fff;
    box-shadow: 0 3px 3px #f0f0f0;
}
.compass-search .list-style li{
    cursor: pointer;
    padding: 4px 15px;
}
.compass-search .list-style li span{
    display: block;
}
.compass-search .historylist ul li{
    color: #8BA4FF;
}
.compass-search .list-style li:hover{
    background: #f0f0f0;
}
.compass-search .historylist p{
    background: #FAFAFA;
    text-align: right;
    padding-right: 20px;
    line-height: 26px;
}
/* 改变位置 */
.compass-logo-change{
    top: 51px;
    left: 0px;
    margin: 0;
    width: 196px;
    height: 106px;
    transition: .5s ease;
}
.compass-logo-change span{
    padding-top: 22px;
    font-size: 26px;
} 
.compass-search-change{
    top: 72px;
    left: 216px;
    transition: .5s ease;
}
.compass-hotList{
    width: 706px;
    margin: 0 auto;
    padding-top: 379px;
    text-align: left;
    display: flex;
    font-size: 14px;
}
.compass-hotList-title{
    color: #778CA2;
    margin-right: 34px;
}
.compass-hotList-content{
    display: flex;
}
.compass-hotList-content ul.left{
    margin-right: 130px;
}
.compass-hotList-content ul li{
    margin-bottom: 10px;
}
</style>
