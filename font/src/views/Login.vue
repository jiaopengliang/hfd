<template>
  <div class="login-wrapper">
    <LoginBg />
    <el-row style="position: absolute; width: 100%; height: 100%; z-index: 1;">
      <el-col :md="11" :lg="12">
        <div class="login-title unselectable">
          <h3 class="UBO">UBO数量
            <span>56</span>万+</h3>
          <h3 class="scale">关系规模
            <span>2908</span>万+</h3>
          <h3 class="number">系成员数量
            <span>363</span>万+</h3>
          <h2 class="entity" style="color: rgba(1,255,254,0.8);">实体规模
            <span style="font-size:64px;">1.1</span>亿+</h2>
          <h3 class="pedigree">谱系数量
            <span style="font-size:36px;">76</span>万+</h3>
        </div>
      </el-col>
      <el-col :md="13" :lg="12">
        <div class="login-content">
          <div class="login-logo"><img src="../assets/images/logo_login@2x.png" alt="好风度图谱"></div>
          <el-input type="text" class="form-input" placeholder="UM账号" v-model="inputUser" clearable>
            <img slot="prefix" src="../assets/images/name@2x.png" height="24px" />
          </el-input>
          <el-input type="password" class="form-input" placeholder="UM密码(域密码)" v-model="inputPwd" clearable>
            <img slot="prefix" src="../assets/images/password@2x.png" height="24px" />
          </el-input>
          <el-input v-show="inputCode" type="text" class="form-code" v-model="verificationCode" placeholder="请输入验证码"></el-input>
          <img style="float:right;cursor: pointer;" v-show="inputCode" @click="changeCode" :src="this.imgCode" />
          <el-button type="primary full-width" :loading="loading" @click="doLogin">登录</el-button>
          <span class="error" v-show="errorMessage"> <img src="../assets/images/notice@2x.png" alt="">{{errorMessage}}</span>
        </div>
      </el-col>
    </el-row>
    <div class="footer">Copyright © 中国平安</div>
  </div>
</template>
<script>
import LoginBg from "@/components/LoginBg.vue";
import network from "@/libs/network";
import { setToken, setItem } from "@/libs/storage";
import "element-ui/lib/theme-chalk/display.css";

export default {
  data() {
    return {
      inputUser: "",
      inputPwd: "",
      errorMessage: "",
      loading: false,
      verificationCode: "",
      imgCode: "",
      inputCode: false,
      requestid: "",
      PublicKeyX: "",
      PublicKeyY: ""
    };
  },
  methods: {
    changeCode() {
      network
        .get("/api/login/getValidCode").then(res => {
          if (res.data) {
            this.imgCode = res.data.content.data;
            this.requestid = res.data.content.requestId;
          }
        });
    },
    doLogin() {
      let userName = this.inputUser;
      let passWord = this.inputPwd;
      if (!userName) {
        this.errorMessage = "请输入用户名";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
        return;
      }
      if (!passWord) {
        this.errorMessage = "请输入密码";
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
        return;
      }
      //配置文件分离 - 获取公钥接口/开发/测试/生产
      network
        .get("/api/login/getEq").then(res => {
          if (res.data) {
            //开发/测试
            if (res.data.code == "HFD_DEV") {
              this.$data.PublicKeyX = PublicKeyX;
              this.$data.PublicKeyY = PublicKeyY;
            }
            //生产环境
            else if (res.data.code == "HFD_PROD"){
              this.$data.PublicKeyX = ProductionPublicKeyX;
              this.$data.PublicKeyY = ProductionPublicKeyY;
            }
          }
          this.$data.loading = true;
          network
            .post("/api/login/doLogin", {
              username: userName,
              // eslint-disable-next-line
              password: CryptoJS.MD5(passWord).toString(),
              // eslint-disable-next-line
              password2: doEncrypt(this.$data.PublicKeyX, this.$data.PublicKeyY, passWord),      
              validCode: this.verificationCode,
              requestId: this.requestid
            })
            .then(res => {
              this.$data.loading = false;
              if (res.data.statusCode) {
                this.$data.errorMessage = res.data.msg;
                network
                  .get("/api/login/getValidCode").then(res => {
                    if (res.data) {
                      this.imgCode = res.data.content.data;
                      this.requestid = res.data.content.requestId;
                    }
                  });
                //验证码
                if (res.data.statusCode == "NEED_RAND_CODE" || res.data.statusCode == "REQUEST_ERROR") {
                  this.$data.inputCode = true;
                  this.$data.errorMessage = "请输入验证码";
                  network
                    .get("/api/login/getValidCode").then(res => {
                      if (res.data) {
                        this.imgCode = res.data.content.data;
                        this.requestid = res.data.content.requestId;
                      }
                    });
                }
                if (res.data.statusCode == "WRONG_IMAGE_CODE") {
                  this.$data.errorMessage = "验证码输入错误";
                }
                if (res.data.statusCode == "USER_LOCKED") {
                  this.$data.errorMessage = "密码连续输错5次已被锁定，请联系管理人员";
                }
              } else {
                setToken(res.data.token);
                setItem("userInfo", {
                  name: res.data.name,
                  company: res.data.userOrg
                });
                this.$router.push("/home");
              }
            })
            .catch(() => {
              this.$data.errorMessage = "请检查网络链接";
              this.$data.loading = false;
            });
        })
    }
  },
  name: "login",
  components: {
    LoginBg
  },
  mounted: function() { }
};
function doEncrypt(keyX, keyY, pwd) {
  // eslint-disable-next-line
  var msgData = CryptoJS.enc.Utf8.parse(pwd);
  // eslint-disable-next-line
  var cipherMode = SM2CipherMode.C1C3C2;
  // eslint-disable-next-line
  var cipher = new SM2Cipher(cipherMode);
  // eslint-disable-next-line
  var userKey = cipher.CreatePoint(keyX, keyY);
  msgData = cipher.GetWords(msgData.toString());
  return cipher.Encrypt(userKey, msgData);
}
</script>


