<template>
  <div class="home-wrapper">
    <div class="boxLoading" v-show="graphLoading"></div>
    <div class="hotspot-follow" v-show="hotspotFollw&&!isReferenced" @click.capture="colseTips">
      <ul class="hotspot-left">
        <li v-for="(hotList,index) in HotspotList" v-if='index<10' :key="hotList.id" v-bind:title="hotList.name" @click="graphHotClickEvent(hotList)">
          <span>{{index+1}}.</span>
          {{hotList.companyName}}
        </li>
      </ul>
      <ul class="hotspot-right">
        <li v-for="(hotList,index) in HotspotList" v-if='index>9' :key="hotList.id" v-bind:title="hotList.name" @click="graphHotClickEvent(hotList)">
          <span>{{index+1}}.</span>
          {{hotList.companyName}}
        </li>
      </ul>
    </div>
    <div id="graph-wrapper" :class="{'graph-wrapper':fullscreen}"></div>
    <div class="select-view" v-show="graphView">
      <el-select ref="mySelect" v-model="views" placeholder="请选择视角" @change="selectView">
        <el-option v-for="i in Viewoption" v-show="i.show" :key="i.views" :label="i.label" :value="i.views">
        </el-option>
      </el-select>
    </div>
    <div class="graph-stop unselectable" v-show="graphStop" @click="graphUp">
      <span>一键收起</span>
    </div>
    <transition name="fade">
      <div class="important-hints unselectable" v-show="importantHints">
        <p>【重要提示】该谱系存在
          <span>失信被执行人！</span>
        </p>
      </div>
    </transition>
    <transition name="fade">
      <div class="important-overtime unselectable" v-show="apiOvertime">
        <p>【重要提示】接口数据请求异常
          <span>请刷新页面重新访问！</span>
        </p>
      </div>
    </transition>
    <div v-show="graphView">
      <el-button v-show="downloadShow" type="info" disabled class="home-downloadData">
        <div class="home-downloadData-wrapper">
          <img src="../assets/images/download.png" alt="" width="20px" style="margin-right:10px">
          <span style="font-size: 9px !important;">数据下载<br>
            <span style="text-size-adjust:none;font-size:6px;">(近期上线)</span>
          </span>
        </div>
      </el-button>
    </div>
    <div class="select-path" v-show="selectPath">
      <el-select v-model="number" placeholder="请选择路径" @change="selectCheck">
        <el-option v-for="item in options" :key="item.number" :label="item.label" :value="item.number">
        </el-option>
      </el-select>
    </div>
    <div class="admin" v-show="!isReferenced">
       <img src="../assets/images/avatar.png" alt="" @click="adminShow()">
      <div class="admin-conter u-tri" v-show="showAdmin" @click.stop="showAdmin = true">
        <div class="admin-title">
          <span>{{userInfo.name}}</span>
          <p @click="userCompany(userInfo)" style="cursor: pointer;">{{userInfo.company}}</p>
        </div>
        <div class="admin-tel">
          <el-button type="text" @click="contactUs" style="color:#333;font-sizi:12px;">
            <img src="../assets/images/contact.png" alt="" class="admin-tel-img"> 联系我们
          </el-button>
        </div>
        <el-dialog title="联系我们" :visible.sync="centerDialogVisible" width="400px" custom-class="contact-us" center append-to-body>
          <span>
            <span class="hfd-group">“好风度图谱”</span>是一款立足于图谱链条与风险防控的创新视角，利用人工智能、图计算、大数据及云计算等技术构建企业知识图谱，协助金融机构和地方政府更清晰、全面、科学的管控投融资风险、防范金融犯罪、前置合规审查、保障资产安全的智能化产品。</span>
          <br>
          <span style="margin-top:10px;display:block;padding-bottom:18px">您对我们的产品有任何建议，可以通过当前页面反馈给我们，也可以直接联系我们的业务负责人陈巩<br>邮箱：
            <span style="color: #FF9E4C;">CHENGONG147@pingan.com.cn</span>
          </span>
          <span style="padding-right:15px;padding-bottom:10px;display:block;float:left;">评分</span>
          <el-rate v-model="value" show-text class="tel-rate" @change="elRate">
          </el-rate>
          <span style="padding:10px 0px 5px 0px;display:block">您的意见</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="写下您的宝贵意见和建议~" v-model="textarea" resize="none" @input="numberLimit">
          </el-input>
          <span class="limit" v-show="limit"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">最多输入400字已超出{{this.beyondValue}}字</span>
          <span class="limit" v-show="limitScore"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">请对产品服务评分</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cloneDialog" style="margin-left:50px;">联系我们</el-button>
          </span>
        </el-dialog>
        <div class="admin-out">
          <span @click="goHomeHot" v-show="backHome">返回首页</span>
          <span @click="logout">退出账号</span>
        </div>
      </div>
    </div>
    <div class="share-ratio" v-show="shareRatio">
      <p>股权比例</p>
      <p>
        <span class="ratio-span">持股：</span>
        <input type="text" v-model="investmentScore">
        <i style="position:absolute;right:50px;bottom:13px;font-style:normal">%</i>
        <span class="ratio-determine" @click="investmentChange">确定</span>
      </p>
    </div>
    <div class="legend-wrapper" v-show="legendControl">
      <p class="update-time">数据更新时间：{{originalGraphData.updatedate}}</p>
      <ul class="graph-toolbar">
        <li @click="shareRatioBut" class="investment-ratio" title="股权比例"></li>
        <li @click="resetLayout" class="graph-refresh" title="刷新"></li>
        <li @click="errorTips" v-show="!isReferenced" class="report-error" title="报告错误"></li>
        <li @click="errorTips" v-show="!isReferenced" class="tool-text">纠错</li>
        <li @click="toggleFullscreen" v-show="!isReferenced" :class="fullscreen? 'graph-normalscreen' : 'graph-fullscreen'" :title="fullscreen? '退出全屏' : '全屏'"></li>
      </ul>
      <div class="graph-legend">
        <p class="graph-legend-title unselectable">
          关系
          <el-popover placement="top-start" width="426" trigger="hover" :popper-class="'relation-intro'" :visible-arrow="false">
            <i class="graph-legend-popper" slot="reference">i</i>
            <div slot>
              <RelationIntroduction />
            </div>
          </el-popover>
        </p>
        <ul class="graph-legend-content">
          <li v-for="legend in legendData" :key="legend.type" v-show="legend.show">
            <Arrow :arrow-data="legend" :click-event="toggleRelation" />
          </li>
        </ul>
        <p class="graph-legend-title">
          图例
        </p>
        <ul class="graph-legend-content">
          <li>
            <img src="../assets/images/position.png" alt="搜索企业"> 搜索企业
          </li>
          <li>
            <img src="../assets/images/longtou.png" alt="龙头企业"> 龙头企业
          </li>
          <li>
            <img src="../assets/images/kongzhiren.png" alt="最终受益人"> 最终受益人
          </li>
          <li>
            <img src="../assets/images/Group.png" alt="自然人"> 自然人
          </li>
          <li>
            <img src="../assets/images/longgujia.png" alt="龙骨架企业"> 龙骨架企业
          </li>
          <li>
            <span style="display:inline-block;width: 12px;height:12px;border-radius:50%;background:#9DC3FF;"></span>
            普通企业
          </li>
          <li v-show="tagpermission">
            <img src="../assets/images/discredit.png" alt="失信被执行"> 失信被执行
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="纠错" :visible.sync="reportErrors" width="30%" custom-class="report-errors" center append-to-body>
      <span>
        <div>
          <el-radio-group v-model="errorData" @change="errorChange">
            <el-radio label="实际控制人" border></el-radio>
            <el-radio label="系范围错误" border></el-radio>
            <el-radio label="关系错误" border></el-radio>
            <el-radio label="数据缺失" border class="clear-left clear-width"></el-radio>
            <el-radio label="展示异常" border class="clear-width"></el-radio>
          </el-radio-group>
        </div>
      </span>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入具体信息" v-model="errortextarea" resize="none" @input="errorInput">
      </el-input>
      <span class="limit" v-show="limitNumber"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">最多输入400字已超出{{this.beyondValue}}字</span>
      <span class="limit" v-show="errorRange"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">请选择一个纠错范围！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportErrors = false">点错了</el-button>
        <el-button type="primary" @click="errorsDialog">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="感谢" :visible.sync="errorThank" width="270px" height="150px;" custom-class="error-thank" center append-to-body>
      <span>感谢您的反馈，工作人员已经接收到您的反馈，并会在5个工作日内联系您，谢谢。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="errorThank = false">关 闭</el-button>
      </span>
    </el-dialog>
    <div class="hot-follow unselectable" v-show="graphHotTab&&!isReferenced">
      热点关注
    </div>
    <div class="condition-wrapper" v-show="!isReferenced">
      <div class="graph-switch">
        <span :class="graphMode==1?'active':''" @click="graphModeSwitch">查图谱</span>
        <span :class="graphMode==2?'active':''" @click="graphModeSwitch">查关系</span>
      </div>
      <el-input v-show="graphMode==1" v-model="centerNodeName" placeholder="请输入系或公司名称" class="graph-search" size="small" @input="changSearch" @focus="changFocus" clearable>
        <el-button slot="append" icon="el-icon-search" type="primary" size="small" style="margin-bottom:-6px;border-left:none"></el-button>
      </el-input>
      <p class="start-correct" v-show="specialCharacter"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">禁止输入特殊字符！</p>
      <ul class="search-hot" v-show="listUl">
        <li v-for="item in listSearch" :key="item.id">
          <img src="../assets/images/search_small.png" alt="">
          <span class="search-span" @click="nodePosition(item)" v-bind:title="item.name">{{item.name}}</span>
        </li>
        <li v-show="listSearch.length == 0">
          <span class="search-span">未找到相关数据</span>
        </li>
      </ul>
      <ul class="search-hot" v-show="companyList">
        <li>
          <img src="../assets/images/location.png" alt="">
          <span class="search-span" v-bind:title="userInfo.company" @click="userCompany(userInfo)" style="color:#000;margin-top:2px;">我的公司</span>
        </li>
      </ul>
      <ul class="search-hot" v-show="listHistory">
        <li>
          <img src="../assets/images/location.png" alt="">
          <span class="search-span" v-bind:title="userInfo.company" @click="userCompany(userInfo)" style="color:#000;margin-top:2px;">我的公司</span>
        </li>
        <li v-for="history in searchHistory" :key="history.id">
          <img src="../assets/images/time.png" alt="">
          <span class="search-span" @click="historyList(history)" v-bind:title="history.companyname">{{history.companyname}}</span>
        </li>
      </ul>
      <ul class="search-delete" v-show="listHistory">
        <li class="deleteHistory" @click="deleteHistory">删除历史</li>
      </ul>
      <div v-show="graphMode==2" class="relation-condition">
        <el-input v-model="startNodeName" placeholder="请输入起点" class="graph-search graph-search-start" size="small" clearable @input="startSearch('start')" @focus="startFocus('start')">
          <el-button slot="append" icon="el-icon-search" type="primary" size="small" @click="startEndSearch()" style="margin-bottom:-6px; border-left:none"></el-button>
          <i slot="prefix" class="point">●</i>
        </el-input>
        <el-input v-model="endNodeName" placeholder="请输入终点" class="graph-search-end" size="small" clearable @input="startSearch('end')" @focus="startFocus('end')">
          <i slot="prefix" class="point">●</i>
        </el-input>
        <b class="split-line"></b>
        <p class="start-correct" v-show="startCorrect"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">请确认是否输入起点</p>
        <p class="start-correct" v-show="endCorrect"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">请确认是否输入终点</p>
        <p class="start-correct" v-show="specialCharacterPath"><img src="../assets/images/notice.png" alt="" style="margin-right:10px;">禁止输入特殊字符！</p>
        <ul class="search-hot" v-show="startList">
          <li v-for="sug in startSugList" :key="sug.id">
            <img src="../assets/images/search_small.png" alt="" v-if="sug.companyname" style="margin-top:4%;">
            <img src="../assets/images/search_small.png" alt="" v-if="!sug.companyname">
            <span class="search-span" @click="setPoint('start',sug)" v-bind:title="sug.name" v-if="sug.companyname">{{sug.companyname}}</br>{{sug.name}} &nbsp &nbsp ({{sug.position}})</span>
            <span class="search-span" @click="setPoint('start',sug)" v-bind:title="sug.name" v-if="!sug.companyname">{{sug.name}}</span>
          </li>
          <li v-show="startSugList.length == 0">
            <span class="search-span">未找到相关数据</span>
          </li>
        </ul>
        <ul class="search-results" v-show="listHistoryCompany">
          <li style="border:none;">
            <img src="../assets/images/location.png" alt="">
            <span class="search-span" v-bind:title="userInfo.company" @click="userPathCompany(userInfo)" style="color:#000;">我的公司</span>
          </li>
        </ul>
        <ul class="search-results" v-show="listHistoryPath">
          <li style="border:none;">
            <img src="../assets/images/location.png" alt="">
            <span class="search-span" v-bind:title="userInfo.company" @click="userPathCompany(userInfo)" style="color:#000;">我的公司</span>
          </li>
          <li v-for="path in searchHistoryPath" :key="path.id" @click="historyListPath(path)">
            <img src="../assets/images/time.png" alt="" style="margin-top:13%;" v-if="path.fcompanyname">
            <img src="../assets/images/time.png" alt="" style="margin-top:18px;" v-if="!path.fcompanyname">
            <span class="search-span" v-bind:title="path.fromname" v-if="path.fposition">{{path.fromname}} &nbsp &nbsp ({{path.fposition}})</br>{{path.fcompanyname}}</span>
            <span class="search-span" v-bind:title="path.fromname" v-if="!path.fposition">{{path.fromname}}</br>{{path.fcompanyname}}</span>
            <span class="search-span" v-bind:title="path.toname" style="margin-top:8px;padding-bottom:4px;" v-if="!path.tcompanyname">{{path.toname}}</br>{{path.tcompanyname}}</span>
            <span class="search-span" v-bind:title="path.toname" style="margin-top:8px;padding-bottom:4px;" v-if="path.tcompanyname">{{path.toname}}</br>{{path.tcompanyname}}</span>
          </li>
        </ul>
        <ul class="search-delete-path" v-show="listHistoryPath">
          <li class="deleteHistory" @click="deleteHistoryPath">删除历史</li>
        </ul>
        <ul class="search-hot" v-show="endList">
          <li v-for="sug in endSugList" :key="sug.id">
            <img src="../assets/images/search_small.png" alt="" v-if="sug.companyname" style="margin-top:4%;">
            <img src="../assets/images/search_small.png" alt="" v-if="!sug.companyname">
            <span class="search-span" @click="setPoint('end',sug)" v-bind:title="sug.name" v-if="sug.companyname">{{sug.companyname}}</br>{{sug.name}} &nbsp &nbsp ({{sug.position}})</span>
            <span class="search-span" @click="setPoint('end',sug)" v-bind:title="sug.name" v-if="!sug.companyname">{{sug.name}}</span>
          </li>
          <li v-show="endSugList.length == 0">
            <span class="search-span">未找到相关数据</span>
          </li>
        </ul>
      </div>
      <div class="graph-mode-company" v-show="graphModeCompany">
        <p v-bind:title="this.searchName" v-html="this.searchName"></p>
        <ul>
          <li>最终受益人：
            <span v-bind:title="graphCompany.UBOtopName" v-html="graphCompany.UBOtopName"></span>
          </li>
          <li>实际控制人（法人）：
            <span v-bind:title="graphCompany.topName" v-html="graphCompany.topName" v-show="actualController"></span>
            <p class="graph-mode-company-p" v-for="name in uboTop" v-bind:title="name.name" :key="name.id" v-html="name.name"></p>
          </li>
        </ul>
      </div>
    </div>
    <ul v-show="graphPopup &&!isReferenced" :style="graphPopupStyle" class="graph-popup">
      <li>
        <label>董事长：</label>{{graphNodeInfo.personname || " "}}</li>
      <li>
        <label>注册资本：</label>{{graphNodeInfo.registerAssets || " "}}</li>
      <li>
        <label>成立时间：</label>{{graphNodeInfo.estdate || " "}}</li>
      <li v-show="graphRelation">
        <el-button class="groph-popup-button" size="mini" type="primary" @click="checkRelation(graphNodeInfo)">查关系</el-button>
      </li>
      <li v-show="graphNodeInfo.id !== centerNodeId">
        <el-button class="groph-popup-button" size="mini" type="primary" @click="checkGraph(graphNodeInfo)">查图谱</el-button>
      </li>
    </ul>
    <img src="../assets/images/logo.gif" alt="好风度图谱" class="graph-logo" v-show="!isReferenced" @click="goHomeHot">
  </div>
