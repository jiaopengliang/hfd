<template>
    <div class="compass-detail">
        <div class="compass-margin">
            <aside>
                <router-link to="/compass" tag="h1" class="aside-title blue">谱系罗盘</router-link>
                <div class="aside-xi">
                    <img v-if="xiType == 'company'" src="../assets/images/compass/company.png" alt="">
                    <img v-if="xiType == 'person' " src="../assets/images/compass/person.png" alt="">
                    <p style="font-size:">上海万达置业有限公司</p>
                </div>
                <ul class="switch-tab">
                    <li :class="tabNumber == 1 ? 'active':''" @click="tabNumber = 1">
                        <img v-show="tabNumber != 1" src="../assets/images/compass/aside01.png" alt="">
                        <img v-show="tabNumber == 1" src="../assets/images/compass/aside11.png" alt="">
                        <span>系客户成员</span>
                    </li>
                    <li :class="tabNumber == 2 ? 'active':''" @click="tabNumber = 2">
                        <img v-show="tabNumber != 2" src="../assets/images/compass/aside02.png" alt="">
                        <img v-show="tabNumber == 2" src="../assets/images/compass/aside12.png" alt="">
                        <span>最终受益人深度剖析</span>
                    </li>
                    <li :class="tabNumber == 3 ? 'active':''" @click="tabNumber = 3">
                        <img v-show="tabNumber != 3" src="../assets/images/compass/aside03.png" alt="">
                        <img v-show="tabNumber == 3" src="../assets/images/compass/aside13.png" alt="">
                        <span>实际受益人深度剖析</span>
                    </li>
                    <li :class="tabNumber == 4 ? 'active':''" @click="tabNumber = 4">
                        <img v-show="tabNumber != 4" src="../assets/images/compass/aside04.png" alt="">
                        <img v-show="tabNumber == 4" src="../assets/images/compass/aside14.png" alt="">
                        <span>区域视图</span>
                    </li>
                    <li :class="tabNumber == 5 ? 'active':''" @click="tabNumber = 5">
                        <img v-show="tabNumber != 5" src="../assets/images/compass/aside05.png" alt="">
                        <img v-show="tabNumber == 5" src="../assets/images/compass/aside15.png" alt="">
                        <span>行业视图</span>
                    </li>
                    <li :class="tabNumber == 6 ? 'active':''" @click="tabNumber = 6">
                        <img v-show="tabNumber != 6" src="../assets/images/compass/aside06.png" alt="">
                        <img v-show="tabNumber == 6" src="../assets/images/compass/aside16.png" alt="">
                        <span>负面舆论</span>
                    </li>
                    <li :class="tabNumber == 7 ? 'active':''" @click="tabNumber = 7">
                        <img v-show="tabNumber != 7" src="../assets/images/compass/aside07.png" alt="">
                        <img v-show="tabNumber == 7" src="../assets/images/compass/aside17.png" alt="">
                        <span>风险事件传导</span>
                    </li>
                    <li :class="tabNumber == 8 ? 'active':''" @click="tabNumber = 8">
                        <img v-show="tabNumber != 8" src="../assets/images/compass/aside08.png" alt="">
                        <img v-show="tabNumber == 8" src="../assets/images/compass/aside18.png" alt="">
                        <span>谱系报告</span>
                    </li>
                </ul>
            </aside>
            <div class="compass-detail-right">
                <div class="search-box">
                    <img src="../assets/images/compass/search.png" alt="">
                    <input type="text" placeholder="请输入系或公司名称">
                </div>
                <div class="switch-content">
                    <div v-show="tabNumber == 1" class="content1">
                        <ul class="content1-top">
                            <li>
                                <img src="../assets/images/compass/icon11.png" alt="">
                                <div>
                                    <p>560家</p>
                                    <span>系客户成员</span>
                                </div>
                                <div>
                                    <p>50家</p>
                                    <span>上市公司</span>
                                </div>
                            </li>
                            <li>
                                <img src="../assets/images/compass/icon12.png" alt="">
                                <div>
                                    <p>1000条</p>
                                    <span>股权关系数</span>
                                </div>
                                <div>
                                    <p>200条</p>
                                    <span>增信关系数</span>
                                </div>
                                <div>
                                    <p>100条</p>
                                    <span>隐形关系数</span>
                                </div>
                            </li>
                            <li>
                                <img src="../assets/images/compass/icon13.png" alt="">
                                <div>
                                    <p>5年</p>
                                    <span>系客户成员成立平均年限</span>
                                </div>
                            </li>
                        </ul>
                        <div class="content1-filter">
                            <div class="content1-filter-title">
                                <p>注册资本（万元）：</p>
                                <p>成立日期：</p>
                            </div>
                            <div class="content1-filter-box">
                                <div class="choose-money">
                                    <span>￥</span>
                                    <input type="text">
                                    <span style="margin-right:10px;color:#000">~</span>
                                    <span>￥</span>
                                    <input type="text">
                                    <img src="../assets/images/compass/reset.png" alt="" width="12px">
                                </div>
                                <div class="choose-date">
                                    <el-date-picker
                                        v-model="pickDate"
                                        type="daterange"
                                        range-separator="~"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间">
                                    </el-date-picker>
                                </div>
                            </div>
                            <button class="btn-style">筛选</button>
                        </div>
                        <div class="content1-table">
                            <button class="btn-style">系客户成员下载</button>
                            <el-table
                            :data="content1Table"
                            :header-cell-class-name="'content-table-header'"
                            style="width: 100%">
                                <el-table-column
                                    type="index"
                                    label="序号"
                                    width="80px"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="type"
                                    label="角色分类"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                    label="企业名称"
                                    width="250px"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="money"
                                    label="注册资本"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="date"
                                    label="成立日期"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="person"
                                    label="法定代表人"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="status"
                                    label="经营状态"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="btn"
                                    label="btn"
                                    >
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="content-page">
                            <!-- 分页 -->
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="30">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-show="tabNumber == 2" class="content2">
                        <div class="content2-discip">
                            最终受益人为<b>李小健</b>，与3家实际控制人(新希望集团有限公司、四川新希望六和股份有限公司、上海希望化工投资有限公司)存在任职关系，与1家实际控制人(拉萨经济技术开发区新希望投资有限公司)存在投资关系
                        </div>
                        <h4 class="title">对外投资信息</h4>
                        <el-table
                        :data="content2Table1"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="100px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="企业名称"
                                width="250px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="percent"
                                label="持股比例"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="regCapital"
                                label="注册资本"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="conCapital"
                                label="出资额"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="currency"
                                label="出资额币种"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="经营状态"
                                >
                            </el-table-column>
                        </el-table>
                        <div class="content-page">
                        <!-- 分页 -->
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="30">
                        </el-pagination>
                        </div>
                        <h4 class="title">对外任职</h4>
                        <el-table
                        :data="content2Table2"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="200px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="企业名称"
                                width="300px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="duty"
                                label="职务"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="经营状态"
                                >
                            </el-table-column>
                        </el-table>
                        <div class="content-page">
                        <!-- 分页 -->
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="30">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-show="tabNumber == 3" class="content3">
                        <ul class="content3-top">
                            <li>新希望集团有限公司</li>
                            <li class="active">拉萨经济技术开发区新希望投资有限公司</li>
                            <li>新希望集团有限公司</li>
                        </ul>
                        <h4 class="title">照面信息(成立4年)</h4>
                        <div class="content3-descrip">
                            <el-form ref="form" label-width="150px">
                                <el-form-item label="统一社会信用码：">915400913976871106</el-form-item>
                                <el-form-item label="公司类型：">有限责任功</el-form-item>
                                <el-form-item label="注册资本：">915400913976871106</el-form-item>
                                <el-form-item label="营业期限自：">915400913976871106</el-form-item>
                                <el-form-item label="登记机关：">915400913976871106</el-form-item>
                                <el-form-item label="登记状态：">915400913976871106</el-form-item>
                                <el-form-item label="经营范围：">915400913976871106</el-form-item>
                            </el-form>
                            <el-form ref="form" label-width="150px">
                                <el-form-item label="企业名称：">915400913976871106</el-form-item>
                                <el-form-item label="法定代表人：">915400913976871106</el-form-item>
                                <el-form-item label="成立日期：">915400913976871106</el-form-item>
                                <el-form-item label="营业期限至：">915400913976871106</el-form-item>
                                <el-form-item label="核准日期：">915400913976871106</el-form-item>
                                <el-form-item label="住所：">915400913976871106</el-form-item>
                            </el-form>
                        </div>
                        <h4 class="title">主要人员信息</h4>
                        <el-table
                        :data="content3Table1"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="200px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="duty"
                                label="职务"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="经营状态"
                                >
                            </el-table-column>
                        </el-table>
                        <div class="content-page">
                        <!-- 分页 -->
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="30">
                            </el-pagination>
                        </div>
                        <h4 class="title">股东及出资信息</h4>
                        <el-table
                        :data="content3Table2"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="200px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="holder"
                                label="股东"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="percent"
                                label="持股比例"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="capital"
                                label="认缴出资额"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="currency"
                                label="币种"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="认缴出资日期"
                                >
                            </el-table-column>
                        </el-table>
                        <div class="content-page">
                        <!-- 分页 -->
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="30">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-show="tabNumber == 4" class="content4">
                        <h4 class="title">区域分布图</h4>
                        <div class="content4-map" style="background:#fff">
                            <!-- <p>系客户成员区域分布地图</p> -->
                            <div id="chinaMap" :style="{width: '1000px', height: '380px'}"></div>
                        </div>
                        <h4 class="title">区域分列表</h4>
                        <el-table
                        :data="content4Table1"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                prop="project"
                                label="项目"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="place"
                                label="分布区域"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="成员数"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="percent"
                                label="集中度"
                                >
                            </el-table-column>
                        </el-table>
                        <h4 class="title">大区域分列表</h4>
                        <el-table
                        :data="content4Table2"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="200px"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="place"
                                label="区域名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="成员数"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="percent"
                                label="集中度"
                                >
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-show="tabNumber == 5" class="content5">
                        <h4 class="title">行业集中度</h4>
                        <div style="background:#fff">
                            <!-- <p>行业集中度图表</p> -->
                            <div id="content5-charts1" :style="{width: '1000px', height: '320px'}"></div>
                        </div>
                        <h4 class="title">前五大行业分布</h4>
                        <div style="background:#fff">
                            <div id="content5-charts2" :style="{width: '1000px', height: '320px'}"></div>
                        </div>
                        <h4 class="title">行业分布趋势</h4>
                        <div style="background:#fff">
                            <div id="content5-charts3" :style="{width: '1000px', height: '320px'}"></div>
                        </div>
                    </div>
                    <div v-show="tabNumber == 6" class="content6">
                        <h4 class="title">股东及出资信息</h4>
                    </div>
                    <div v-show="tabNumber == 7" class="content7">
                        <h4 class="title">股东及出资信息</h4>
                    </div>
                    <div v-show="tabNumber == 8" class="content8">
                        <h4 class="title">报告内容</h4>
                        <el-table
                        :data="content8Table1"
                        :header-cell-class-name="'content-table-header'"
                        style="width: 100%">
                            <el-table-column
                                prop="view"
                                label="系客户知识图谱"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="DNA"
                                label="系客户DNA剖析"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="risk"
                                label="系客户风险事件"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="negative"
                                label="系客户负面舆情"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="conduction"
                                label="系客户风险事件传导"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="comment"
                                label="系客户评价"
                                >
                            </el-table-column>
                        </el-table>
                        <div class="content8-btn">
                            <button class="btn-style" @click="downloadReport">下载报告</button>
                        </div>
                        <!-- 提示框             -->
                        <el-dialog
                            title="提示"
                            :visible.sync="centerDialogVisible"
                            width="400px"
                            center>
                            <span>您今日下载报告次数过多，暂时不能执行次操作！</span>
                            <span slot="footer" class="dialog-footer">
                                <button class="btn-style" style="width:150px;font-size:14px" @click="centerDialogVisible = false">确 定</button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'echarts/map/js/china.js'

