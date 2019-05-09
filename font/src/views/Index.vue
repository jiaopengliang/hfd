<template>
<div class="index">
    <div class="index-banner">
        <div class="margin">
            <Header></Header>
            <img src="../assets/images/index/bg1.png" alt="">
            <ul>
                <li>万亿数据规模</li>
                <li>实时更新扩充</li>
                <li>前沿技术团队</li>
            </ul>
        </div>
    </div>
    <div class="main margin">
        <div class="introduce">
            <div class="title">图谱介绍</div>
            <el-row class="introduce-list" type="flex" justify="space-between">
                <el-col :span="6">
                    <div class="introduce-list-item">
                        <div class="img-wrapper">
                            <img src="../assets/images/index/pic_1.png" alt="">
                        </div>
                        <p>全面的知识图谱</p>
                        <span>
                            关联关系全面、准确，
                            集团、实际控制人、最终受益人等多应用视角的谱系展示
                        </span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="introduce-list-item">
                        <div class="img-wrapper">
                            <img src="../assets/images/index/pic_2.png" alt="">
                        </div>
                        <p>精确的风险传导模型</p>
                        <span>
                            直观展示系内成员的风险预警程度、感染路径、相关成员的违规概率预测
                        </span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="introduce-list-item">
                        <div class="img-wrapper">
                            <img src="../assets/images/index/pic_3.png" alt="">
                        </div>
                        <p>智能的系客户报告</p>
                            <span>
                                一键式生成谱系报告，多维度的智能图解及潜在风险分析，
                                智能报告一键式下载
                            </span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="introduce-list-item">
                        <div class="img-wrapper">
                            <img src="../assets/images/index/pic_4.png" alt="">
                        </div>
                        <p>快速的产品部署</p>
                            <span>
                                Web、H5、IOS、Android多平台支持，
                                API数据定制化服务
                            </span>
                    </div>
                </el-col>
            </el-row>

        </div>
        <div class="scenario">
            <div class="title">应用场景</div>
            <el-row class="scenario-list">
                <el-col :span="8" v-for="item in scenario" :key="item.id">
                    <div class="scenario-list-item">
                        <div class="img-wrapper">
                            <img :src="item.img" alt="">
                        </div>
                        <p>{{item.title}}</p>
                        <span>
                            {{item.detail}}
                        </span>
                    </div>
                </el-col>
               
            </el-row>
        </div>
        <div class="suggest">
            <div class="title">产品推荐 <span><router-link to="/api" tag="span" >更多 ></router-link></span></div>
            <el-row class="suggest-list" type="flex" justify="space-between">
                
                <el-col :span="6">
                    <router-link to="/apidetail/3" tag="div" class="suggest-list-item">
                        <div class="img-wrapper">
                        <img src="../assets/images/index/ICON1.png" alt="">
                        </div>
                        <span>查图谱</span>
                        <i>
                            <img src="../assets/images/index/h5.png" alt="">
                        </i>
                    </router-link>
                </el-col>
                
                <el-col :span="6">
                    <router-link to="/apidetail/4" tag="div" class="suggest-list-item">
                        <div class="img-wrapper">
                        <img src="../assets/images/index/ICON2.png" alt="">
                        </div>
                        <span>查关系</span>
                        <i>
                            <img src="../assets/images/index/h5.png" alt="">
                        </i>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/apidetail/5" tag="div" class="suggest-list-item">
                        <div class="img-wrapper">
                        <img src="../assets/images/index/ICON55.png" alt="">
                        </div>
                        <span>受益人、控制人</span>
                        <i>
                            <img src="../assets/images/index/api.png" alt="">
                        </i>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link to="/apidetail/1" tag="div" class="suggest-list-item">
                        <div class="img-wrapper">
                            <img src="../assets/images/index/ICON4.png" alt="">
                        </div>
                        <span>黑灰名单</span>
                        <i>
                            <img src="../assets/images/index/api.png" alt="">
                        </i>
                    </router-link>
                </el-col>
            </el-row>
        </div>

    </div>
    
    <Footer></Footer>
