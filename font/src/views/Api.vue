<template>
    <div class="products">
        <Header></Header>
        <div class="products-tab">
            <div class="products-tab-switch margin">
                <span>知识图谱API<i class="line"></i></span>
                <span @click="openMessage">第三方API</span>
                <div class="products-search">
                    <input type="text" placeholder="请输入..." v-model="searchContent" v-show="false" class="products-search-input"/>
                    <div v-on:click="searchInputShow = !searchInputShow">
                    <!-- <img src="../assets/images/index/search.png" alt="" > -->
                    </div>
                </div>
            </div>
            
            <div class="products-tab-content">
                <div class="margin">
                    <el-row type="flex" class="products-list">
                        <el-col :span="6" v-for="item in apiList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.id">
                            <router-link tag="div" :to="'/apidetail/'+item.id" class="products-list-item">
                                <div class="img-wrapper">
                                    <img :src="item.img" alt="">
                                </div>
                                <span style="white-space:nowrap"><b>{{item.name}}</b></span>
                                <i>
                                    <img v-if="item.type == 'api'" src="../assets/images/index/api.png" alt="">
                                    <img v-if="item.type == 'h5'" src="../assets/images/index/h5.png" alt="">
                                </i>
                            </router-link>
                        </el-col>
                    </el-row>
                    <!-- 分页 -->
                    <el-pagination
                    background=""
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-count="pagesize"
                    :current-page="currentPage"
                    :total="apiList.length">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>    
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
    name:"products",
    components:{
        Header,Footer
    },
    data() {
      return {
        searchInputShow:false,
        searchContent:"",
        currentPage:1,
        pagesize:12,
        apiList:[{
            id:3,
            name:"查图谱",
            type:"h5",
            img:require("../assets/images/index/ICON33.png")
        },{
            id:4,
            name:"查关系",
            type:"h5",
            img:require("../assets/images/index/ICON34.png")
        },{
            id:5,
            name:"受益人、控制人",
            type:"api",
            img:require("../assets/images/index/ICON35.png")
        },{
            id:1,
            name:"黑灰名单",
            type:"api",
            img:require("../assets/images/index/ICON31.png")
        },{
            id:2,
            name:"工商信息",
            type:"api",
            img:require("../assets/images/index/ICON32.png")
        }]
      };
    },
    methods: {
      handleCurrentChange(currentPage) {
          this.currentPage = currentPage
      },
      openMessage(){
          this.$message({
              message:"暂未开放，敬请期待",
              type:"warning",
              showClose:true
          })
      }
    }
}
</script>

<style>

.products{
    background:url("../assets/images/index/apibg.png") #0D0D44 no-repeat;
    background-size: 100%;
    min-width: 1100px;
}
.products-tab-switch{
    text-align: left;
    color: #fff;
    padding-top: 70px;
    padding-left: 80px;
    position: relative;
}
.products-tab-switch span{
    font-size: 20px;
    margin-right: 40px;
    position: relative;
    cursor: pointer
}
.products-tab-switch .line{
    display: block;
    width: 130px;
    height: 3px;
    background: #F36B26 ;
    position: absolute;
    bottom: -5px;
    left: -10px
}
.products-search{
    position: absolute;
    bottom: -1.8vw;
    right: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.products-search-input{
    line-height: 2.2vw;
    border-radius: 1.1vw;
    border: 2px solid #F36B26;
    text-indent: 1em;
    margin-right: -1.5vw;
    outline: none;
    animation:wideexpand .3s ease;
    animation:widereduce .3s ease;
    width: 10vw
}

.products-search img{
    width: 3.6vw;
}
.products-tab-content{
    background: rgb(252, 252, 252);
    padding-bottom: 50px;
    padding-top: 30px;
}
.products-list{
    flex-wrap: wrap;
    padding: 30px 0;    
    min-height: 500px;
}
.products-list-item{
    width: 16vw;
    min-width: 130px;
    max-width: 250px;
    height: 16vw;
    max-height: 250px;
    min-height: 130px;
    box-shadow: 0px 1px 2px #8D8D8D;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.products-list-item .img-wrapper{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center
}
.products-list-item .img-wrapper>img{
    height: 30%;
    min-height: 43px;
}
.products-list-item:hover .img-wrapper img{
    animation: expanding .3s ease;
    transform: scale(1.2);
}
@keyframes expanding{
    0%{transform: scale(1)}
    50%{transform: scale(1.7)}
    90%{transform: scale(1.1)}
    100%{transform: scale(1.2)}
}
.products-list-item i{
    position: absolute;
    top: 1vw;
    right: 1vw;
}
.products-list-item i>img{
    width: 4vw;
    max-width:50px;
}

</style>
