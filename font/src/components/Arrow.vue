<template>
  <div class="arrow-wrapper" @click="()=>toggleSelect(arrowData.type)">
    <span :class="{arrow: true, [`arrow_${arrowData.type.toLowerCase()}`]: selected}"></span>
    <span>{{arrowData.label}}({{arrowData.count}}家)</span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: true
    };
  },
  methods: {
    toggleSelect: function(type) {
      this.clickEvent(type, this.$data.selected);
      this.$data.selected = !this.$data.selected;
    }
  },
  props: {
    arrowData: Object,
    clickEvent: Function
  },
  watch: {
    arrowData: function() {
      this.$data.selected = true;
    }
  }
};
</script>

<style>
.arrow-wrapper {
  display: inline-block;
  cursor: pointer;
}

.arrow-wrapper>.arrow {
  position: relative;
  display: inline-block;
  height: 0;
  width: 20px;
  padding-top: 4px;
  border-top: 2px solid #ddd;
  margin-right: 10px;
}

.arrow-wrapper>.arrow::after {
  position: absolute;
  left: 15px;
  top: -5px;
  content: "";
  box-sizing: border-box;
  border-width: 4px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #ddd;
}

.arrow-wrapper>.arrow_investment {
  border-color: #edb250;
}

.arrow-wrapper>.arrow_investment::after {
  border-left-color: #edb250;
}


.arrow-wrapper>.arrow_investmented {
  border-color: #FF9457;
}

.arrow-wrapper>.arrow_investmented::after {
  border-left-color: #FF9457;
}


.arrow-wrapper>.arrow_guarantee {
  border-color: #63976a;
}

.arrow-wrapper>.arrow_guarantee::after {
  border-left-color: #63976a;
}


.arrow-wrapper>.arrow_guaranteeed {
  border-color: #93D8CA;
}

.arrow-wrapper>.arrow_guaranteeed::after {
  border-left-color: #93D8CA;
}


.arrow-wrapper>.arrow_hide {
  border-color: #c18ee1;
}

.arrow-wrapper>.arrow_hide::after {
  border-left-color: #c18ee1;
}

.arrow-wrapper>.arrow_control {
  border-color: #d15867;
}

.arrow-wrapper>.arrow_control::after {
  border-left-color: #d15867;
}

.arrow-wrapper>.arrow+span {
  color: #999;
}

.arrow-wrapper>.arrow_investment+span,
.arrow-wrapper>.arrow_investmented+span,
.arrow-wrapper>.arrow_guarantee+span,
.arrow-wrapper>.arrow_guaranteeed+span,
.arrow-wrapper>.arrow_hide+span,
.arrow-wrapper>.arrow_control+span {
  color: inherit;
}
</style>