</template>

<script>
// @ is an alias to /src
import debounce from "lodash/debounce";
import random from "lodash/random";
import graph from "@/libs/graph";
import network from "@/libs/network";
import { getItem, removeItem } from "@/libs/storage";
import { graphNode, graphLink, graphNodeIcon, noData, noPath, position, discredit } from "@/libs/constants";
import {
  isFullscreenEnabled,
  isFullscreen,
  requestFullscreen,
  exitFullscreen
} from "@/libs/tools";
import Arrow from "@/components/Arrow";
import RelationIntroduction from "@/components/RelationIntroduction";

export default {
  name: "home",
  data: function() {
    return {
      graphMode: 1,
      centerNodeName: "",
      centerNodeId: "",
      startNodeId: "",
      startNodeName: "",
      startCompanyId: "",
      startCompanyName: "",
      startPosition: "",
      endNodeId: "",
      endNodeName: "",
      endCompanyId: "",
      endCompanyName: "",
      endPosition: "",
      originalGraphData: {},
      graphPopup: false,
      graphPopupStyle: {},
      graphNodeInfo: {},
      inputClear: true,
      showAdmin: false,
      listSearch: [],
      listUl: false,
      graphTab: 1,
      UBOId: "",
      graphModeCompany: false,
      graphHotTab: true,
      legendControl: false,
      graphCompany: {},
      searchNodeId: "",
      shareRatio: false,
      centerDialogVisible: false,
      searchHistory: [],
      listHistory: false,
      value: null,
      textarea: "",
      limit: false,
      limitScore: false,
      reportErrors: false,
      errorThank: false,
      errorData: [],
      errortextarea: "",
      startSugList: [],
      endSugList: [],
      startList: false,
      endList: false,
      investmentScore: 0,
      userInfo: getItem("userInfo") || {},
      startCorrect: false,
      endCorrect: false,
      selectPath: false,
      options: [],
      number: "",
      Viewoption: [],
      result: [],
      // Viewoption: [{
      //   view: 'G001',
      //   label: '企业视角',
      //   disabled: false
      // }, {
      //   view: 'G002',
      //   label: '集团视角',
      //   disabled: false
      // }, {
      //   view: '3',
      //   label: '最终控制人视角',
      //   disabled: false
      // }, {
      //   view: '4',
      //   label: '最终受益人视角',
      //   disabled: false
      // }, {
      //   view: '5',
      //   label: '强经济圈视角',
      //   disabled: true
      // }],
      views: "",
      graphView: false,
      pathValue: 0,
      selectValue: 0,
      listHistoryPath: false,
      searchHistoryPath: [],
      fullscreen: false,
      graphRelation: true,
      searchName: "",
      HotspotList: [],
      hotspotFollw: true,
      limitNumber: false,
      beyondValue: "",
      companyList: false,
      listHistoryCompany: false,
      graphLoading: false,
      graphStop: false,
      importantHints: false,
      uboTop: [],
      actualController: true,
      downloadShow: false,
      errorRange: false,
      apiOvertime: false,
      specialCharacter: false,
      specialCharacterPath: false,
      tagpermission: false,
      backHome: false,
      investmentArr: false,
      hideArr: false,
      guaranteeArr: false,
      investmentLinks: [],
      hideLinks: [],
      guaranteeLinks: [],
      isReferenced: window.top !== window,
    };
  },
  computed: {
    legendData: function() {
      let links = this.$data.originalGraphData.links;
      // let result = [
      //   {
      //     type: "Investment",
      //     name: "投资",
      //     count: 0,
      //     show: true
      //   },
      //   {
      //     type: "Investmented",
      //     name: "股东",
      //     count: 0,
      //     show: true
      //   },
      //   {
      //     type: "Guarantee",
      //     name: "增信",
      //     count: 0,
      //     show: true
      //   },
      //   {
      //     type: "Guaranteeed",
      //     name: "被增信",
      //     count: 0,
      //     show: true
      //   },
      //   {
      //     type: "Hide",
      //     name: "高管",
      //     count: 0,
      //     show: true
      //   },
      //   {
      //     type: "Control",
      //     name: "控制",
      //     count: 0,
      //     show: true
      //   }
      // ];
      //disabled = true 为无权限-不显示   /show = fasle 为无权限-不显示
      // let nodes = result.map(node => {
      //   if (node.disabled == true) {
      //     return {
      //       show: false,
      //       count: 0, ...node
      //     }
      //   }else if (node.disabled == false){
      //     return {
      //       show: true,
      //       count: 0, ...node
      //     }
      //   }
      // });
      // console.log(nodes)
      // if (links) {
      //   nodes[0].count = links.filter(
      //     item => item.type == "Investment"
      //   ).length;
      //   nodes[1].count = links.filter(item => item.type == "Guarantee").length;
      //   nodes[2].count = links.filter(item => item.type == "Hide").length;
      //   nodes[3].count = links.filter(item => item.type == "Control").length;
      // }
      // return nodes;
      if (links) {
        this.result[0].count = links.filter(
          item => item.type == "Investment"
        ).length;
        this.result[1].count = links.filter(item => item.type == "Guarantee").length;
        this.result[2].count = links.filter(item => item.type == "Hide").length;
        this.result[3].count = links.filter(item => item.type == "Guaranteeed").length;
        this.result[4].count = links.filter(item => item.type == "Investmented").length;
        // this.$data.result[5].count = links.filter(item => item.type == "Control").length;                
      }
      return this.result;
    }
  },
  methods: {
    graphModeSwitch: function() {
      this.$data.graphMode == 1
        ? (this.$data.graphMode = 2)
        : (this.$data.graphMode = 1);
      if (this.$data.graphMode == 2) {
        this.listHistory = false;
        this.listUl = false;
        this.graphModeCompany = false;
        this.companyList = false;
        this.shareRatio = false;
        this.specialCharacter = false;
      }
      if (this.$data.graphMode == 1 && this.$data.hotspotFollw == false) {
        this.graphModeCompany = true;
        // this.selectPath = false;
      }
      if (this.$data.centerNodeName != "" || this.$data.graphMode == 1) {
        // this.selectPath = false;
      }
      if (this.$data.startNodeName != "" && this.$data.graphMode == 1) {
        this.graphModeCompany = false;
      }
    },
    drawGraph: function() {
      if (!this.searchNodeId) {
        //点击系进入
      } else {
        //点击list进入
        debugger;
        this.centerNodeId = this.searchNodeId;
      }
      // this.JurisdictionApi(this.centerNodeId)
      network
        .post("/api/relationship/findByIdForPad", {
          entityTypes: ["Group", "Company", "Nature"],
          relationTypes: ["Investment", "Guarantee", "Hide"],
          guestRange: "Economic",
          id: this.UBOId,
          investScore: 0,
          nodeId: this.centerNodeId,
        })
        .then(res => {
          if (res.data) {
            this.actualController = true;
            this.uboTop = [];
            this.$data.legendControl = true;
            this.$data.originalGraphData = res.data;
            let graphData = this.formatGraphData(res.data);
            this.graphLoading = false;
            this.graphView = true;
            //无数据时展示
            if (!res.data.links.length) {
              // this.graphView = false;
              let obj = { id: 1, name: "暂无数据" };
              let noData = [];
              noData.push(obj);
              this.graphInstance.replaceData(this.noDataGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              this.graphInstance.replaceData(this.formatGraphStyle(graphData));
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "focusnodes",
                  numberOfFocusNodes: 1,
                  initialNodes: [this.$data.centerNodeId]
                },
                style: {
                  selection: {
                    enabled: true
                  }
                }
              });
              this.graphInstance.off("rightClick", this.graphHotClickEvent);
              // 点击显示/隐藏浮框
              this.graphInstance.on("rightClick", this.graphClickEvent);
              // 图谱拖动隐藏浮框
              this.graphInstance.on("pointerDrag", this.graphDragEvent);
              this.graphInstance.on("click", this.graphLeftClick);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent)
            }
          }
        })
        .catch(error => {
          this.requestTimeout()
        });
    },
    noDataGraphStyle: function(data) {
      data.forEach(node => {
        node.style = {
          label: node.name,
          image: noData,
          radius: 50,
          fillColor: "none",
          labelStyle: {
            textStyle: {
              font: "13px Arial",
              fillColor: "#999999"
            }
          }
        };
      });
      return { nodes: data };
    },
    noPathGraphStyle: function(data) {
      data.forEach(node => {
        node.style = {
          label: node.name,
          image: noPath,
          radius: 50,
          fillColor: "none",
          labelStyle: {
            textStyle: {
              font: "13px Arial",
              fillColor: "#999999"
            }
          }
        };
      });
      return { nodes: data };
    },
    drawGraphHot: function() {
      let ishot = true;
      this.hotApi(ishot);
    },
    hotApi: function(ishot) {
      network
        .get("/api/searchInfo/searchHotSearch?ishot=" + ishot)
        .then(res => {
          if (res.data) {
            this.HotspotList = res.data.list;
          }
        })
    },
    loadDepartInfo: function(e) {
      let id = e.targetId || e.id || e.companyid || e.mid || e;
      let type = e.type;
      this.centerNodeId = e.targetId || e.id || e;
      this.hotspotFollw = false;
      this.backHome = true;
      this.initializeGraph();
      // this.JurisdictionApi(this.centerNodeId)  

      //----------
      // network
      // .get("/api/menu/findPermissionByUser?id=" + id)
      // .then(res => {
      //   if (res.data.error == "EmptyUserOrRole" || res.data.error == "LackOfParameter" || res.data.error == "NoCompanyView") {
      //     this.requestTimeoutss();
      //     return;
      //   } else {
      //     this.Viewoption = res.data.viewoption;
      //     this.result = res.data.relationpermission;
      //     this.downloadShow = res.data.datadownload[0].show;
      //     this.tagpermission = res.data.tagpermission[0].show;
      //     network
      //       .get("/api/search/findDepart?targetId=" + id + "&type=" + type)
      //       .then(res => {
      //         this.UBOId = res.data.UBOId;
      //         this.graphCompany.topName = res.data.topName;
      //         this.graphCompany.UBOtopName = res.data.UBOTopName;
      //         this.graphModeCompany = true;
      //         this.graphHotTab = false;
      //         this.graphPopup = false;
      //         this.drawGraph();
      //       })
      //       .catch(error => {
      //         this.requestTimeout()
      //       })
      //   }
      // });
      //本地调式打开        
      network
        .get("/api/search/findDepart?targetId=" + id + "&type=" + type)
        .then(res => {
          this.UBOId = res.data.UBOId;
          this.graphCompany.topName = res.data.topName;
          this.graphCompany.UBOtopName = res.data.UBOTopName;
          this.graphModeCompany = true;
          this.graphHotTab = false;
          this.graphPopup = false;
          this.drawGraph();
        })
        .catch(error => {
          this.requestTimeout()
        })

    },
    formatGraphData: function(data) {
      if (Array.isArray(data.list) && Array.isArray(data.links)) {
        let centerNodeId = this.$data.centerNodeId;
        let fakeNode = {};
        let links = [];
        let nodes = data.list.map(node => {
          return { isReal: true, ...node };
        });
        data.links.forEach(link => {
          let { fromId, toId, type, ...rest } = link;
          let tempId = "";
          // 过滤自指向关系
          if (fromId === toId) return;
          // 起点为中心点
          if (fromId === centerNodeId) {
            tempId = `$${type}$`;
            if (!fakeNode[tempId]) {
              fakeNode[tempId] = {
                id: tempId,
                linkType: type,
                name: 1,
                isReal: false,
                // 图谱使用中心点模式，只要没有从中心点直接或间接连过去线，这样的点都不会显示
                moreNodes: [],
                moreLinks: []
              };
              links.push(
                {
                  from: fromId,
                  to: tempId,
                  id: tempId,
                  isReal: false,
                  type
                },
                {
                  from: tempId,
                  to: toId,
                  isReal: true,
                  type,
                  ...rest
                }
              );
            } else {
              fakeNode[tempId].name += 1;
              // 超过8个的关系
              if (fakeNode[tempId].name > 8) {
                // 在虚拟节点添加关系
                fakeNode[tempId].moreLinks.push({
                  from: tempId,
                  to: toId,
                  isReal: true,
                  type,
                  ...rest
                });
              } else {
                links.push({
                  from: tempId,
                  to: toId,
                  isReal: true,
                  type,
                  ...rest
                });
              }
            }
          } else if (toId === centerNodeId) {
            // 终点为中心点
            tempId = `$${type}$`;
            if (!fakeNode[tempId]) {
              fakeNode[tempId] = {
                id: tempId,
                linkType: type,
                name: 1,
                isReal: false,
                moreNodes: [],
                moreLinks: []
              };
              links.push(
                {
                  from: tempId,
                  to: toId,
                  id: tempId,
                  isReal: false,
                  type
                },
                {
                  from: fromId,
                  to: tempId,
                  isReal: true,
                  type,
                  ...rest
                }
              );
            } else {
              fakeNode[tempId].name += 1;
              // 超过8个的关系
              if (fakeNode[tempId].name > 8) {
                fakeNode[tempId].moreLinks.push({
                  from: fromId,
                  to: tempId,
                  isReal: true,
                  type,
                  ...rest
                });
              } else {
                links.push({
                  from: fromId,
                  to: tempId,
                  isReal: true,
                  type,
                  ...rest
                });
              }
            }
          } else {
            links.push({ from: fromId, to: toId, isReal: true, type, ...rest });
          }
        });
        for (let key in fakeNode) {
          nodes.push(fakeNode[key]);
        }
        return { nodes, links };
      } else {
        return { nodes: [], links: [] };
      }
    },
    formatGraphStyle: function(data) {
      data.nodes.forEach(node => {
        node.loaded = true;
        node.style = {
          label: node.name
        };
        if (node.tag in graphNode) {
          Object.assign(node.style, graphNode[node.tag]);
        } else {
          Object.assign(node.style, graphNode.default);
        }
        if (node.uboTag == "Top" && node.type == "Nature") {
          Object.assign(node.style, graphNode.uboTop);
        } else if (node.type == "Nature" && node.uboTag != "Top") {
          Object.assign(node.style, graphNode.Nature);
        }
        if (!node.isReal) {
          node.style.radius *= 1.2;
          node.style.fillColor = graphLink[node.linkType].fillColor;
          node.style.items = [];
          if (node.moreLinks.length) {
            node.style.items.push({
              text: "+",
              px: 0,
              py: 0,
              scaleWithZoom: true,
              backgroundStyle: {
                fillColor: "transparent"
              },
              textStyle: {
                font: "16px Arial",
                fillColor: "#fff"
              }
            });
          }
        }
        if (node.id == this.searchNodeId) {
          node.style.items = [];
          node.style.items.push({
            image: position,
            px: 1,
            py: -0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });
        }
        if (node.discredit == "true") {
          this.importantHints = true;
          var self = this;
          setTimeout(function() {
            self.importantHints = false
          }, 5000);
          node.style.items = [];
          node.style.items.push({
            image: discredit,
            px: -0.8,
            py: 0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });
        }
        if (node.id == this.searchNodeId && node.discredit == "true") {
          node.style.items = [];
          node.style.items.push({
            image: position,
            px: 1,
            py: -0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });
          node.style.items.push({
            image: discredit,
            px: -0.8,
            py: 0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });
        }
      });
      data.links.forEach(link => {
        link.style = {};
        switch (link.type) {
          case "Investment":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal && link.score) {
              link.style.label = `${link.score}%`;
            }
            break;
          case "Investmented":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal && link.score) {
              link.style.label = `${link.score}%`;
            }
            break;
          case "Guarantee":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal) {
              link.style.label = "";
            }
            break;
          case "Guaranteeed":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal && link.tag) {
              link.style.label = link.tag;
            }
            break;
          case "Hide":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal && link.tag) {
              link.style.label = link.tag;
            }
            break;
          case "Control":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal) {
              link.style.label = "";
            }
            break;
          default:
            Object.assign(link.style, graphLink.default);
        }
      });
      return data;
    },
    adminShow: function() {
      this.showAdmin = !this.showAdmin;
    },
    changSearch: debounce(function() {
      this.companyList = false;
      this.listHistory = false;
      var text = this.centerNodeName;
      var pattern = new RegExp("[`~!@#$^&*=|{}':;'\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");
      var result = text.match(pattern);
      if (!result) {
        this.listHistory = false;
        network.get("/api/search/?key=" + this.centerNodeName).then(res => {
          if (res.data) {
            this.listUl = true;
            this.companyList = false;
            this.listHistory = false;
            this.graphModeCompany = false;
            this.listSearch = res.data.list;
          }
        });
        if (this.centerNodeName.length == 0) {
          this.listUl = false;
          this.listHistory = true;
          this.specialCharacter = false;
        }
      } else {
        this.companyList = false;
        this.listHistory = false;
        this.specialCharacter = true;
      }
    }, 500),
    changFocus: function() {
      network.get("/api/searchInfo/searchHistory").then(res => {
        if (res.data) {
          this.searchHistory = res.data.list;
          if (res.data.list.length == 0) {
            this.companyList = true;
          } else {
            this.companyList = false;
            this.listHistory = true;
            this.graphModeCompany = false;
          }
          if (this.listUl == true) {
            this.listHistory = false;
          }
        }
      });
    },
    deleteHistory: function() {
      network.get("/api/searchInfo/deleteHistory").then(res => {
        if (res.data) {
          this.listHistory = false;
        }
      });
    },
    //点击历史list
    historyList: function(history) {
      this.$data.views = "";
      this.graphHotTab = false;
      this.graphLoading = true;
      this.centerNodeName = history.companyname;
      this.searchName = history.companyname;
      //系id
      this.searchNodeId = history.companyid;
      this.listHistory = false;
      this.selectPath = false;
      this.loadDepartInfo(history);
    },
    nodePosition: function(item) {
      this.$data.views = "";
      this.hotspotFollw = false;
      this.graphHotTab = false;
      this.graphLoading = true;
      this.centerNodeName = item.name;
      this.searchName = item.name;
      this.listUl = false;
      this.selectPath = false;
      this.loadDepartInfo(item);
      this.searchNodeId = item.id;
      //保存热点
      network
        .get("/api/searchInfo/saveHotSearch/?targetId=" + item.id)
        .then(res => { });
      network
        .get(
        "/api/searchInfo/saveHistory?companyid=" +
        item.id +
        "&companyname=" +
        item.name +
        "&type=" +
        item.type
        )
        .then(res => {
          if (res.data) {
          }
        });
    },
    resetLayout: function() {
      this.graphInstance.resetLayout();
    },
    checkGraph: function(e) {
      this.graphLoading = true;
      this.searchNodeId = "";
      this.$data.graphMode = 1;
      this.centerNodeName = e.name;
      this.graphPopup = false;
      this.searchName = e.name;
      this.initializeGraph();
      this.loadDepartInfo(e);
      // this.changSearch();
    },
    checkRelation: function(e) {
      this.$data.graphMode = 2;
      this.startNodeName = e.name;
      this.graphPopup = false;
      this.initializeGraph();
    },
    graphClickEvent: function(e) {
      if (e.clickNode) {
        // 展示节点信息
        if (e.clickNode.data.isReal && e.clickNode.data.type != "Nature" && e.clickNode.data.uboTag != "Top") {
          this.$data.graphPopup = true;
          this.graphRelation = true;
          this.$data.graphNodeInfo = e.clickNode.data;
          this.$data.graphPopupStyle.left = e.pageX + "px";
          this.$data.graphPopupStyle.top =
            e.pageY + e.clickNode.radius + 15 + "px";
        } else {
          this.$data.graphPopup = false;
        }
      }
    },
    graphDoubleEvent: function(e) {
      e.preventDefault();
    },
    graphLeftClick: function(e) {
      if (this.$data.graphMode == 1) {
        this.graphModeCompany = true;
      }
      if (!e.clickNode) {
        this.$data.graphPopup = false;
        this.listUl = false;
        this.showAdmin = false;
        this.listHistory = false;
        this.shareRatio = false;
        this.$refs.mySelect.handleClose()
      }
      if (e.clickNode) {
        // 展示更多节点和关系
        if (!e.clickNode.data.isReal && e.clickNode.data.moreLinks.length) {
          this.graphStop = true;;          
          let data = {
            nodes: e.clickNode.data.moreNodes.splice(0),
            links: e.clickNode.data.moreLinks.splice(0)
          };
          // 移除更多标记
          e.clickNode.items.splice(0, 1);
          e.chart.addData(this.formatGraphStyle(data));
        }
        if (!e.clickNode.data.isReal) return;
        if (e.clickNode.expanded) {
        } else {
          this.graphStop = true;
        }
        // if (e.clickNode.focused) return;
        // if (!e.clickNode.data.isReal) return;
        // if (e.clickNode.expanded) {
        //   // 收起
        //   e.chart.closeNode(e.clickNode.id);
        // } else {
        //   // 展开
        //   e.chart.expandNode(e.clickNode.id);
        // }
      }

    },
    commonRightClickEvent: function(e) {
      if (e.clickNode) {
        console.log(e.clickNode);
      }
      if (e.clickLink) {
        console.log(e.clickLink);
      }
    },
    graphDragEvent: function() {
      this.$data.graphPopup = false;
    },
    graphHotClickEvent: function(e) {
      this.searchNodeId = e.targetId
      this.graphHotTab = false;
      this.graphLoading = true;
      if (!e.count) {
        return false;
      } else {
        this.listUl = false;
        this.listHistory = false;
        this.startList = false;
        this.endList = false;
        this.listHistoryPath = false;
        this.searchName = e.companyName;
        this.loadDepartInfo(e);
      }
    },
    shareRatioBut: function() {
      this.shareRatio = !this.shareRatio;
    },
    numberLimit: function() {
      let number = this.textarea.length;
      this.beyondValue = number - 400;
      if (number > 400) {
        this.limit = true;
      }
      if (number < 401) {
        this.limit = false;
      }
    },
    toggleRelation: function(type, bool) {
      //测试切换视角点击关系

      //第二种方案
      if (this.$data.views >= 2) {
        if (type == "Investment") {
          if (bool) {
            this.investmentLinks.invisible = bool;
            //点过一次为true
            this.investmentArr = true;
            if (this.hideArr == true) {
              this.investmentLinks = this.$data.hideLinks.filter(item => {
                return (
                  item.type != "Hide"
                );
              });
              if (this.guaranteeArr == true) {
                this.investmentLinks = this.$data.originalGraphData.links.filter(item => {
                  return (
                    item.type != "Guarantee"
                  );
                });
              }
            } else {
              this.investmentLinks = this.$data.originalGraphData.links.filter(item => {
                return (
                  item.type != "Investment"
                );
              });
            }
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.investmentLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          } else {
            if (this.hideArr == true) {
              let investmentLinks = this.$data.originalGraphData.links.filter(item => {
                return (
                  item.type != "Hide"
                );
              });
            }
            else {
              this.investmentLinks = this.$data.originalGraphData.links;
            }
            //再次点击为fasle
            this.investmentArr = false;
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.investmentLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          }
        } else if (type == "Hide") {
          //判断投资关系是否点击
          if (this.investmentArr == true) {
            this.hideLinks = this.investmentLinks.filter(item => {
              return (
                item.type != "Hide"
              );
            });
          } else {
            this.hideLinks = this.$data.originalGraphData.links.filter(item => {
              return (
                item.type != "Hide"
              );
            });
          }
          this.hideLinks.invisible = bool;
          this.hideArr = true;
          if (bool) {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.hideLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          } else {
            if (this.investmentArr == true) {
              //不显示投资
              this.hideLinks = this.$data.originalGraphData.links.filter(item => {
                return (
                  item.type != "Investment"
                );
              });
            } else {
              this.hideLinks = this.$data.originalGraphData.links
            }
            this.hideArr = false;
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.hideLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          }
        } else if (type == "Guarantee") {
          if (this.investmentArr == true) {
            this.guaranteeLinks = this.$data.investmentLinks.filter(item => {
              return (
                item.type != "Guarantee"
              );
            });
            if (this.hideArr == true) {
              this.guaranteeLinks = this.$data.guaranteeLinks.filter(item => {
                return (
                  item.type != "Hide"
                );
              });
            }
          } else {
            this.guaranteeLinks = this.$data.originalGraphData.links.filter(item => {
              return (
                item.type != "Guarantee"
              );
            });
          }
          this.guaranteeLinks.invisible = bool;
          this.guaranteeArr = true;
          if (bool) {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.guaranteeLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          } else {
            //判断哪些关系线被点击
            if (this.investmentArr == true) {
              this.guaranteeLinks = this.$data.investmentLinks.filter(item => {
                return (
                  item.type != "Investment"
                );
              });
              if (this.hideArr == true) {
                this.guaranteeLinks = this.guaranteeLinks.filter(item => {
                  return (
                    item.type != "Hide"
                  );
                });
              }
            } else {
              this.guaranteeLinks = this.$data.originalGraphData.links
            }
            this.guaranteeArr = false;
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.guaranteeLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          }
        } else if (type == "Guaranteeed") {
          let matchedLinks = this.$data.originalGraphData.links.filter(item => {
            return (
              item.type != "Guaranteeed"
            );
          });
          matchedLinks.invisible = bool;
          if (bool) {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: matchedLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          } else {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.$data.originalGraphData.links,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          }
        } else if (type == "Investmented") {
          let matchedLinks = this.$data.originalGraphData.links.filter(item => {
            return (
              item.type != "Investmented"
            );
          });
          matchedLinks.invisible = bool;
          if (bool) {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: matchedLinks,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          } else {
            let oldData = this.graphInstance.exportData();
            let graphData = this.formatGraphViewData({
              links: this.$data.originalGraphData.links,
              list: this.$data.originalGraphData.list
            });
            this.graphInstance.removeData(oldData);
            this.graphInstance.addData(this.formatGraphViewStyle(graphData));
          }
        }
      } else {
        let typedNode = this.graphInstance
          .nodes()
          .find(item => item.id == `$${type}$`);
        let typedLink = this.graphInstance
          .links()
          .find(item => item.id == `$${type}$`);
        if (typedLink) {
          typedLink.invisible = bool;
        }
        if (typedNode) {
          typedNode.invisible = bool;
        }
        if (bool) {
          typedNode && this.graphInstance.collapseNode(typedNode.id);
        } else {
          typedNode && this.graphInstance.expandNode(typedNode.id);
        }
      }

      //第一种方案
      // if (this.$data.views >= 2) {
      //   if (type == "Investment") {
      //     this.matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Investment"
      //       );
      //     });
      //     this.matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       this.matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //         return (
      //           item.type != "Hide"
      //         );
      //       });
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Hide") {
      //     this.relationArr.forEach(type => {
      //       if (type == "Investment") {
      //         this.matchedLinkss = this.$data.matchedLinks.filter(item => {
      //           return (
      //             item.type != "Hide"
      //           );
      //         });
      //       }
      //     })
      //     this.matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.matchedLinkss,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       this.matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //         return (
      //           item.type != "Investment"
      //         );
      //       });
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Guarantee") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Guarantee"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Guaranteeed") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Guaranteeed"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Investmented") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Investmented"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   }
      // } else {
      //   let typedNode = this.graphInstance
      //     .nodes()
      //     .find(item => item.id == `$${type}$`);
      //   let typedLink = this.graphInstance
      //     .links()
      //     .find(item => item.id == `$${type}$`);
      //   if (typedLink) {
      //     typedLink.invisible = bool;
      //   }
      //   if (typedNode) {
      //     typedNode.invisible = bool;
      //   }
      //   if (bool) {
      //     typedNode && this.graphInstance.collapseNode(typedNode.id);
      //   } else {
      //     typedNode && this.graphInstance.expandNode(typedNode.id);
      //   }
      // }


      // if (this.$data.views >= 2) {
      //   if (type == "Investment") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Investment"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Hide") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Hide"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Guarantee") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Guarantee"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Guaranteeed") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Guaranteeed"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   } else if (type == "Investmented") {
      //     let matchedLinks = this.$data.originalGraphData.links.filter(item => {
      //       return (
      //         item.type != "Investmented"
      //       );
      //     });
      //     matchedLinks.invisible = bool;
      //     this.relationArr.push(type);
      //     alert(this.relationArr)
      //     if (bool) {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: matchedLinks,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     } else {
      //       let oldData = this.graphInstance.exportData();
      //       let graphData = this.formatGraphViewData({
      //         links: this.$data.originalGraphData.links,
      //         list: this.$data.originalGraphData.list
      //       });
      //       this.graphInstance.removeData(oldData);
      //       this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      //     }
      //   }




      //   // let typedNode = this.graphInstance
      //   //   .nodes()
      //   //   .find(item => item.id == `$${type}$`);
      //   // let typedLink = this.graphInstance
      //   //   .links()
      //   //   .find(item => item.id == `$${type}$`);
      //   // let typedNode = {}
      //   // this.graphInstance.links().forEach(link => {
      //   //   if (type == "Investment") {
      //   //       links.push(
      //   //         {
      //   //           from: fromId,
      //   //           to: toId,
      //   //           isReal: true,
      //   //           type,
      //   //           ...rest
      //   //         }
      //   //       );
      //   //   }
      //   // })

      //   // if (typedNode) {
      //   //   typedNode.invisible = bool;
      //   // }
      //   // if (bool) {
      //   //   typedNode && this.graphInstance.collapseNode(typedNode.id);
      //   // } else {
      //   //   typedNode && this.graphInstance.expandNode(typedNode.id);
      //   // }
      // } else {
      //   let typedNode = this.graphInstance
      //     .nodes()
      //     .find(item => item.id == `$${type}$`);
      //   let typedLink = this.graphInstance
      //     .links()
      //     .find(item => item.id == `$${type}$`);
      //   if (typedLink) {
      //     typedLink.invisible = bool;
      //   }
      //   if (typedNode) {
      //     typedNode.invisible = bool;
      //   }
      //   if (bool) {
      //     typedNode && this.graphInstance.collapseNode(typedNode.id);
      //   } else {
      //     typedNode && this.graphInstance.expandNode(typedNode.id);
      //   }
      // }
    },
    cloneDialog: function() {
      if (!this.value) {
        this.limitScore = true;
        return;
      }
      if (this.limit == true) {
        return;
      }
      this.centerDialogVisible = false;
      network
        .get(
        "/api/searchInfo/feedback?option=" +
        this.textarea +
        "&score=" +
        this.value +
        "&module=" +
        0
        )
        .then(res => { });
    },
    errorsDialog: function() {
      if (this.limitNumber == true || this.errorData.length == 0) {
        this.errorRange = true;
        return
      } else {
        this.reportErrors = false;
        this.errorThank = true;
        network
          .get(
          "/api/searchInfo/feedback?errorInfo=" +
          this.errorData +
          "&option=" +
          this.errortextarea +
          "&module=" +
          0 +
          "&param=" +
          this.centerNodeName
          )
          .then(res => { });
      }
    },
    startSearch: function(name) {
      // var keyword = this[name + "NodeName"];
      // network.get("/api/search/searchSingle?key=" + keyword).then(res => {
      //   if (res.data) {
      //     this[name + "List"] = true;
      //     this.graphModeCompany = false;
      //     this[name + "SugList"] = res.data.list;
      //     this.listHistoryPath = false;
      //     this.listHistoryCompany = false;
      //   }
      // });
      this[name+"NodeId"] = "";
      this.listHistoryCompany = false;
      this.listHistoryPath = false;
      var keyword = this[name + "NodeName"];
      var pattern = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*——|{}【】‘；：”“'。，、？%]");
      var result = keyword.match(pattern);
      if (!result) {
        network.get("/api/search/searchSingle?key=" + keyword).then(res => {
          if (res.data) {
            this[name + "List"] = true;
            this.graphModeCompany = false;
            this[name + "SugList"] = res.data.list;
            this.listHistoryPath = false;
            this.listHistoryCompany = false;
          }
        });
        if (keyword.length == 0) {
          this.startList = false;
          this.specialCharacterPath = false;
          this.listHistoryPath = true;
          this.listHistoryCompany = true;
        }
      } else {
        this.listHistoryPath = false;
        this.listHistoryCompany = false;
        this.specialCharacterPath = true;
      }
    },
    logout: function() {
      network.post("/api/login/doLogout").finally(() => {
        removeItem("token");
        removeItem("userInfo");
        this.$router.push("/");
      });
    },
    investmentChange: function() {
      if (this.$data.investmentScore > 100) {
        this.$data.investmentScore = 100;
      }
      if (this.$data.investmentScore < 0) {
        this.$data.investmentScore = 0;
      }
      if (this.$data.views >= 2) {
        let matchedLinks = this.$data.originalGraphData.links.filter(item => {
          return (
            (item.type == "Investment" &&
              item.score >= this.$data.investmentScore) ||
            item.type != "Investment"
          );
        });
        let oldData = this.graphInstance.exportData();
        let graphData = this.formatGraphViewData({
          links: matchedLinks,
          list: this.$data.originalGraphData.list
        });
        this.graphInstance.removeData(oldData);
        this.graphInstance.addData(this.formatGraphViewStyle(graphData));
      } else {
        let matchedLinks = this.$data.originalGraphData.links.filter(item => {
          return (
            (item.type == "Investment" &&
              item.score >= this.$data.investmentScore) ||
            item.type != "Investment"
          );
        });
        let oldData = this.graphInstance.exportData();
        let graphData = this.formatGraphData({
          links: matchedLinks,
          list: this.$data.originalGraphData.list
        });
        this.graphInstance.removeData(oldData);
        this.graphInstance.addData(this.formatGraphStyle(graphData));
      }
    },
    setPoint: function(name, item) {
      this[name + "NodeName"] = item.name;
      this[name + "NodeId"] = item.id;
      this[name + "CompanyId"] = item.id;
      this[name + "CompanyName"] = item.companyname;
      this[name + "Position"] = item.position;
      this[name + "List"] = false;
    },
    startFocus: function(start) {
      if (start == "end") {
        this.startList = false;
      } else if (start == "start") {
        this.endList = false;
      }
      this.endCorrect = false;
      this.startCorrect = false;
      this.graphModeCompany = false;
      network.get("/api/searchInfo/searchHistoryPath").then(res => {
        if (res.data) {
          this.searchHistoryPath = res.data.list;
          if (res.data.list.length == 0) {
            this.listHistoryPath = false;
            this.listHistoryCompany = true;
          } else {
            this.listHistoryCompany = false;
            this.listHistoryPath = true;
          }
          if (this.startList == true) {
            this.listHistoryPath = false;
          }
        }
      });
    },
    deleteHistoryPath: function() {
      network.get("/api/searchInfo/deleteHistoryPath").then(res => {
        if (res.data) {
          this.listHistoryPath = false;
        }
      });
    },
    historyListPath: function(path) {
      this.graphHotTab = false;
      this.graphLoading = true;
      this.graphView = false;
      this.hotspotFollw = false;
      //起点终点
      if (this.startNodeName == "" && this.startNodeId == "") {
        this.startNodeId = path.fromid;
        this.startNodeName = path.fromname;
      }
      if (this.endNodeName == "" && this.endNodeId == "") {
        this.endNodeId = path.toid;
        this.endNodeName = path.toname;
      }
      if (!this.endNodeId == "" && !this.startNodeId == "") {
        this.startNodeId = path.fromid;
        this.startNodeName = path.fromname;
        this.endNodeId = path.toid;
        this.endNodeName = path.toname;
      }
      this.listHistoryPath = false;
      this.graphHotTab = false;
      this.selectPath = true;
      this.legendControl = false;
      this.number = null;
      this.pathApi(this.pathValue);
    },
    selectCheck: function(value) {
      this.pathValue = value;
      this.pathApi(this.pathValue);
    },
    startEndSearch: function() {
      this.graphHotTab = false;
      this.graphView = false;
      this.graphLoading = true;
      // this.number = "";
      if (!this.startNodeName) {
        this.startCorrect = true;
        this.endCorrect = false;
      } else if (!this.endNodeName) {
        this.endCorrect = true;
        this.startCorrect = false;
      } else {
        this.endCorrect = false;
        this.startCorrect = false;
      }
      this.hotspotFollw = false;
      //判断名称有无ID
      if (this.startNodeId == "") {
        network
          .get("/api/search/searchSingle?key=" + this.startNodeName)
          .then(res => {
            if (res.data) {
              this.startSugList = res.data.list;
              if (this.startNodeName == res.data.list[0].name) {
                this.startNodeId = res.data.list[0].id;
              }
            }
            if (this.endNodeId == "") {
              //判断名称有无ID
              // if (this.endNodeId == '') {
              network
                .get("/api/search/searchSingle?key=" + this.endNodeName)
                .then(res => {
                  if (res.data) {
                    this.endSugList = res.data.list;
                    if (this.endNodeName == res.data.list[0].name) {
                      this.endNodeId = res.data.list[0].id;
                    }
                  }
                  this.pathApi(this.pathValue);
                });
            }
          });
      }
      // if (this.endNodeId == "") {
      //   //判断名称有无ID
      //   // if (this.endNodeId == '') {
      //   network
      //     .get("/api/search/searchSingle?key=" + this.endNodeName)
      //     .then(res => {
      //       if (res.data) {
      //         this.endSugList = res.data.list;
      //         if (this.endNodeName == res.data.list[0].name) {
      //           this.endNodeId = res.data.list[0].id;
      //         }
      //       }
      //       this.pathApi(this.pathValue);
      //     });
      // }

      this.startList = false;
      this.endList = false;
      this.listHistoryPath = false;
      this.selectPath = true;
      this.graphHotTab = false;
      this.legendControl = false;
      this.pathApi(this.pathValue);
      //保存历史api
      network
        .post(
        "/api/searchInfo/saveHistoryPath", {
          fromid: this.startNodeId,
          fromname: this.startNodeName,
          fcompanyid: this.startCompanyId,
          fcompanyname: this.startCompanyName,
          fposition: this.startPosition,
          toid: this.endNodeId,
          toname: this.endNodeName,
          tcompanyid: this.endCompanyId,
          tcompanyname: this.endCompanyName,
          tposition: this.endPosition
        })
        .then(res => {
          if (res.data) {
          }
        });
    },
    pathApi: function(pathValue) {
      var condition = {
        limit: 100,
        relationTypes: ["Investment", "Guarantee", "Hide"],
        nodeTypes: ["Group", "Company", "Nature"],
        pathType: "ShortPath",
        startId: this.startNodeId,
        endId: this.endNodeId
      };
      network
        .post("/api/normalRelation/findRelation", condition)
        .then(res => {
          if (res.data) {
            //清空起点终点id
            // this.startNodeId = "";
            // this.endNodeId = "";
            this.graphStop = false;
            this.graphPopup = false;
            this.initializeGraph();
            this.graphLoading = false;
            //无数据时展示
            if (!res.data.links.length) {
              let obj = { id: 1, name: "暂未查到关系" };
              let noData = [];
              noData.push(obj)
              this.graphInstance.replaceData(this.noPathGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              this.options = res.data.path.pathLabel;
              this.selectPath = true;
              this.graphInstance.replaceData(
                this.formatGraphStylePath(res.data.path[pathValue])
              );
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              // 移除点击事件
              this.graphInstance.off(
                "rightClick",
                this.graphClickEvent,
                this.graphHotClickEvent,
                this.graphLeftClick
              );
              // 移除拖拽事件
              this.graphInstance.off("pointerDrag", this.graphDragEvent);
              // 添加点击事件
              this.graphInstance.on("rightClick", this.graphPathClickEvent);
              this.graphInstance.on("pointerDrag", this.graphDragPathEvent);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent);
            }
          }
        })
        .catch(error => {
          this.requestTimeout()
        })
    },
    //路径样式
    formatGraphStylePath: function(data) {
      data.nodes.forEach(node => {
        node.loaded = true;
        node.style = {
          label: node.name
        };
        if (node.tag in graphNode) {
          Object.assign(node.style, graphNode[node.tag]);
        } else {
          Object.assign(node.style, graphNode.default);
        }
        if (node.uboTag == "Top") {
          Object.assign(node.style, graphNode.uboTop);
        }
      });
      data.links.forEach(link => {
        link.from = link.fromId;
        link.to = link.toId;
        link.style = {};
        switch (link.type) {
          case "Investment":
            Object.assign(link.style, graphLink[link.type]);
            if (link.score) {
              link.style.label = `${link.score}%`;
            }
            break;
          case "Guarantee":
            Object.assign(link.style, graphLink[link.type]);
            if (link.score) {
              link.style.label = "";
            }
            break;
          case "Hide":
            Object.assign(link.style, graphLink[link.type]);
            if (link.tag) {
              link.style.label = link.tag;
            }
            break;
          case "Control":
            Object.assign(link.style, graphLink[link.type]);
            if (link.score) {
              link.style.label = "";
            }
            break;
          default:
            Object.assign(link.style, graphLink.default);
        }
      });
      return data;
    },
    goHomeHot: function() {
      this.$data.graphMode = 1;
      this.graphHotTab = true;
      this.selectPath = false;
      this.legendControl = false;
      this.graphModeCompany = false;
      this.shareRatio = false;
      this.centerNodeName = "";
      this.startNodeName = "";
      this.endNodeName = "";
      this.hotspotFollw = true;
      this.graphPopup = false;
      this.graphInstance.remove();
      this.graphView = false;
      this.importantHints = false;
      this.graphLoading = false;
      this.views = "";
      this.graphStop = false;
      let ishot = true;
      this.backHome = false;
      this.hotApi(ishot);
      // this.drawGraphHot();
    },
    toggleFullscreen: function() {
      if (!isFullscreenEnabled()) {
        console.warn("浏览器不支持全屏！");
      }
      if (isFullscreen()) {
        exitFullscreen();
      } else {
        requestFullscreen();
      }
    },
    //图谱初始化
    initializeGraph: function() {
      this.graphInstance = graph({
        container: document.getElementById("graph-wrapper"),
        area: {
          height: document.documentElement.clientHeight,
        }
      });
    },
    graphDragPathEvent: function() {
      this.$data.graphPopup = false;
    },
    graphPathClickEvent: function(e) {
      if (e.clickNode) {
        this.graphRelation = false;
        this.$data.graphPopup = true;
        this.$data.graphNodeInfo = e.clickNode.data;
        this.$data.graphPopupStyle.left = e.pageX + "px";
        this.$data.graphPopupStyle.top =
          e.pageY + e.clickNode.radius + 15 + "px";
      }
      if (!e.clickNode) {
        this.$data.graphPopup = false;
      }
    },
    contactUs: function() {
      this.textarea = "";
      this.value = null;
      this.limit = false;
      this.limitScore = false;
      this.centerDialogVisible = true;
    },
    errorTips: function() {
      this.errortextarea = "";
      this.errorData = [];
      this.limitNumber = false;
      this.reportErrors = true;
    },
    errorInput: function() {
      let numbers = this.errortextarea.length;
      this.beyondValue = numbers - 400;
      if (numbers > 400) {
        this.limitNumber = true;
        return;
      }
      if (numbers < 400) {
        this.limitNumber = false;
      }
    },
    userCompany: function(userInfo) {
      this.companyList = false;
      this.graphHotTab = false;
      network.get("/api/search/findByName?name=" + userInfo.company).then(res => {
        if (res.data) {
          this.searchNodeId = res.data.company.id;
          this.searchName = res.data.company.name;
          this.listHistory = false;
          this.selectPath = false;
          this.loadDepartInfo(res.data.company);
        }
      });
    },
    userPathCompany: function(userInfo) {
      network.get("/api/search/findByName?name=" + userInfo.company).then(res => {
        if (res.data) {
          if (this.startNodeName == "") {
            this.startNodeName = res.data.company.name;
            this.startNodeId = res.data.company.id;
          } else {
            this.endNodeName = res.data.company.name;
            this.endNodeId = res.data.company.id;
          }
        }
      });
    },
    elRate: function() {
      this.limitScore = false;
    },
    errorChange: function() {
      this.errorRange = false;
    },
    //视角切换
    formatGraphViewData: function(data) {
      if (Array.isArray(data.list) && Array.isArray(data.links)) {
        let searchNodeId = this.$data.searchNodeId || this.$data.centerNodeId;
        let fakeNode = {};
        let links = [];
        let nodes = data.list.map(node => {
          if (node.id == searchNodeId) {
            return {
              id: searchNodeId,
              // linkType: type,
              name: 1,
              isReal: false,
              moreLinks: [],
              moreNodes: [], ...node
            };
          } else {
            return { isReal: true, ...node };
          }
        });
        data.links.forEach(link => {
          let { fromId, toId, type, ...rest } = link;
          let tempId = "";
          // 过滤自指向关系
          if (fromId === toId) return;
          // 起点为中心点
          if (fromId === searchNodeId) {
            tempId = `$${type}$`;
            if (type == "Investment") {
              if (!fakeNode[tempId]) {
                fakeNode[tempId] = {
                  id: tempId,
                  linkType: type,
                  name: 1,
                  isReal: false,
                  // 图谱使用中心点模式，只要没有从中心点直接或间接连过去线，这样的点都不会显示
                  moreNodes: [],
                  moreLinks: []
                };
                links.push(
                  {
                    from: fromId,
                    to: toId,
                    isReal: true,
                    type,
                    ...rest
                  }
                );
              } else {
                fakeNode[tempId].name += 1;
                // 超过8个的关系
                if (fakeNode[tempId].name > 8) {
                  //遍历所有的nodes找到中心点
                  nodes.map(node => {
                    if (node.id == searchNodeId) {
                      node.moreLinks.push({
                        from: fromId,
                        to: toId,
                        isReal: true,
                        type,
                        ...rest
                      })
                    }
                  })
                } else {
                  links.push({
                    from: fromId,
                    to: toId,
                    isReal: true,
                    type,
                    ...rest
                  });
                }
              }
            }
          }
          // else if (toId === searchNodeId) {
          //   // 终点为中心点
          //   tempId = `$${type}$`;
          //   if (type == "Investment") {
          //     if (!fakeNode[tempId]) {
          //       fakeNode[tempId] = {
          //         id: tempId,
          //         linkType: type,
          //         name: 1,
          //         isReal: false,
          //         moreNodes: [],
          //         moreLinks: []
          //       };
          //       links.push(
          //         // {
          //         //   from: fromId,
          //         //   to: toId,
          //         //   id: tempId,
          //         //   isReal: false,
          //         //   type
          //         // },
          //         {
          //           from: fromId,
          //           to: toId,
          //           isReal: true,
          //           type,
          //           ...rest
          //         }
          //       );
          //     } else {
          //       fakeNode[tempId].name += 1;
          //       // 超过8个的关系
          //       if (fakeNode[tempId].name > 8) {
          //         nodes.map(node => {
          //           if (node.id == this.searchNodeId) {
          //             node.moreLinks.push({
          //               from: fromId,
          //               to: toId,
          //               isReal: true,
          //               type,
          //               ...rest
          //             })
          //           }
          //         })
          //       } else {
          //         links.push({
          //           from: fromId,
          //           to: toId,
          //           isReal: true,
          //           type,
          //           ...rest
          //         });
          //       }
          //     }
          //   }
          // } 
          else {
            links.push({ from: fromId, to: toId, isReal: true, type, ...rest });
          }
        });
        return { nodes, links };
      } else {
        return { nodes: [], links: [] };
      }
    },

    formatGraphViewStyle: function(data) {
      let searchNodeId = this.$data.searchNodeId || this.$data.centerNodeId;
      data.nodes.forEach(node => {
        node.loaded = true;
        node.style = {
          label: node.name
        };
        if (node.tag in graphNode) {
          Object.assign(node.style, graphNode[node.tag]);
        } else {
          Object.assign(node.style, graphNode.default);
        }
        if (node.uboTag == "Top" && node.type == "Nature") {
          Object.assign(node.style, graphNode.uboTop);
        } else if (node.type == "Nature" && node.uboTag != "Top") {
          Object.assign(node.style, graphNode.Nature);
        }
        node.style.items = [];
        if (node.id == searchNodeId) {
          if (node.moreLinks.length) {
            node.style.items.push({
              text: "+",
              px: 1,
              py: -0.3,
              scaleWithZoom: true,
              backgroundStyle: {
                fillColor: "transparent"
              },
              textStyle: {
                font: "16px Arial",
                fillColor: "#FE7011"
              }
            });
          }
          node.style.items.push({
            image: position,
            px: 1,
            py: -0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });

        }
        if (node.discredit == "true") {
          node.style.items.push({
            image: discredit,
            px: -0.8,
            py: 0.8,
            scaleWithZoom: true,
            scaleWithSize: true,
            hoverEffect: false,
            backgroundStyle: {
              fillColor: "transparent"
            },
          });
        }
      });
      data.links.forEach(link => {
        link.style = {};
        switch (link.type) {
          case "Investment":
            Object.assign(link.style, graphLink[link.type]);
            if (link.score) {
              link.style.label = `${link.score}%`;
            }
            break;
          case "Guarantee":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal) {
              // link.style.label = link.tag;
            }
            break;
          case "Guaranteeed":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal) {
              link.style.label = link.tag;
            }
            break;
          case "Hide":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal && link.tag) {
              link.style.label = link.tag;
            }
            break;
          case "Control":
            Object.assign(link.style, graphLink[link.type]);
            if (link.isReal) {
              link.style.label = "";
            }
            break;
          default:
            Object.assign(link.style, graphLink.default);
        }
      });
      return data;
    },
    graphUp: function() {
      if (this.views == 1 || this.views == "") {
        this.graphStop = false;
        this.loadDepartInfo(this.$data.centerNodeId);
        this.graphLoading = true;
      } else if (this.views == 2) {
        this.graphStop = false;
        this.selectView("2")
      } else if (this.views == 3) {
        this.selectView("3")
      } else if (this.views == 4) {
        this.selectView("4")
      } else if (this.views == 5) {
        this.selectView("5")
      }
    },
    selectView: function(i) {
      // this.selectValue = i;
      if (i == 1) {
        this.graphStop = false;
        this.actualController = true;
        this.uboTop = [];
        this.graphLoading = true;
        //返回企业视角        
        this.loadDepartInfo(this.$data.centerNodeId);
      } else if (i == 2) {
        this.graphStop = false;
        this.graphLoading = true;
        //集团视角
        network.post("/api/relationship/findGroupList", {
          id: this.searchNodeId || this.$data.centerNodeId,
          guestRange: "Group"
        }).then(res => {
          if (res.data) {
            this.uboTop = [];
            this.actualController = true;
            this.initializeGraph();
            let graphData = this.formatGraphViewData(res.data);
            this.graphLoading = false;
            this.graphView = true;
            // this.centerNodeId = res.data.tag[0].id;
            //无数据时展示
            if (!res.data.links.length) {
              // this.graphView = false;
              let obj = { id: 1, name: "暂无数据" };
              let noData = [];
              noData.push(obj);
              this.graphInstance.replaceData(this.noDataGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              this.$data.originalGraphData = res.data;
              this.graphInstance.replaceData(this.formatGraphViewStyle(graphData));
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "focusnodes",
                  numberOfFocusNodes: 1,
                  focusNodeExpansionRadius: 1,
                  initialNodes: [this.$data.searchNodeId || this.$data.centerNodeId]
                },
                style: {
                  selection: {
                    enabled: true
                  }
                }
              });
              this.graphInstance.off("rightClick", this.graphHotClickEvent);
              // 点击显示/隐藏浮框
              this.graphInstance.on("rightClick", this.graphClickEvent);
              // 图谱拖动隐藏浮框
              this.graphInstance.on("pointerDrag", this.graphDragEvent);
              this.graphInstance.on("click", this.graphLeftClick);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent)
            }
          }
        })
          .catch(error => {
            this.requestTimeout()
          })
      } else if (i == 3) {
        //最终控制人视角
        this.graphStop = false;
        this.graphLoading = true;
        network.post("/api/relationship/findControlList", {
          id: this.searchNodeId || this.$data.centerNodeId,
          guestRange: "Control"
        }).then(res => {
          if (res.data) {
            this.uboTop = [];
            this.actualController = true;
            this.initializeGraph();
            this.$data.originalGraphData = res.data;
            let graphData = this.formatGraphViewData(res.data);
            this.graphLoading = false;
            this.graphView = true;
            //无数据时展示
            if (!res.data.links.length) {
              // this.graphView = false;
              let obj = { id: 1, name: "暂无数据" };
              let noData = [];
              noData.push(obj);
              this.graphInstance.replaceData(this.noDataGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              this.graphInstance.replaceData(this.formatGraphViewStyle(graphData));
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "focusnodes",
                  numberOfFocusNodes: 1,
                  focusNodeExpansionRadius: 1,
                  initialNodes: [this.$data.searchNodeId || this.$data.centerNodeId]
                },
                style: {
                  selection: {
                    enabled: true
                  }
                }
              });
              this.graphInstance.off("rightClick", this.graphHotClickEvent);
              // 点击显示/隐藏浮框
              this.graphInstance.on("rightClick", this.graphClickEvent);
              // 图谱拖动隐藏浮框
              this.graphInstance.on("pointerDrag", this.graphDragEvent);
              this.graphInstance.on("click", this.graphLeftClick);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent)
            }
          }
        })
          .catch(error => {
            this.requestTimeout()
          })
      } else if (i == 4) {
        //最终受益人视角
        this.graphStop = false;
        this.graphLoading = true;
        network.post("/api/relationship/findBenefitList", {
          id: this.searchNodeId || this.$data.centerNodeId,
          guestRange: "Benefit"
        }).then(res => {
          if (res.data) {
            this.uboTop = [];
            this.actualController = true;
            this.initializeGraph();
            this.$data.originalGraphData = res.data;
            let graphData = this.formatGraphViewData(res.data);
            this.graphLoading = false;
            this.graphView = true;
            //无数据时展示
            if (!res.data.links.length) {
              // this.graphView = false;
              let obj = { id: 1, name: "暂无数据" };
              let noData = [];
              noData.push(obj);
              this.graphInstance.replaceData(this.noDataGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              this.graphInstance.replaceData(this.formatGraphViewStyle(graphData));
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "focusnodes",
                  numberOfFocusNodes: 1,
                  focusNodeExpansionRadius: 1,
                  initialNodes: [this.$data.searchNodeId || this.$data.centerNodeId]
                },
                style: {
                  selection: {
                    enabled: true
                  }
                }
              });
              this.graphInstance.off("rightClick", this.graphHotClickEvent);
              // 点击显示/隐藏浮框
              this.graphInstance.on("rightClick", this.graphClickEvent);
              // 图谱拖动隐藏浮框
              this.graphInstance.on("pointerDrag", this.graphDragEvent);
              this.graphInstance.on("click", this.graphLeftClick);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent)
            }
          }
        })
          .catch(error => {
            this.requestTimeout()
          })
      } else if (i == 5) {
        //强经济圈视角
        this.graphStop = false;
        this.graphLoading = true;
        network.post("/api/relationship/findEconomicList", {
          id: this.searchNodeId || this.$data.centerNodeId,
          guestRange: "Economic"
        }).then(res => {
          if (res.data) {
            this.uboTop = res.data.tag;
            this.initializeGraph();
            this.$data.originalGraphData = res.data;
            let graphData = this.formatGraphViewData(res.data);
            this.graphLoading = false;
            this.graphView = true;
            //无数据时展示
            if (!res.data.links.length) {
              // this.graphView = false;
              let obj = { id: 1, name: "暂无数据" };
              let noData = [];
              noData.push(obj);
              this.graphInstance.replaceData(this.noDataGraphStyle(noData))
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "showall"
                },
                interaction: {
                  selection: {
                    dragSelect: true
                  }
                },
                style: {
                  selection: {
                    enabled: false
                  }
                }
              });
              this.graphInstance.on("pointerDrag");
            } else {
              if (res.data.tag.length >= 1) {
                this.actualController = false;
              } else {
                this.actualController = true;
              }
              this.graphInstance.replaceData(this.formatGraphViewStyle(graphData));
              this.graphInstance.replaceSettings({
                navigation: {
                  mode: "focusnodes",
                  numberOfFocusNodes: 1,
                  focusNodeExpansionRadius: 1,
                  initialNodes: [this.$data.searchNodeId || this.$data.centerNodeId]
                },
                style: {
                  selection: {
                    enabled: true
                  }
                }
              });
              this.graphInstance.off("rightClick", this.graphHotClickEvent);
              // 点击显示/隐藏浮框
              this.graphInstance.on("rightClick", this.graphClickEvent);
              // 图谱拖动隐藏浮框
              this.graphInstance.on("pointerDrag", this.graphDragEvent);
              this.graphInstance.on("click", this.graphLeftClick);
              this.graphInstance.on("doubleClick", this.graphDoubleEvent)
            }
          }
        })
          .catch(error => {
            this.requestTimeout()
          })
      }
    },
    colseTips: function() {
      this.showAdmin = false;
      this.listUl = false;
      this.companyList = false;
      this.listHistory = false;
      this.searchHistory = false;
      this.startList = false;
      this.listHistoryCompany = false;
      this.listHistoryPath = false;
      this.endList = false;
      // this.graphModeCompany = false;
    },
    JurisdictionApi: function(id) {
      network
        .get("/api/menu/findPermissionByUser?id=" + id)
        .then(res => {
          if (res.data.error == "EmptyUserOrRole" || res.data.error == "LackOfParameter" || res.data.error == "NoCompanyView") {
            this.requestTimeout();
            return;
          } else {
            this.Viewoption = res.data.viewoption;
            this.result = res.data.relationpermission;
            this.downloadShow = res.data.datadownload[0].show;
            this.tagpermission = res.data.tagpermission[0].show;
          }
        });
    },
    requestTimeout: function() {
      this.apiOvertime = true;
      this.graphLoading = false;
      var self = this;
      setTimeout(function() {
        self.apiOvertime = false
      }, 5000);
      this.initializeGraph();
      let obj = { id: 1, name: "暂无数据" };
      let noData = [];
      noData.push(obj);
      this.graphInstance.replaceData(this.noDataGraphStyle(noData))
      this.graphInstance.replaceSettings({
        navigation: {
          mode: "showall"
        },
        interaction: {
          selection: {
            dragSelect: true
          }
        },
        style: {
          selection: {
            enabled: false
          }
        }
      });
      this.graphInstance.on("pointerDrag");
    },
    requestTimeoutss: function() {
      this.initializeGraph();
      this.graphLoading = false;
      let obj = { id: 1, name: "暂无数据" };
      let noData = [];
      noData.push(obj);
      this.graphInstance.replaceData(this.noDataGraphStyle(noData))
      this.graphInstance.replaceSettings({
        navigation: {
          mode: "showall"
        },
        interaction: {
          selection: {
            dragSelect: true
          }
        },
        style: {
          selection: {
            enabled: false
          }
        }
      });
      this.graphInstance.on("pointerDrag");
    }
  },


  mounted: function() {
    //本地测试需打开，本机无权限接口
    this.$data.downloadShow = true;
    this.$data.tagpermission = true;
    this.$data.result = [
      {
        type: "Investment",
        label: "投资",
        show: true,
        count: 0
      },
      {
        type: "Guarantee",
        label: "增信",
        show: true,
        count: 0
      },
      {
        type: "Hide",
        label: "高管",
        show: true,
        count: 0
      },
      {
        type: "Guaranteeed",
        label: "被增信",
        show: true,
        count: 0
      },
      {
        type: "Investmented",
        label: "股东",
        show: true,
        count: 0
      },
      {
        type: "Control",
        label: "控制",
        show: true,
        count: 0
      },
    ];
    this.$data.Viewoption = [{
      views: '1',
      label: '企业视角',
      show: true
    }, {
      views: '2',
      label: '集团视角',
      show: true
    }, {
      views: '3',
      label: '最终控制人视角',
      show: true
    }, {
      views: '4',
      label: '最终受益人视角',
      show: true
    }, {
      views: '5',
      label: '强经济圈视角',
      show: true
    }];


    // 开发测试：右键打印当前节点/连线
    // this.graphInstance.on("rightClick", this.commonRightClickEvent);
    if (this.$data.isReferenced) {
      var query = this.$route.query;
      this.initializeGraph();
      if (query.mode == 1) {
        if (query.creditno || query.orgcode || query.name) {
          getCompanyInfo({
            type: "Company",
            creditno: query.creditno,
            orgcode: query.orgcode,
            name: query.name
          }).then(res => {

            //---------
            // if (res.data.UBOId && res.data.companyId) {
            //   this.$data.UBOId = res.data.UBOId;
            //   this.$data.centerNodeId = res.data.companyId;
            //   //权限接口
            //   network
            //     .get("/api/menu/findPermissionByUser?id=" + this.$data.centerNodeId)
            //     .then(res => {
            //       if (res.data.error == "EmptyUserOrRole" || res.data.error == "LackOfParameter" || res.data.error == "NoCompanyView") {
            //         this.requestTimeoutss();
            //         return;
            //       } else {
            //         this.Viewoption = res.data.viewoption;
            //         this.result = res.data.relationpermission;
            //         this.downloadShow = res.data.datadownload[0].show;
            //         this.tagpermission = res.data.tagpermission[0].show;
            //         this.drawGraph();                    
            //       }
            //     });
            //   // this.drawGraph();
            // } else {
            //   // this.drawGraph();
            //   //权限接口
            //   network
            //     .get("/api/menu/findPermissionByUser?id=" + this.$data.centerNodeId)
            //     .then(res => {
            //       if (res.data.error == "EmptyUserOrRole" || res.data.error == "LackOfParameter" || res.data.error == "NoCompanyView") {
            //         this.requestTimeoutss();
            //         return;
            //       } else {
            //         this.Viewoption = res.data.viewoption;
            //         this.result = res.data.relationpermission;
            //         this.downloadShow = res.data.datadownload[0].show;
            //         this.tagpermission = res.data.tagpermission[0].show;
            //         this.drawGraph();                    
            //       }
            //     })
            // }

            //本地测试打开------
            if (res.data.UBOId && res.data.companyId) {
              this.$data.UBOId = res.data.UBOId;
              this.$data.centerNodeId = res.data.companyId;
              this.drawGraph();
            } else {
              this.drawGraph();
            }

          });
        } else {
          console.warn("参数错误");
        }
      }
      if (query.mode == 2) {
        if (
          (query.creditno || query.orgcode || query.name) &&
          (query.creditno2 || query.orgcode2 || query.name2)
        ) {
          var startInfo = {
            type: "Company",
            creditno: query.creditno,
            orgcode: query.orgcode,
            name: query.name
          };
          var endInfo = {
            type: "Company",
            creditno: query.creditno2,
            orgcode: query.orgcode2,
            name: query.name2
          };
          network
            .all([getCompanyInfo(startInfo), getCompanyInfo(endInfo)])
            .then(res => {
              if (res[0].data.companyId && res[1].data.companyId) {
                this.$data.startNodeId = res[0].data.companyId;
                this.$data.endNodeId = res[1].data.companyId;
                this.$data.selectPath = true;
                this.pathApi(this.$data.pathValue);
              } else {
                this.pathApi(this.$data.pathValue);
              }
            });
        } else {
          console.warn("参数错误");
        }
      }
    } else {
      this.drawGraphHot();
    }
    // 图谱resize
    var resizeHandler = debounce(() => {
      this.graphInstance &&
        this.graphInstance.updateSettings({
          area: {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth
          }
        });
      this.fullscreen = isFullscreen();
    }, 500);
    window.addEventListener("resize", resizeHandler, false);

    // 三码查询
    function getCompanyInfo(data = {}) {
      return network.post("/api/search/findDepartForBank", data);
    }
  },
  components: {
    Arrow,
    RelationIntroduction
  }
};
</script>

