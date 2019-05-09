<template>
    <div style="position: absolute; top: 30%; width: 100%; z-index: 2018;">
      <h4>{{message}}</h4>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: "如您见到此页，请联系管理员或开发者！"
    };
  }
};
/** 
 * 本页面为阻断页，用于屏蔽登录页，在APP或其它Web页面嵌入本应用的某些页面时，
 * 页面内接口请求数据返回权限错误时会跳转到此页，并留在此页，
 * 因此，调用页面的开发者需保持token长期有效，即在token过期之前重新获取。
*/ 
</script>
