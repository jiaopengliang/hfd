<template>
    <div class="api-detail">
        <Header></Header>
        <div class="api-detail-wrapper">
            <div class="margin">
                <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                <el-breadcrumb-item :to="{ path: '/index' }"><span class="breadcrumb-font">首页</span></el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/api' }"><span  class="breadcrumb-font">产品</span></el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/api' }"><span class="breadcrumb-font">知识图谱API</span></el-breadcrumb-item>
                <el-breadcrumb-item><span class="basecolor">{{apiData.name}}</span></el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="6">
                    <div class="api-detail-l">
                        <img :src="apiImg" alt="" >
                    </div>
                </el-col>
                <el-col :span="18" class="api-detail-r">
                    <h2 class="api-detail-r-title" style="margin:10px 0 0">
                        {{apiData.name}}
                        <i><img v-if="apiData.type == 'api' " src="../assets/images/index/api.png" alt="" height="20px"><img v-if="apiData.type == 'h5' " src="../assets/images/index/h5.png" alt="" height="20px"></i>
                    </h2>
                    <div class="api-detail-r-content" style="margin-top:40px">
                        {{apiData.introduction}}
                    </div>
                    <div class="btn-wrapper">
                        <el-button v-if="apiData.introduction" style="width:120px" type="primary" @click="centerDialogVisible = true">联系我们</el-button>
                        <el-button v-if="apiData.introduction == ''" style="width:120px" type="info" disabled="" class="api-detail-r-btn2"><span style="font-size:16px">敬请期待</span><br><span  style="text-size-adjust:none;font-size:10px">2018-11-2上线</span></el-button>
                    </div>
                    <el-dialog
                        title="联系我们"
                        :visible.sync="centerDialogVisible"
                        width="300px"
                        center>
                        <span>
                            <span>联系电话：+86（21）38645741</span><br>
                            <span>联系邮箱：pub_hfd@pingan.com.cn</span>
                        </span>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="sendMail();centerDialogVisible = false">发邮件联系</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">稍后联系</el-button>
                        </span>
                    </el-dialog>
                </el-col>
            </el-row>
            <!-- 选项卡 -->
            <div class="api-detail-tab-switch">
                <span :class="apiMode==1?'active':''" @click="apiModeSwitch(1)">产品介绍</span>
                <span :class="apiMode==2?'active':''" @click="apiModeSwitch(2)">API详情</span>
                <!-- <span :class="apiMode==3?'active':''" @click="apiModeSwitch(3)">展示参照</span> -->
                <span :class="apiMode==4?'active':''" @click="apiModeSwitch(4)">错误码参照</span>
            </div>
            <div class="api-detail-tab-content">
                <div v-show="apiMode==1">
                    <h4>应用场景</h4>
                    <p v-for="(item,index) in apiData.scenario" :key="index">
                        {{item}}
                    </p>
                    <h4>计费方式</h4>
                    <p>
                        {{apiData.incharge}}
                    </p>
                    <h4>数据范围</h4>
                    <p>
                        {{apiData.range}}
                    </p>
                    <h4>数据更新频率</h4>
                    <p>
                        {{apiData.updatefrequency}}
                    </p>
                </div>
                <div v-show="apiMode==2">
                    <h4>接口地址<span>{{apiData.apiAddress}}</span></h4>
                    <h4>请求方式<span>{{apiData.requestType}}</span></h4>
                    <div class="request-example">
                        <h4 style="float:left">请求示例</h4>
                        <span>{{apiData.example}}</span>
                        <el-button @click="centerDialogVisible = true" style="float:right;background:#2698F3;color:#fff;border:0;margin-left:20px;margin-top:10px;width:150px;height:40px;margin-right:30px">申请专属APPKEY</el-button>
                    </div>
                    
                    <h4 style="text-indent:2em">备注<span>接口已经部署在平安云上，可通过ESG接口调用</span></h4>
                    <h4 class="title">QUERY请求参数</h4>
                    <span>公共请求参数</span>
                    <el-table
                    :data="apiData.commonRequest"
                    :header-cell-class-name="'api-detail-table-header'"
                    :cell-class-name="'api-detail-table-cell'"
                    style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="名称"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="required"
                            label="必填"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="value"
                            label="示例"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="describe"
                            label="描述"
                            >
                        </el-table-column>
                    </el-table>
                    <span v-if="apiData.businessRequest">业务请求参数</span>
                    <el-table
                    v-if="apiData.businessRequest"
                    :data="apiData.businessRequest"
                    :header-cell-class-name="'api-detail-table-header'"
                    :cell-class-name="'api-detail-table-cell'"
                    style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="名称"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="required"
                            label="必填"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="value"
                            label="示例"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="describe"
                            label="描述"
                            align="center"
                            >
                        </el-table-column>
                    </el-table>
                    <h4 v-if="apiData.feedbackData" class="title">返回参数</h4>
                    <el-table
                    v-if="apiData.feedbackData"
                    :data="apiData.feedbackData"
                    :header-cell-class-name="'api-detail-table-header'"
                    :cell-class-name="'api-detail-table-cell'"
                    style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="名称"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="required"
                            label="必填"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="value"
                            label="示例"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="describe"
                            label="描述"
                            align="center"
                            >
                        </el-table-column>
                    </el-table>
                    <span v-if="apiData.feedbackAdd">{{apiData.feedbackAdd.title}}</span>
                    
                    <el-table
                    v-if="apiData.feedbackAdd"
                    :data="apiData.feedbackAdd.data"
                    :header-cell-class-name="'api-detail-table-header'"
                    :cell-class-name="'api-detail-table-cell'"
                    style="width: 100%">
                        <el-table-column
                            prop="code"
                            label="编码"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="required"
                            label="必填"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="类型"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="describe"
                            label="描述"
                            align="center"
                            >
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div v-show="apiMode==3">
                    <h4>web</h4>
                    <img width="100%" src="../assets/images/index/web.png" alt="">
                    <h4>app</h4>
                    <img width="100%" src="../assets/images/index/app.png" alt="">
                </div> -->
                <div v-show="apiMode==4">
                    <h4>系统级错误码参照</h4>
                    <el-table
                    :data="codeStatus"
                    :header-cell-class-name="'api-detail-table-header'"
                    :cell-class-name="'api-detail-table-cell'"
                    style="width: 100%">
                        <el-table-column
                            prop="code"
                            label="错误码"
                            align="center"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="描述"
                            align="center"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            </div>
            
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import apiList from '../../public/data/apidata.json'
export default {
    name:"ApiDetail",
    mounted(){
        let id = this.$route.params.id
        this.apiData = apiList[id-1]
        this.apiImg = require("../assets/images/index/ICON3"+id+".png")
    },
    data(){
        return{
            centerDialogVisible: false,
            apiMode:1,
            apiData:"",
            apiImg:'',
            codeStatus:[{
                code:"0000",
                status:"正常"
            },{
                code:"0001",
                status:"调用WEBSP异常"
            },{
                code:"0026",
                status:"参数异常"
            },{
                code:"0027",
                status:"用户验证失败"
            },{
                code:"E05001",
                status:"未找到对应的交易对手信息"
            }]
 
        }
    },
    components:{
        Header,Footer
    },
    methods:{
        apiModeSwitch(i){
            this.apiMode = i;
        },
        sendMail(){
            window.location="mailto:pub_hfd@pingan.com.cn?"
        }
    }
}
</script>
<style>
.api-detail{
    background:url("../assets/images/index/apibg.png") no-repeat;
    background-size: 100%
}
.api-detail-wrapper{
    background: rgb(252,252,252)
}
.api-detail-wrapper .breadcrumb{
    padding: 30px 0
}
.api-detail-wrapper .breadcrumb .basecolor{
    color: #F36B26
}
.api-detail-wrapper .breadcrumb-font{
    color: #666;
    font-size: 14px;
}
.api-detail-wrapper .breadcrumb-font:hover{
    color: #F36B26
}
.api-detail-l{
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 2px #ddd;
}
.api-detail-l img{
    width: 60px;
}
.api-detail-r{
    height: 250px;
    text-align: left;
    padding-left: 25px;
    position: relative;
}
.api-detail-r-content{
    color: #666
}
.api-detail-r .btn-wrapper{
    position: absolute;
    bottom: 0;
}
.api-detail-r-btn2{
    
    padding: 5px 20px!important;
}
.api-detail-tab-switch{
    background: #F36B26;
    height:50px;
    display: flex;
    margin: 2vw 0
}