<style>
.home-wrapper {
  position: relative;
  min-height: 100vh;
  z-index: 1;
}

.graph-wrapper {
  background: #fff;
  z-index: 20;
}

.condition-wrapper {
  position: absolute;
  left: 20px;
  top: 0;
  width: 320px;
  z-index: 10;
}

.graph-switch {
  position: relative;
  box-sizing: border-box;
  width: 160px;
  height: 30px;
  line-height: 30px;
  margin: 18px auto;
  border: 1px solid #fe7011;
  font-size: 14px;
  background: #fff;
}

.graph-switch>span {
  display: inline-block;
  width: 50%;
  height: 28px;
  background: #fff;
  cursor: pointer;
  color: #fe7011;
}

.graph-switch>span.active {
  color: #fff;
  background-color: #fe7011;
}

.graph-search .el-button {
  border-color: #fe7011 !important;
  padding: 5px 11px 9px 11px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: transparent;
}

.graph-search .el-button>.el-icon-search {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  vertical-align: text-bottom;
}

.graph-search-start>input {
  border-bottom-left-radius: 0;
}

.graph-search-start>input:hover,
.graph-search-start>input:focus {
  border-color: #dcdfe6;
  border-bottom-color: transparent;
}

.relation-condition {
  position: relative;
}

.relation-condition .graph-search-end {
  width: 279px;
  margin-right: 41px;
  margin-top: -1px;
}

