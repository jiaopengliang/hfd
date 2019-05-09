<template>
    <div :class="['intro-wrapper', cssName]">
       <h5>关系类型</h5>
       <h6>
           <b>●</b>
           投资、股东关系
       </h6>
       <p>
            描述企业的股权构成关系。从股权结构入手，理清企业与企业、企业与个人的资本联系。
       </p>
       <h6>
           <b>●</b>
           增信、被增信关系
       </h6>
       <p>
            即企业间担保关系，  描述企业间的一种承担连带偿还责任的经济行为关系。
       </p>
       <h6>
           <b>●</b>
           高管关系
       </h6>
       <p>
            指企业与自然人、自然人与自然人间的关系。企业与自然人的关系包含股权关系、任职关系(董事、监事、高管、法定代表人等) ;自然人与自然人的关系包含家人关系、  同事关系、同乡关系、  金钱往来关系等。
       </p>

       <h5>企业类型</h5>
       <h6>
           <b>●</b>
           龙头企业
       </h6>
       <p>
            指在集团谱系中，对系内其他企业具有深远影响、号召力和示范引导作用，并对该地区、该行业或者国家做出突出贡献的企业。
       </p>
       <h6>
           <b>●</b>
           龙骨架企业
       </h6>
       <p>
            指系内与龙头企业后向关联的PageRank分值前30%的企业。
       </p>
       <h6>
           <b>●</b>
           普通企业
       </h6>
       <p>
            指龙头企业、龙骨架企业以外的企业。
       </p>
    </div>
</template>

<script>
export default {
  props: {
    cssName: String
  }
};
</script>

<style>
.intro-wrapper {
  width: 426px;
  height: 340px;
  text-align: left;
}
.intro-wrapper > h5 {
  margin: 5px 0 0;
  color: #fe7011;
}
.intro-wrapper > h6 {
  margin: 2px 0;
  color: #333;
}
.intro-wrapper > h6 > b {
  color: #a9c5f1;
}
.intro-wrapper > p {
  margin: 0;
  line-height: 1.2em;
  font-size: 12px;
  padding-left: 0.9em;
}
</style>