<style>
.login-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
  position: absolute;
  overflow: hidden;
  background: url("../assets/images/bg2@2x.png") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

.login-content {
  position: absolute;
  top: 53%;
  right: 7%;
  width: 400px;
  /* height: 373px; */
  margin-top: -220px;
  padding: 50px 24px 24px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.10);
}


.login-content .el-input__inner {
  border-radius: 4px;
}

.login-content input::-webkit-input-placeholder {
  color: #666666;
  font-size: 14px;
}

.login-content .full-width {
  width: 100%;
  height: 40px;
}

.text-info {
  line-height: 39px;
}

.login-logo {
  padding-bottom: 28px;
}

.login-logo img {
  height: 80px;
}

.form-input {
  margin-bottom: 24px;
}

.form-input input {
  border-radius: 20px;
  padding-left: 45px !important;
}

.form-input img {
  margin-top: 7px;
  margin-left: 15px;
}

.form-code {
  margin-bottom: 24px;
  width: 80% !important;
}

.form-code input {
  width: 215px !important;
  float: left;
  border-radius: 20px;
  padding-left: 45px !important;
}

.login-content .error {
  color: #fe7011;
  float: left;
  margin: 10px 0 0 20px;
  font-size: 14px;
}

.login-content .error img {
  margin-right: 5px;
  height: 11px;
}

.login-title {
  margin-top: 20%;
  padding-left: 40px;
  box-sizing: border-box;
  width: 94%;
}

.login-title span {
  font-size: 30px;
  font-weight: bold;
  color: rgba(1, 255, 254, 0.8);
}

.login-title h2 {
  color: rgba(1, 255, 254, 0.7);
  font-size: 40px;
  font-weight: normal;
}

.login-title h2:hover {
  transform: scale(1.4);
  transition: all 0.5s;
}

.login-title h3 {
  color: rgba(1, 255, 254, 0.7);
  font-size: 25px;
  font-weight: 300;
}

.login-title h3:hover {
  transform: scale(1.5);
  transition: all 0.5s;
}

.login-title .UBO {
  position: absolute;
  left: 30%;
  top: 15%;
  cursor: default;
  font-size: 18px;
}

.login-title .number {
  position: absolute;
  left: 2%;
  margin-top: 6rem;
  cursor: default;
  font-size: 18px;
  margin-left: 2em;
}

.login-title .scale {
  display: inline-block;
  margin-top: 10em;
  float: right;
  cursor: default;
  font-size: 18px;
}

.login-title .entity {
  display: inline-block;
  position: absolute;
  left: 12%;
  top: 55%;
  cursor: default;
  font-size: 36px;
}

.login-title .pedigree {
  position: absolute;
  left: 34%;
  bottom: 12%;
  cursor: default;
  font-size: 24px;
}

.footer {
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 10;
  color: #fff;
  font-size: 12px;
}
</style>