.graph-search-end>input {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-color: transparent;
}

.graph-search-end>input:hover,
.graph-search-end>input:focus {
  border-color: #dcdfe6;
  border-top-color: transparent;
}

.graph-search-start .point,
.graph-search-end .point {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  width: 20px;
  text-align: center;
  font-style: normal;
}

.graph-search-start .point {
  color: #589b5b;
}

.graph-search-end .point {
  color: #bf5b5b;
}

.relation-condition .split-line {
  position: absolute;
  width: 220px;
  height: 0;
  border-top: 1px solid #ddd;
  top: 31px;
  left: 30px;
}

.legend-wrapper {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 275px;
  height: auto;
  overflow: hidden;
  z-index: 30;
}

.legend-wrapper .update-time {
  float: left;
  width: 100%;
  margin: 4px 0 10px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: right;
}

.legend-wrapper .graph-toolbar {
  float: left;
  width: 24px;
  height: 154px;
  margin: 0;
  padding: 0;
  padding-top: 75px;
  box-sizing: border-box;
}

.graph-toolbar>li {
  list-style: none;
  width: 24px;
  height: 24px;
  margin-top: 4px;
  box-sizing: border-box;
  border-radius: 1px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  background-size: 26px 26px;
  background-repeat: no-repeat;
  background-position: -2px -1px;
}