</div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    name:"index",
    components:{
        Header,Footer
    },
    data:function(){
        return{
            mouseoverX:100,
            mouseoverY:100,
            styleObj:{
                transform:''
            },
            scenario:[{
                id:1,
                img:require("../assets/images/index/icon_1.png"),
                title:"系客户识别",
                detail:"通过企业关系和隐性关系识别系内成员，并对系客户进行多维度分析"
            },{
                id:2,
                img:require("../assets/images/index/icon_2.png"),
                title:"并购审查",
                detail:"满足监管，财务准则对并购审查的要求"
            },{
                id:3,
                img:require("../assets/images/index/icon_3.png"),
                title:"合同增信",
                detail:"借助智能合同引擎，为集团客户和单一客户差异化输出对应合同模板"
            },{
                id:4,
                img:require("../assets/images/index/icon_4.png"),
                title:"集中度管理",
                detail:"动态掌握大客户限额，风险资金集中度变动"
            },{
                id:5,
                img:require("../assets/images/index/icon_5.png"),
                title:"违约传导",
                detail:"基于违约客户，预测对应成员的感染概率"
            },{
                id:6,
                img:require("../assets/images/index/icon_6.png"),
                title:"资产处置策略",
                detail:"系客户中寻找可增信主体及排查风险资产"
            }
            ]
            
        }
    }
}
</script>
<style>
    .margin{width: 70vw;margin: 0 auto;min-width: 900px;max-width: 1100px;}
    .index{
        background: #000;
        font-family: PingFangSC-Medium;
        min-width: 800px;
    }
    .index-banner{
        height: 51vw;
        background: url('../assets/images/index/banner.png') no-repeat center;
        background-size: 100%;
        overflow: hidden;
    }
    .index-banner .margin{
        position: relative;
        height: 100%;
    }
    .index-banner .margin>img{
        /* position: absolute; */
        margin: 0 auto;
        max-width: 100%;
        max-height: 45vw;
        z-index: 0;
    }

    .index-banner ul{
        width: 100%;
        height: 100%;
        /* position: relative; */
    }
    .index-banner ul li{
        position: absolute;
        font-size: 2.1vw;
        color: #fff;
        user-select: none;
    }
    .index-banner ul li:hover{
        transform: scale(1.4);
        transition: all 0.5s;
    }
    .index-banner ul li:nth-child(1){
        font-size: 2.5vw;
        top: 8vw;
        right: 10vw
    }
    .index-banner ul li:nth-child(2){
        top: 35vw;
        left: 8vw
    }
     .index-banner ul li:nth-child(3){
        font-size: 1.5vw;
        top: 35vw;
        right: 8vw
    }

    .index .main .title{
        font-size: 30px;
        color: #FFFFFF;
        text-align: left;
        padding-top: 43px;
        margin-bottom: 10px;
    }
    .index .main{text-align: left}
    .index .main p{
        font-size: 24px;
        color: #FFFFFF;
    }
    .index .introduce-list p{
        text-align: left;
        overflow: hidden;
        white-space : nowrap;
    }
    .index .introduce-list-item{
        width: 95%;
        max-width: 250px;
    }
    .index .introduce-list-item .img-wrapper{
        width: 16vw;
        max-width: 250px;
        min-width: 130px;
        height: 16vw;
        min-height: 130px;
        max-height: 250px;
        background: url("../assets/images/index/bg-wrapper1.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .index .introduce-list-item .img-wrapper img{
        height: 60%;
    } 
    .index .introduce-list-item:hover .img-wrapper img{
        animation: movein-left .6s ease-out;
    }
    @keyframes movein-left{
        0%{transform: translateX(-10vw) }
        100%{transform: translateX(0px) }
    }
    .index .introduce-list-item span{
        font-size: 13px;
        color: #FFFFFF;
        width: 16vw;
        max-width: 250px;
        min-width: 130px;
        text-align: left;
        display: block;
    }
    .index .scenario-list{
        text-align: center;
    }
    .index .scenario-list-item{
        width: 9.5vw;
        min-width: 100px;
        height: 15vw;
        max-height: 200px;
        margin:0 auto;
        padding: 20px 60px;
        display: flex;
        flex-direction: column;
        justify-content: center
    }
    .index .scenario-list-item:hover{
        background: rgba(68,190,255, .1);
        border-radius: 4px;
        box-shadow: 0 0 3px #44BEFF;
    }
    .index .scenario-list-item:hover span{
        display: inline
    }
    .index .scenario-list-item .img-wrapper{
        width: 100%;
        height: 7vw;
        min-height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .index .scenario-list-item .img-wrapper img{
        height: 4vw;
        max-height: 60px;
    }
    .index .scenario-list-item:hover .img-wrapper img{
        transform: scale(1.1);
        animation: fliping .5s ease;
    }

    @keyframes fliping{
        0%{transform:perspective(400px) rotateY(0);animation-timing-function:ease-out;}
        50%{transform:perspective(400px) translateZ(150px) rotateY(190deg) scale(1);animation-timing-function:ease-in;}
        100%{transform:perspective(400px) scale(1.1);animation-timing-function:ease-in;}
    }
    .index .scenario-list p{
        font-size: 24px;
        margin: 10px 0;
        color: #FFFFFF;
        letter-spacing: -1.01px;
    }
    .index .scenario-list span{
        font-size: .8vw;
        color: #fff;
        display: none
    }
    .index .suggest{
        margin-bottom: 150px;
    }
    .index .suggest .title{
        display: flex;
        justify-content: space-between
    }
    .index .suggest .title>span{
        font-size: 18px;
        line-height: 4vw;
        color: #FFFFFF;
        margin-right: 2vw;
        cursor: pointer
    }
    .index .suggest-list-item{
        width: 16vw;
        min-width: 130px;
        max-width: 250px;
        height: 16vw;
        min-height: 130px;
        max-height: 250px;
        background: url('../assets/images/index/bg.png') no-repeat;
        background-size: 100%;
        text-align: center;
        position: relative;
        cursor: pointer
    }
    .index .suggest-list-item .img-wrapper{
        display: flex;
        width: 100%;
        height: 60%;
        padding-top: 15%;
        justify-content: center;
        align-items: center;
    }
    .index .suggest-list-item .img-wrapper img{
        height: 4.2vw;
        min-height: 40px;
        max-height: 60px;
    }
    .index .suggest-list-item:hover .img-wrapper img{
        transform: scale(1.3);
        animation: expanding .3s ease;
    }
    .index .suggest-list-item i{
        position: absolute;
        top: .5vw;
        right: .5vw
    }
    .index .suggest-list-item i img{
        width: 4.1vw;
        max-width: 50px;
    }
    .index .suggest-list-item span{
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: -0.87px;
        margin-top: 30px;
    }
</style>
