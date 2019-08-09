<template>
  <div>
    <div v-for='item,index in list' :style="'font-size:'+config.fontSize+'px'">
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[
        {title:'黄志林'},
        {title:'苏慧慧'},
        {title:'黄秉泽'}
      ],
    };
  },
  props: {
    config: Object,
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>