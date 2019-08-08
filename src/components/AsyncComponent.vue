<template>
  <component :is="nowComponent"></component>
</template>

<script>
export default {
  data() {
    return {
      nowComponent: null,
    };
  },
  props: {
    componentPath: String
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      import('../views/'+this.componentPath)
        .then(rsp => {
          this.nowComponent = () => import('../views/'+this.componentPath);
        })
        .catch(err => {
          this.nowComponent = () => import('../views/404.vue');
        });
    }
  }
};
</script>