.graph-toolbar>li:hover {
  border-color: #fe7011;
}

.graph-toolbar>li.tool-text {
  border: none;
  font-size: 12px;
  height: auto;
  background: none;
}

.graph-toolbar>li.investment-ratio {
  background-image: url(../assets/images/icon_shaixuan@2x.png);
}

.graph-toolbar>li.graph-refresh {
  background-image: url(../assets/images/icon_refresh@2x.png);
}

.graph-toolbar>li.report-error {
  background-image: url(../assets/images/icon_baocuo@2x.png);
}

.graph-toolbar>li.graph-normalscreen {
  background-position: -2px -2px;
  background-image: url(../assets/images/icon_normalscreen@2x.png);
}

.graph-toolbar>li.graph-fullscreen {
  background-position: -2px -2px;
  background-image: url(../assets/images/icon_fullscreen@2x.png);
}

.graph-toolbar>li.investment-ratio:hover {
  background-image: url(../assets/images/icon_shaixuan_hover@2x.png);
}

.graph-toolbar>li.graph-refresh:hover {
  background-image: url(../assets/images/icon_refresh_hover@2x.png);
}

.graph-toolbar>li.report-error:hover {
  background-image: url(../assets/images/icon_baocuo_hover@2x.png);
}

.graph-toolbar>li.graph-normalscreen:hover {
  background-image: url(../assets/images/icon_normalscreen_hover@2x.png);
}

