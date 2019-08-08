<template>
	<el-container id="main">

	  <el-aside class='main_aside' :width="isCollapse?'64px':'200px'">
	  	<div class='logo-title' v-if='isCollapse'><span style='padding:12px 10px;'>ZH</span></div>
	  	<div class='logo-title' v-else='isCollapse'><span style='padding:12px 25px;'>智慧管理系统</span></div>
	  	
	  	<div style='width:220px;overflow-y:scroll;overflow-x:hidden'>
		    <el-menu :default-openeds="['3']" background-color="#001529" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition='false'>

		      <el-submenu index="1">
		        <template slot="title"><i class="el-icon-message"></i><span slot="title">导航一</span></template>
		        <el-menu-item index="1-1">选项1</el-menu-item>
		        <el-menu-item index="1-2">选项2</el-menu-item>
		        <el-submenu index="1-4">
		          <template slot="title">选项4</template>
		          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
		        </el-submenu>
		      </el-submenu>

		      <el-submenu index="3">
		        <template slot="title"><i class="el-icon-setting"></i><span slot="title">导航三</span></template>
		        <el-menu-item index="3-1">选项1</el-menu-item>
		        <el-menu-item index="3-2">选项2</el-menu-item>
		        <el-submenu index="3-4">
		          <template slot="title">选项4</template>
		          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
		        </el-submenu>
		      </el-submenu>

		    </el-menu>
	    </div>
	  </el-aside>
	  
	  <el-container>
	    <el-header>
			<el-row :gutter="20">
				<el-col :span="18">
					<span :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click='isCollapse=!isCollapse' style='cursor:pointer;font-size:21px;line-height: 60px;'></span>
					<el-breadcrumb separator="/" style='display: inline-block;margin-left:20px;'>
						<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
						<el-breadcrumb-item>活动管理</el-breadcrumb-item>
						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

				<el-col :span="6" style='text-align:right'>
					<el-dropdown>
						<span class="el-dropdown-link">黄志林<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>个人中心</el-dropdown-item>
							<el-dropdown-item divided>退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
	    </el-header>

	    <div class='zh_tabs'>
		  	<div class="zh_tabs_div zh_left"><i class="el-icon-arrow-left"></i></div>
		    <swiper :options="swiperOption" style='width:100%' ref="mySwiper">
		      <!---<swiper-slide><el-tag  closable effect="dark">首页2</el-tag></swiper-slide>--->
		      <swiper-slide v-for='tab in nav_tabs'><el-tag  closable effect="plain" type='info'>{{tab.title}}</el-tag></swiper-slide>
		    </swiper>
			<div class="zh_tabs_div zh_right"><i class="el-icon-arrow-right"></i></div>
			<div class='zh_tabs_div' @click='change()'><i class="el-icon-refresh-right"></i></div>
		</div>
	    
	    <el-main><router-view /></el-main>

	  </el-container>
	</el-container>


</template>

<style>
#main{height:100%}
.main_aside{display: flex;flex-direction:column;background-color:#001529;overflow:hidden;}
.logo-title{height:60px;line-height:60px;color:#fff;text-align:center;}
.logo-title span{background:blue;border-top-left-radius:18px;border-bottom-right-radius:18px;font-weight: bold;letter-spacing:4px;font-size:16px;}
.el-menu{border-right:none}

.el-header{color: #333;line-height: 60px;font-size:16px;}
.el-breadcrumb__separator{color:#606266}
.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a{font-weight:normal}

.zh_tabs{border:1px solid #ccc;border-right:none;border-left:none;display: flex;height:32px;line-height:32px;}
.zh_tabs_div{width:40px;flex:none;text-align:center;border-right:1px solid #ccc;cursor:pointer;}
.zh_left{margin-right:10px}
.zh_right{border-left:1px solid #ccc;margin-left:10px}

.swiper-slide{width:auto;cursor:pointer;}
.el-tag--dark {background-color:blue;border-color:blue;color:white;}
</style>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
  	components: {swiper,swiperSlide},
    data() {
      return {
      	isCollapse: false,
      	nav_tabs:[
      		{title:'欢迎页0'},
      		{title:'欢迎页1'},
      		{title:'欢迎页2'},
      		{title:'欢迎页3'},
      		{title:'欢迎页4'},
      		{title:'欢迎页5'},
      		{title:'欢迎页6'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'},
      		{title:'欢迎页'}
      	],
      	swiperOption: {
		  slidesPerView:'auto',
		  spaceBetween:10,
		  initialSlide:3,
		  navigation: {
			nextEl: '.zh_right',
			prevEl: '.zh_left',
          }
		},
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
    	change:function(){
    		alert(2)
    		this.swiper.slideTo(4, 1000, false)
    	}
    }
  };
</script>