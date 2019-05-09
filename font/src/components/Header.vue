<template>
    <header>
        <router-link to="/index" class="logo" title="好风度图谱">
            <h1>平安好风度</h1>
        </router-link>
        <div class="header-r">
            <router-link to="/index" tag="span" class="header-tab" active-class="header-tab-active">首页</router-link>
            <router-link to="/api" tag="span" class="header-tab" active-class="header-tab-active">产品</router-link>
            <router-link to="/login" tag="span" class="header-tab" active-class="header-tab-active">登录</router-link>
        </div>
    </header>
</template>
<script>
export default {
     
}
</script>

<style>
header{
    height: 5vw;
    width: 67vw;
    min-width: 900px;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
header .logo{
    width: 10.4vw;
    height: 2vw;
    background: url('../assets/images/index/logo.png') no-repeat;
    background-size: 100%;

}
header .logo h1{display: none}
.header-r{
    width: 32vw;
    font-size: 1.3vw;
    color: #FFFFFF;
    text-align: left
}
.header-tab{
    cursor: pointer;
    color: #D6D6D6;
    margin-right: 7.4vw
}
.header-tab:last-child{
    margin-left:3.6vw;
    margin-right: 0;
}
.header-tab:hover{
    color: #fff
}
.header-tab-active{
    color: #fff;
    font-weight: 700
}

</style>