.graph-toolbar>li.graph-fullscreen:hover {
  background-image: url(../assets/images/icon_fullscreen_hover@2x.png);
}

.legend-wrapper .graph-legend {
  float: right;
  width: 234px;
  height: auto;
  box-sizing: border-box;
  border: 1px solid #eee;
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgba(238, 238, 238, 0.5);
  border-radius: 2px;
  background: #fff;
}

.graph-legend-title {
  margin: 8px 10px 6px;
  text-align: left;
}

.graph-legend-title i.graph-legend-popper {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 2px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 12px;
  font-style: normal;
  color: #bbb;
  cursor: pointer;
}

.graph-legend-content {
  margin: 0 10px;
  padding: 0;
  overflow: hidden;
  padding-bottom: 10px;
}

.graph-legend-content>li {
  list-style: none;
  float: left;
  width: 50%;
  margin-bottom: 2px;
  box-sizing: border-box;
  text-align: left;
}

.relation-intro {
  background: #f9f9f9 !important;
}

.graph-legend-content>li>img {
  height: 12px;
}

.share-ratio {
  width: 164px;
  height: 79px;
  border: 1px solid #eeeeee;
  box-shadow: 0 1px 4px 0;
  position: absolute;
  right: 320px;
  bottom: 68px;
  font-size: 12px;
  color: #333333;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(238, 238, 238, 0.5);
  z-index: 50;
}