.api-detail-tab-switch span{
    color: #fff;
    padding: 0 3vw;
    height: 100%;
    font-size:20px;
    line-height: 50px;
    cursor: pointer;
}
.api-detail-tab-switch span.active{
    color: #F36B26;
    background: #fff
}
.api-detail-tab-content{
    text-align: left;
    padding-bottom: 80px;
    min-height: 400px;
}
.api-detail-tab-content h4{
    padding: 0 30px;
    margin: 10px 0;
}
.api-detail-tab-content h4.title::before{
    content: "";
    display: inline-block;
    width: 3px;
    background: #F36B26;
    height: 20px;
    vertical-align: middle;
    margin-right: 1em;
}
.api-detail-tab-content>div>span{
    display: block;
    margin: 10px 30px;
}
.api-detail-tab-content h4>span{
    margin-left: 30px;
    color: #666;
    font-weight: 400
}
.api-detail-tab-content p{
    padding: 0 30px;
    color: #666;
    margin: 0;
}
.api-detail-table-header{
    background-color:rgba(243, 107, 38, .2)!important;
    color: #333;
}
.api-detail-table-cell{
    border-bottom: 1px dashed #ebeef5!important
}
.api-detail .dialog-footer{
    display: flex;
    justify-content: space-around
}

.api-detail-tab-content .request-example{
    overflow: hidden;
}
.api-detail-tab-content .request-example>span{
    display: block;
    float: left;
    width: 600px;
    margin: 10px 0;
    word-wrap : break-word;
    word-break:break-all;
    color: #666;
}
</style>