export default {
    name:'CompassDetail',
    data(){
        return{
            xiType:'company',
            tabNumber:1,
            pickDate:'',
            centerDialogVisible:false,
            content1Table:[{
                type:"龙头企业",
                name:"新希望集团有限公司",
                money:"80，000万元",
                date:"1997-01-09",
                person:"李小建",
                status:"存续"

            },{
                type:"龙头企业",
                name:"新希望集团有限公司",
                money:"80，000万元",
                date:"1997-01-09",
                person:"李小建",
                status:"存续"

            }],
            content2Table1:[{
                name:"新希望集团有限公司",
                percent:"99.00%",
                regCapital:"8，000万元",
                conCapital:"10,000万元",
                currency:"人民币",
                status:"存续"

            }],
            content2Table2:[{
                name:"新希望集团有限公司",
                duty:"董事长、总经理",
                status:"存续"

            }],
            content3Table1:[{
                name:"李小建",
                duty:"董事长、总经理",
                status:"存续"

            }],
            content3Table2:[{
                holder:"李小建",
                percent:"62.34%",
                capital:"10,000万元",
                currency:"人民币",
                date:"2018-01-09"
            }],
            content4Table1:[{
                project:"成员集中度最高省份",
                place:"海南省，北京市",
                number:"10",
                percent:"20.00%",
            }],
            content4Table2:[{
                place:"华南",
                number:"10",
                percent:"20.00%",
            }],
            content8Table1:[{
                view:"全景视图",
                DNA:"最终受益人",
                risk:"风险事件精确提取",
                negative:"舆情热刺",
                conduction:"风险事件传导图",
                comment:"风险处置建议"
            }],
        }
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let chinaMap = this.$echarts.init(document.getElementById('chinaMap'));
            let con5Charts1 = this.$echarts.init(document.getElementById('content5-charts1'));
            let con5Charts2 = this.$echarts.init(document.getElementById('content5-charts2'));
            let con5Charts3 = this.$echarts.init(document.getElementById('content5-charts3'))
            
            // 绘制图表
            chinaMap.setOption({
                title: { 
                    text: '系客户成员区域分布',
                    textStyle:{
                        fontSize:14,
                        fontWeight:400
                    },
                    padding:[26,40]
                },
                visualMap: {
                    min: 0,
                    max: 2500,
                    left: 'right',
                    top: 'bottom',
                    text:['高','低'],
                    inRange: {
                        color: ['#C9D7FF', '#5180FF ']
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>该区域成员数：{c}',
                    extraCssText:'text-align:center'
                },
                series: [{
                    name:"",
                    type: 'map',
                    map:'china',
                    itemStyle:{
                        normal:{label:{show:false}},
                        emphasis:{label:{show:true}}
                    },
                    data: [
                        {name: '北京',value: 1000},
                        {name: '四川',value: 1500},
                    ]
                }]
            });

            con5Charts1.setOption({
                color:['#89C5FF','#F8BAFF'],
                legend: {
                    selectedMode:false,
                    data: ['成员数', '集中度'],
                    align: 'left',
                    icon: "circle",
                    right: 10,
                    top:20,
                    itemWidth:8,
                    itemHeight:8,
                },
                xAxis: [{
                    type: 'category',
                    axisLine:{show:false},
                    axisTick: {show: false},
                    data: ['单一最大行业', '前五大行业', '全行业'],
                    axisLabel:{textStyle: {fontSize: 14}}
                },{
                    type: 'category',
                    axisLine:{show:false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                    splitArea: {show: false},
                    splitLine: {show: false},
                    data: ['单一最大行业', '前五大行业', '全行业']
                }],
                yAxis: [{show:false,name: '成员数',max:800,type:'value'},{show:false,name: '集中度',max:100,type:'value'}],
                series: [{
                    barWidth:18,
                    type: 'bar',
                    yAxisIndex:0,
                    xAxisIndex:1,
                    zlevel: 1,
                    itemStyle: {normal: {color: 'rgba(0,0,0,0.05)'}},
                    data: [800,800,800],
                    animation: false
                },{
                    barWidth:18,
                    type: 'bar',
                    yAxisIndex:1,
                    xAxisIndex:1,
                    zlevel: 1,
                    barGap:'170%',
                    itemStyle: {normal: {color: 'rgba(0,0,0,0.05)'}},
                    data: [100,100,100],
                    animation: false
                },{
                    barWidth:18,
                    yAxisIndex:0,
                    zlevel: 2,
                    name: '成员数',
                    type: 'bar',
                    label: {normal: {show: true,position: 'top'}},
                    data: [80, 500, 800]
                },{
                    barWidth:18,
                    name: '集中度',
                    yAxisIndex:1,
                    zlevel: 2,
                    type: 'bar',
                    barGap:'170%',
                    label: {normal: {show: true,position: 'top',formatter: '{c}%'}},
                    data: [10.0, 62.50, 100.00]
                }]
            })

            con5Charts2.setOption({
                title:{
                    text:"系前五大行业(客户量)"
                },
                series:[{
                    
                }]
            })


        },
        downloadReport(){
            this.centerDialogVisible = true
        }
    },
    mounted(){
        this.drawLine()
    }
}
</script>

<style>
.compass-detail{
    background: #F8FAFB ;
    width: 100%;
    min-height: 100%;
    font-size: 14px;
}
/* 设置字体、按钮默认样式 */
.compass-detail .blue{
    color: #4D7CFE
}
.compass-detail .btn-style{
    border: none;
    background: #4D7CFE;
    color: #fff;
    padding: 7px 12px;
    border-radius: 4px;
}
.compass-detail .btn-style:hover{
    cursor: pointer
}
.compass-detail ul{
    padding: 0;
    margin: 0;
}
.compass-margin{
    width: 1366px;
    margin: 0 auto;
    display: flex;
}
/* 左侧侧边栏 */
.compass-detail aside{
    width: 242px;
    height: 750px;
    overflow: hidden;
    border: 1px solid #E3E3E3;
    border-top:none;
    color: #778CA2;
}
.compass-detail .aside-title{
    margin: 0;
    padding:24px 0 15px;
    font-size: 18px;
    background: #fff;
    cursor: pointer;
}
.compass-detail .aside-xi{
    padding: 35px 0 14px;
}
.compass-detail .aside-xi>img{
    width: 66px;
    margin-bottom: 7px;
}
.compass-detail aside>ul{
    background: #fff;
    text-align: left;
    padding: 18px 0 50px
}
.compass-detail aside>ul>li{
    height: 44px;
    line-height: 44px;
    padding-left: 25px;
    margin: 14px 0;
    cursor: pointer;
    position: relative;
}
.compass-detail aside>ul>li.active{
    background: #F8FAFB;
    color: #252631
}
.compass-detail aside>ul>li:hover{
    background: #F8FAFB;
    color: #252631
}
.compass-detail aside>ul>li.active::before{
    content: "";
    display:inline-block;
    width: 2px;
    height: 100%;
    background: #4D7CFE;
    position: absolute;
    top: 0;
    left: 0
}
.compass-detail aside>ul>li>img{
    width: 17px; 
    margin-right: 20px;
    vertical-align: middle;
}
/* 右侧样式 */
.compass-detail-right .search-box{
    width: 1124px;
    height: 64px;
    border-bottom: 1px solid #E3E3E3;
    border-right: 1px solid #E3E3E3;
    background: #fff;
    text-align: left;
    line-height: 64px;
}
.compass-detail-right .search-box img{
    width: 16px;
    vertical-align: middle;
    margin: 0 20px 0 69px;
}
.compass-detail-right .search-box input{
    border: none;
    color: #778CA2;
    outline: none;
    width: 500px;
    height: 30px;
    font-size: 14px;
}
.compass-detail-right .search-box input::placeholder{
    color: #778CA2;
}
.compass-detail-right .switch-content{
    padding: 20px;
    padding-bottom: 50px;
    width: 1084px;
    text-align: left
}
.compass-detail-right .switch-content .title{
    font-size: 16px;
    color: #778CA2;
    line-height: 22px;
    padding: 14px 0;
    margin: 0;
}
.compass-detail-right ul.content1-top{
    display: flex;
    text-align: left;
    justify-content: space-between
}
.compass-detail-right ul.content1-top>li{
    background: #fff;
    width: 350px;
    height: 100px;
    display: flex;
    align-items: center;
    transition: .5s ease;
}
.compass-detail-right ul.content1-top>li:hover{
    box-shadow: 0 2px 4px #ddd;
}
.compass-detail-right ul.content1-top>li>img{
    width: 53px;
    height: 53px;
    margin-left: 35px;
}
.compass-detail-right ul.content1-top>li p{
    font-size: 16px;
    line-height: 28px;
    font-weight: 600;
}
.compass-detail-right ul.content1-top>li span{
    color:#98A9BC;
}
.compass-detail-right ul.content1-top>li:nth-child(1)>div{
    margin-left: 30px;
    margin-right: 20px;
}
.compass-detail-right ul.content1-top>li:nth-child(2)>div{
    margin-left: 12px;
}
.compass-detail-right ul.content1-top>li:nth-child(3)>div{
    margin-left: 30px;
}

.compass-detail-right .content1-filter{
    display: flex;
    margin-top: 12px;
}
.compass-detail-right .content1-filter-title{
    width: 160px;
    text-align: right;
    margin-right: 15px;
}
.compass-detail-right .content1-filter-title p{
    line-height: 40px;
}
.compass-detail-right .content1-filter-title p:first-child{
    margin-bottom: 5px;
}
.compass-detail-right .content1-filter .choose-money{
    width: 328px;
    height: 32px;
    padding: 3px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    color: #778CA2;
    line-height: 32px;
    margin-bottom: 5px;
}
.compass-detail-right .content1-filter .choose-money input{
    height: 26px;
    border: none;
    text-indent: 10px;
    outline: none
}
.compass-detail-right .content1-filter button{
    margin-top: 30px;
    margin-left: 40px;
    height: 32px;
    width: 85px;
    font-size: 14px;
}

.compass-detail-right .content1-table{
    text-align: left;
    margin-top: 12px;
    background: #fff;
    position: relative;
}
/* 设置表头背景 */
.compass-detail-right .content-table-header{
    background: #eeeff0;
    color: #000;
    font-weight: 400;
}
.compass-detail-right .content1-table button{
    position: absolute;
    right: 30px;
    top: 8px;
    z-index: 100;
}
/* 分页样式 */
.compass-detail-right .content-page{
    background: #fff;
    padding: 40px 0 60px;
    text-align: center;
}
.compass-detail-right .content-page .el-pager li.active{
    background: #4D7CFE!important;
}
.compass-detail-right .content-page .el-pager li.active:hover{
    color: #fff!important;
}
.compass-detail-right .content-page .el-pager li:hover{
    color: #4D7CFE!important;
}
.compass-detail-right .content2-discip{
    padding: 13px 17px;
    background: #fff;
    color: #98A9BC;
}
.compass-detail-right ul.content3-top{
    overflow: hidden;
    margin-bottom: 6px;
}
.compass-detail-right ul.content3-top li{
    float: left;
    background: #fff;
    border: 1px solid #E8ECEF;
    border-radius: 4px;
    width: 108px;
    height: 40px;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
}
.compass-detail-right ul.content3-top li.active{
    color: #4D7CFE;
    border: 1px solid #678FFE;
    background: rgb(234,240,251)
}
.compass-detail-right .content3-descrip{
    background: #fff;
    display: flex;
    padding: 15px 0 20px;
}
.compass-detail-right .content3-descrip .el-form:nth-child(2){
    margin-left: 150px;
}
.compass-detail-right .content3-descrip .el-form-item{
    margin: 0!important;
    height: 30px!important;
}
.compass-detail-right .content3-descrip .el-form-item__label{
    color: #2c3e50!important;
    height: 30px!important;
}





.compass-detail-right .content8-btn{
    text-align: center;
    padding-top: 100px;
}
.compass-detail-right .content8-btn button{
    width: 200px;
    font-size: 14px;
};

</style>