.share-ratio>p:first-child {
  font-size: 12px;
  color: #333333;
  text-align: center;
  padding-bottom: 3px;
}

.share-ratio .ratio-span {
  float: left;
  margin-left: 15px;
  margin-top: 6px;
}

.share-ratio .ratio-determine {
  float: right;
  border: 1px solid #eee;
  padding: 5px;
  margin-right: 5px;
  border-radius: 2px;
  cursor: pointer;
}

.share-ratio input {
  width: 56px;
  float: left;
  height: 22px;
  padding-left: 8px;
  outline: #fe7011;
}

.share-ratio input::-webkit-input-placeholder {
  text-align: right;
}

.graph-popup {
  box-sizing: border-box;
  position: fixed;
  width: 170px;
  margin: 0;
  padding: 14px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px 0 rgba(238, 238, 238, 0.5);
  border-radius: 2px;
  z-index: 100;
}

.graph-popup>li {
  padding: 4px 0;
  list-style: none;
  text-align: left;
  font-size: 12px;
  color: #151515;
}

.graph-popup>li>label {
  color: #666;
}

.graph-popup .groph-popup-button {
  width: 100%;
  padding-top: 9px;
  padding-bottom: 9px;
  border: none;
}

.el-button--primary {
  background-color: #ff6505 !important;
  /* background-image: linear-gradient(90deg, #ff9e4c 3%, #fe7011 50%) !important; */
}

.el-button--primary:focus,
.el-button--primary:hover {
  /* background-image: linear-gradient(90deg, #ff9e4c 3%, #fe7011 50%) !important; */
}

.home-wrapper .admin {
  position: absolute;
  top: 0px;
  right: -10px;
  margin: 18px 20px 0 0;
  z-index: 10;
}

