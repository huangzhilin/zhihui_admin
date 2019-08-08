<template>
	<el-container id="main">

	  <el-aside class='main_aside' :width="isCollapse?'64px':'200px'">
	  	<div class='logo-title' v-if='isCollapse'><span style='padding:12px 10px;'>ZH</span></div>
	  	<div class='logo-title' v-else='isCollapse'><span style='padding:12px 25px;'>智慧管理系统</span></div>
	  	
	  	<div style='width:220px;overflow-y:scroll;overflow-x:hidden'>
		    <el-menu :default-active='defaultMenuActive' background-color="#001529" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition='false' @select='clickMenu'>

		    	<template v-for='menus,index in menusList'>
			    	<el-submenu v-if='menus.sub' :index="index+''">
						<template slot="title">
							<i v-if="menus.icon" :class="menus.icon"></i>
							<span slot="title">{{menus.title}}</span>
						</template>

						<template v-for='menu,ind in menus.sub'>
							<el-submenu v-if='menu.sub' :index="index+'-'+ind">
								<template slot="title">
									<i v-if="menu.icon" :class="menu.icon"></i>
									<span slot="title">{{menu.title}}</span>
								</template>
								<template v-for='men,number in menu.sub'>
									<el-menu-item :index="index+'-'+ind+'-'+number">
										<i v-if="men.icon" :class="men.icon"></i>
										<span slot="title">{{men.title}}</span>
									</el-menu-item>
								</template>
							</el-submenu>

							<el-menu-item v-else :index="index+'-'+ind">
								<i v-if="menu.icon" :class="menu.icon"></i>
								<span slot="title">{{menu.title}}</span>
							</el-menu-item>
						</template>
					</el-submenu>

		    		<el-menu-item v-else :index="index+''">
						<i v-if="menus.icon" :class="menus.icon"></i>
						<span slot="title">{{menus.title}}</span>
					</el-menu-item>
		        </template>

		    </el-menu>
	    </div>
	  </el-aside>
 
	  <el-container>
	    <el-header>
			<el-row :gutter="20">
				<el-col :span="18">
					<span :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click='isCollapse=!isCollapse' style='cursor:pointer;font-size:21px;line-height: 60px;'></span>
					<el-breadcrumb separator="/" style='display: inline-block;margin-left:20px;'>
						<el-breadcrumb-item v-for='item in breadCrumb'>{{item}}</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

				<el-col :span="6" style='text-align:right'>
					<full-creeen></full-creeen>
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

		<el-tabs class='zh_tabs' v-model="currentTab" @tab-click="clickTab" @tab-remove="removeTab">
			<el-tab-pane v-for='tab in tabsList' :key="tab.index" :name="tab.index" :closable='tab.closable'>
			    <span slot="label"><i class="el-icon-date"></i> {{tab.label}}</span>
			    <async-component :componentPath="tab.component"></async-component>
			</el-tab-pane>
		</el-tabs>

	  </el-container>

	</el-container>


</template>



<script>
  import AsyncComponent from "../components/AsyncComponent";
  import FullCreeen from "../components/FullCreeen";
  export default {
  	components: {AsyncComponent,FullCreeen},
    data() {
      return {
      	//面包屑配置数据
      	breadCrumb:['欢迎页'],

      	//导航展开、收缩标志
      	isCollapse: false,  

      	//导航配置数据
      	defaultMenuActive:'0',
      	menusList:[
			{icon:'el-icon-s-home',title:'欢迎页',component:'Index.vue'},
			{icon:'el-icon-user',title:'用户列表',component:'Home.vue'},
			{icon:'el-icon-setting',title:'系统设置',
				sub:[
					{icon:'el-icon-menu',title:'选项1',component:'404.vue'},
					{icon:'el-icon-menu',title:'选项2',component:'404.vue'},
					{icon:'el-icon-user',title:'管理员',
						sub:[
							{title:'管理员列表',component:'404.vue'},
							{title:'角色权限',component:'404.vue'},
						]
					},
				]
			}
		],

		//标签页配置数据
		currentTab:'0',
		tabsList:[
			{label:'欢迎页',index:'0',closable:false,component:'Index.vue'}
		]
      }
    },
    methods:{
    	//点击 标签页 标签触发
    	clickTab:function(tab, event) {
        	this.getInfo(tab.name);
        	this.defaultMenuActive = tab.name
      	},

      	//删除 标签页 标签触发
      	removeTab(targetName) {
	        let tabs = this.tabsList;
	        let currentTabName = this.currentTab;
	        if (currentTabName === targetName) {
	          tabs.forEach((tab, ind) => {
	            if (tab.index === targetName) {
	              let nextTab = tabs[ind + 1] || tabs[ind - 1];
	              if (nextTab) {
	                currentTabName = nextTab.index;
	              }
	            }
	          });
	        }
	        
	        this.getInfo(currentTabName);
        	this.defaultMenuActive = currentTabName

        	this.currentTab = currentTabName;
	        this.tabsList = tabs.filter(tab => tab.index !== targetName);
      	},

      	//点击 导航 触发
    	clickMenu:function(index,indexPath){
    		let meunInfo = this.getInfo(index);

			//动态添加标签页
			let tab = this.tabsList.find(f => f.index == index);
    		if (!tab) {
                this.tabsList.push({
                	label:meunInfo.title,
                	component:meunInfo.component,
                	index: index,
                	closable: true
                });
    		}
    		this.currentTab = index;
    	},

    	

    	//公共方法
      	getInfo:function(index){
      		let index_arr = index.split('-');
    		let index_arr_length = index_arr.length;

    		//动态改变面包屑
    		this.breadCrumb = [this.menusList[index_arr[0]].title];

    		let meunInfo = null;
			switch(index_arr_length){
				case 3:
					meunInfo = this.menusList[index_arr[0]].sub[index_arr[1]].sub[index_arr[2]]
					this.breadCrumb[1] = this.menusList[index_arr[0]].sub[index_arr[1]].title;
					this.breadCrumb[2] = this.menusList[index_arr[0]].sub[index_arr[1]].sub[index_arr[2]].title;
					break;
				case 2:
					meunInfo = this.menusList[index_arr[0]].sub[index_arr[1]]
					this.breadCrumb[1] = this.menusList[index_arr[0]].sub[index_arr[1]].title;
					break;
				default:
					meunInfo = this.menusList[index_arr[0]]
			}
			return meunInfo;
      	}


    }
  };
</script>

<style>
#main{height:100%}
.main_aside{display: flex;flex-direction:column;background-color:#001529;overflow:hidden;}
.logo-title{height:60px;line-height:60px;color:#fff;text-align:center;}
.logo-title span{background:blue;border-top-left-radius:18px;border-bottom-right-radius:18px;font-weight: bold;letter-spacing:4px;font-size:16px;}
.el-menu{border-right:none}

.el-header{background-color:#B3C0D1;color: #333;line-height: 60px;font-size:16px;}
.el-breadcrumb__separator{color:#606266}
.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a{font-weight:normal}

.el-tabs__header{margin:0px}
.el-tabs__content {flex:1;overflow-y:auto;padding:20px}

.zh_tabs{flex:1;flex-basis:auto;overflow:auto;box-sizing: border-box;display:flex;flex-direction:column;}
.el-tabs__nav-wrap {padding: 0 30px;}
.el-tabs__nav-wrap.is-scrollable{padding: 0 40px;}
.el-tabs__nav-prev{left:15px}
.el-tabs__nav-next{right:15px}
</style>