.home-wrapper .admin>img {
  float: right;
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.home-wrapper .admin-conter {
  width: 200px;
  height: 118px;
  margin-left: 30px;
  margin-top: 26%;
  box-shadow: 0 2px 4px 0 rgba(238, 238, 238, 0.5);
  border-radius: 2px;
}

.home-wrapper .admin-title {
  font-size: 12px;
  height: 55px;
  background-color: #ff9e4c;
  color: #ffffff;
  padding-left: 5px;
  text-align: left;
}

.home-wrapper .admin-title>span {
  display: block;
  padding: 6px 0 5px 8px;
  font-size: 15px;
  color: #FFFFFF;
}

.home-wrapper .admin-title>p {
  margin: 0;
  padding-left: 8px;
  font-size: 12px;
  color: #FFFFFF;
}

.home-wrapper .admin-tel {
  height: 30px;
  line-height: 33px;
  color: #333333;
  font-size: 12px;
  padding-left: 8px;
  text-align: left;
  background: #ffffff;
}

.home-wrapper .admin-tel .admin-tel-img {
  float: left;
  padding-right: 10px;
  color: #333333;
  margin-top: 10px;
}

.home-wrapper .admin-tel button {
  line-height: 30px;
  padding: 0px;
}

.home-wrapper .admin-out {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

.home-wrapper .admin-out>span {
  font-size: 12px;
  line-height: 30px;
  color: #999999;
  cursor: pointer;
}

.home-wrapper .admin .u-tri::before {
  position: absolute;
  right: 8%;
  top: 45px;
  content: "";
  border-bottom: 8px solid #ff9e4c;
  border-top: 8px solid transparent;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

ul li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.search-results {
  position: relative;
  left: 0px;
  background: #fff;
  border: solid 1px #ccc;
  max-height: 360px;
  overflow-y: scroll;
  width: 276px;
  z-index: 1;
  margin-top: 5px;
  padding: 0px;
}

.search-results li {
  width: 92%;
  position: relative;
  margin: 10px 0px 10px 10px;
  border: 1px dashed #ccc;
  display: block;
  float: left;
  cursor: pointer;
}

.search-results li .search-span {
  float: left;
  font-size: 12px;
  color: #666;
  width: 180px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 2px;
}

.search-results li .pull-right {
  float: right;
  font-size: 12px;
  color: #666;
  margin-right: 20px;
}

.search-results li img {
  float: left;
  margin-top: 4px;
  padding-right: 10px;
  padding-left: 6px;
}

.search-hot {
  position: relative;
  left: 0px;
  background: #fff;
  border: solid 1px #ccc;
  max-height: 360px;
  overflow-y: scroll;
  width: 276px;
  z-index: 1;
  margin-top: 5px;
  padding: 0px;
}

.search-hot li {
  width: 92%;
  position: relative;
  margin: 10px 0px 10px 10px;
  display: block;
  float: left;
  cursor: pointer;
}

.search-hot li .search-span {
  float: left;
  font-size: 12px;
  color: #666;
  width: 180px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-hot li .pull-right {
  float: right;
  font-size: 12px;
  color: #666;
  margin-right: 20px;
}

.search-hot li img {
  float: left;
  margin-top: 2%;
  padding-right: 10px;
}

.search-delete {
  position: absolute;
  left: 0px;
  bottom: -40px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  max-height: 360px;
  overflow-y: scroll;
  width: 276px;
  z-index: 1;
  margin-top: 5px;
  padding: 0px;
}

.search-delete-path {
  position: absolute;
  left: 0px;
  bottom: -57px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(204, 204, 204);
  max-height: 360px;
  overflow-y: scroll;
  width: 276px;
  z-index: 1;
  margin-top: 5px;
  padding: 0px;
}

.search-delete-path .deleteHistory {
  text-align: right;
  height: 40px;
  line-height: 40px;
  width: 94%;
  font-size: 9px;
  color: #999999;
  cursor: pointer;
}

.search-delete .deleteHistory {
  text-align: right;
  height: 40px;
  line-height: 40px;
  width: 94%;
  font-size: 9px;
  color: #999999;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.hot-follow {
  position: absolute;
  top: 47px;
  left: 44%;
  box-sizing: border-box;
  width: 210px;
  line-height: 30px;
  margin: 18px auto;
  z-index: 10;
  font-size: 22px;
  color: #ff8737;
}

.graph-tab {
  position: absolute;
  top: 47px;
  left: 46%;
  box-sizing: border-box;
  width: 210px;
  line-height: 30px;
  margin: 18px auto;
  font-size: 14px;
  z-index: 10;
}

.graph-tab>span:first-child {
  right: -16px;
  border-right: 1px solid #fe7011;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.graph-tab>span {
  position: absolute;
  top: 0;
  width: 120px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  color: #fe7011;
  text-align: center;
  border-top: 1px solid #fe7011;
  border-bottom: 1px solid #fe7011;
  background-color: #fff;
}

.graph-tab>span.active {
  color: #fff;
  background-color: #fe7011;
}

.graph-tab>span:last-child {
  left: -16px;
  border-left: 1px solid #fe7011;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.graph-mode-company {
  width: 276px;
  height: auto;
  padding-bottom: 10px;
  background: #fff;
  border: 1px solid #eee;
}

.graph-mode-company>p {
  height: 30px;
  background: #ff9e4c;
  font-size: 15px;
  color: #fff;
  text-align: center;
  margin: 0px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.graph-mode-company>ul {
  margin: 0px;
  padding: 0px;
}

.graph-mode-company>ul>li {
  text-align: left;
  font-size: 12px;
  color: #666;
  padding: 11px 0px 0px 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.graph-mode-company>ul>li:first-child>span {
  color: #151515;
}

.graph-mode-company>ul>li:last-child>span {
  color: #ff9e4c;
}

.graph-mode-company-p {
  display: inherit;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 138px;
  margin: 0;
  color: #ff9e4c;
  margin-top: 2px;
}

.contact-us {
  height: 450px;
  border-radius: 6px !important;
}

.contact-us .el-textarea textarea::-webkit-input-placeholder {
  color: #9f9f9f;
  font-size: 12px;
}

.contact-us .el-dialog__body {
  font-size: 12px;
}

.contact-us .el-dialog__header {
  height: 48px;
  line-height: 48px;
  background: #ff9e4c;
  padding: 0px;
  border-radius: 6px 6px 0 0;
}

.contact-us .el-dialog__body {
  color: #151515;
  padding-bottom: 23px !important;
}

.contact-us .el-dialog__header>span {
  font-size: 18px;
  color: #ffffff;
}

.contact-us .el-dialog__header>button {
  display: none;
}

.contact-us .hfd-group {
  font-size: 15px;
}

.limit {
  margin-top: 10px;
  display: block;
  float: left;
}

.contact-us .dialog-footer>button {
  padding: 10px 28px;
  color: #fff;
  background-color: #ff9e4c !important;
  border-color: #ff9e4c;
}

.report-errors {
  width: 470px !important;
  height: auto;
  border-radius: 6px !important;
}

.report-errors .el-radio-button {
  margin-left: 5px;
}

.report-errors .el-dialog__header {
  height: 48px;
  line-height: 48px;
  background: #ff9e4c;
  padding: 0px;
  border-radius: 6px 6px 0 0;
}

.report-errors .el-dialog__header>span {
  font-size: 15px;
  color: #ffffff;
}

.report-errors .el-dialog__header>button {
  display: none;
}

.report-errors .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #ffffff;
}

.report-errors .el-checkbox.is-bordered.is-checked {
  background: #ff9e4c;
}

.report-errors .el-checkbox.is-bordered.is-checked {
  border-color: #ff9e4c;
}

.report-errors .dialog-footer>button {
  padding: 10px 28px;
  margin: 10px 40px;
  color: #fff;
  background-color: #ff9e4c !important;
  border-color: #ff9e4c;
}

.report-errors .el-radio__inner {
  opacity: 0;
  outline: none;
  position: absolute;
  margin: 0;
  z-index: -1;
  display: none;
}

.report-errors .el-radio.is-bordered {
  padding: 10px 33px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 20px;
}

.report-errors .el-radio__label {
  padding-left: 0px;
}

.report-errors .clear-left {
  margin-left: 0px !important;
}

.report-errors .clear-width {
  padding: 10px 40px !important;
}

.report-errors .el-textarea__inner {
  height: 80px !important;
}

.contact-us .el-textarea__inner {
  height: 70px !important;
}

.graph-logo {
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 95px;
  cursor: pointer;
  z-index: 30;
}

.start-correct {
  margin-top: 10px;
  width: 220px;
  font-size: 12px;
  color: #fe7011;
  text-align: left;
}

.select-path {
  position: absolute;
  right: 82px;
  top: 22px;
  z-index: 99;
}

.select-path .el-select {
  width: 130px;
}

.select-path .el-select input::-webkit-input-placeholder {
  color: #606266;
}

.select-view {
  position: absolute;
  right: 77px;
  top: 22px;
  z-index: 99;
}

.select-view .el-select {
  width: 149px;
  font-size: 9px;
  color: #666666;
}

.select-view .el-select input::-webkit-input-placeholder {
  color: #606266;
}


.path-null {
  position: absolute;
  top: 50%;
  left: 50%;
}

.path-null span {
  position: relative;
  left: -100px;
  top: 45px;
}

.guess-like {
  position: absolute;
  top: 50%;
  left: 50%;
}

.guess-like span {
  position: relative;
  left: -127px;
  top: 45px;
}

.hotspot-follow {
  width: 90%;
  height: 600px;
  margin: 0 auto;
  padding-top: 10%;
}

.hotspot-follow .hotspot-left {
  width: 45%;
  height: 100%;
  float: left;
  padding: 0px;
}

.hotspot-follow .hotspot-left li {
  height: 34px;
  width: 100%;
  font-size: 16px;
  color: #666666;
  letter-spacing: 0.22px;
  text-align: center;
  margin: 20px 0px;
  line-height: 34px;
  transition-delay: 100ms;
  transition-duration: 500ms;
}

.hotspot-follow .hotspot-right {
  width: 45%;
  height: 100%;
  float: right;
}

.hotspot-follow ul li span {
  float: left;
  margin-left: 20px;
  color: #999999;
}

.hotspot-follow .hotspot-right li {
  height: 34px;
  width: 100%;
  font-size: 16px;
  color: #666666;
  letter-spacing: 0.22px;
  text-align: center;
  margin: 20px 0px;
  line-height: 34px;
  transition-delay: 100ms;
  transition-duration: 500ms;
}

.hotspot-follow ul li span {
  float: left;
  margin-left: 20px;
  color: #999999;
}

.hotspot-follow ul li:hover span {
  display: none;
}

.hotspot-follow ul li:hover {
  background: #FF8737 !important;
  box-shadow: 0 2px 4px 0 rgba(255, 204, 186, 0.50) !important;
  width: 96%;
  height: 40px;
  transform: scale(1.2);
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  margin-left: 3%;
  cursor: pointer;
  transition-delay: 100ms;
  transition-duration: 500ms;
}

.tel-rate .el-rate__icon {
  font-size: 22px;
  margin-right: 6px;
  margin-top: -3px;
}

.hotspot-follow ul li:nth-of-type(odd) {
  background: #fafafa;
}

.hotspot-follow ul li:nth-of-type(even) {
  background: #eeeeee;
}

.error-thank .el-button {
  padding: 8px 30px;
  border-radius: 100px;
}

.error-thank .el-dialog__header {
  height: 36px;
  background: #FF9E4C;
  padding: 0px;
  border-radius: 2px !important;
}

.error-thank .el-dialog__title {
  font-size: 15px;
  color: #FFFFFF;
  text-align: center;
  line-height: 36px;
}

.error-thank .el-dialog__headerbtn {
  top: 6px;
  color: #fff;
}

.error-thank .el-dialog__body {
  padding: 22px 22px 18px !important;
  font-size: 12px;
  color: #333333;
}

.error-thank .el-button {
  background: #FF9E4C;
  border-radius: 2px;
  width: 80px;
  height: 25px;
  line-height: 25px;
  padding: 0px;
  font-size: 12px;
  color: #fff;
}

.error-thank .el-dialog__footer {
  padding-bottom: 13px;
}

.error-thank .el-button:hover {
  background: #FF9E4C;
  color: #fff;
}

.error-thank .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  margin-top: 4px;
}

.error-thank .el-dialog__headerbtn .el-dialog__close::before {
  color: #fff;
  margin-top: 4px;
}

.boxLoading {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
}

.boxLoading:before {
  content: '';
  width: 50px;
  height: 5px;
  background: #000;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}

.boxLoading:after {
  content: '';
  width: 50px;
  height: 50px;
  background: #FF8737;
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}


.home-downloadData {
  position: absolute;
  padding: 5px 20px!important;
  top: 24px;
  right: 252px;
}

.home-downloadData-wrapper {
  display: flex;
  align-items: center;
}

.graph-stop {
  position: absolute;
  right: 7.1%;
  top: 40%;
}

.graph-stop>span {
  color: #fff;
  background: #FF8737;
  padding: 7px 12px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 10px;
}

.important-hints {
  width: 234px;
  height: 39px;
  background: #FFF7EC;
  border: 1px solid #FE7011;
  box-shadow: 0 2px 9px 0;
  border-radius: 2px;
  position: absolute;
  top: 5%;
  left: 43%;
  border-left: 2px solid #FE7011;
  z-index: 99;
}

.important-hints p {
  color: #F99C67;
  font-size: 12px;
  text-align: center;
}

.important-hints p span {
  color: #FE7011;
  font-size: 12px;
  font-weight: bold;
}

.important-overtime {
  width: 300px;
  height: 39px;
  background: #FFF7EC;
  border: 1px solid #FE7011;
  box-shadow: 0 2px 9px 0;
  border-radius: 2px;
  position: absolute;
  top: 5%;
  left: 40%;
  border-left: 2px solid #FE7011;
  z-index: 99;
}

.important-overtime p {
  color: #F99C67;
  font-size: 12px;
  text-align: center;
}

.important-overtime p span {
  color: #FE7011;
  font-size: 12px;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}


@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}

@media screen and (max-height: 800px) {
  .hotspot-follow {
    height: 530px;
    margin: 0 auto;
    padding-top: 8%;
    width: 90%;
  }
  .hotspot-follow .hotspot-left li {
    height: 30px;
    width: 100%;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0.22px;
    text-align: center;
    margin: 20px 0px;
    line-height: 30px;
    transition-delay: 100ms;
    transition-duration: 500ms;
  }
  .hotspot-follow .hotspot-right li {
    height: 30px;
    width: 100%;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0.22px;
    text-align: center;
    margin: 20px 0px;
    line-height: 30px;
    transition-delay: 100ms;
    transition-duration: 500ms;
  }
}
</style>

