<template>
	<el-container id="main">

	  <el-aside class='main_aside' :width="isCollapse?'64px':'200px'">
	  	<div class='logo-title' v-if='isCollapse'><span style='padding:12px 10px;'>ZH</span></div>
	  	<div class='logo-title' v-else='isCollapse'><span style='padding:12px 25px;'>智慧管理系统</span></div>
	  	
	  	<div style='width:220px;overflow-y:scroll;overflow-x:hidden'>
		    <el-menu :default-active='currentNavTab' background-color="#001529" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" :collapse-transition='false' @select='clickMenu'>

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
					<full-screen></full-screen>
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

		<div id='scroll-menu'>
			<div id='scroll-menu-prev' @click='handleScroll(250)'><i class="el-icon-arrow-left"></i></div>
			<div class="scroll-wrapper" ref="scrollWrapper">
				<div class="scroll-container" :style="{left: scrollLeft + 'px'}" ref="scrollContainer">
					<div  class="scroll-item" v-for='(item,index) in navTab' @click='clickElTag(item.index)' ref="scrollItem">
						<el-tag size="medium" :closable='item.closable' @close='delElTag(index)' :type='currentNavTab==item.index?"":"plain"'>{{item.label}}</el-tag>
					</div>
				</div>
			</div>
			<div id='scroll-menu-next' @click='handleScroll(-250)'><i class="el-icon-arrow-right"></i></div>
			<el-dropdown @command="closeElTag">
				<i class="el-icon-close"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="all">关闭所有</el-dropdown-item>
					<el-dropdown-item command="other" divided>关闭其他</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

		<el-main>
			<keep-alive>
				<component :is="currentTabComponent" :key="currentCacheKey"></component>
			</keep-alive>
		</el-main>

	  </el-container>

	</el-container>
</template>



<script>
  import FullScreen from "../components/FullScreen";

  export default {
  	name:'Layout',
  	components: {FullScreen},
    data() {
      return {
      	//动态渲染组件 配置
      	currentTabComponent:'',
      	currentCacheKey:'',

      	//面包屑配置数据
      	breadCrumb:[],

      	//导航展开、收缩标志
      	isCollapse: false,  

      	//导航配置数据
      	menusList:[
			{icon:'el-icon-s-home',title:'欢迎页',path:'Index.vue'},
			{icon:'el-icon-user',title:'用户列表',path:"Index.vue"},
			{icon:'el-icon-user',title:'better-scroll',path:'Home.vue'},
			{icon:'el-icon-setting',title:'系统设置',
				sub:[
					{icon:'el-icon-menu',title:'选项1',path:'404.vue'},
					{icon:'el-icon-menu',title:'选项2',path:'404.vue'},
					{icon:'el-icon-user',title:'管理员',
						sub:[
							{title:'管理员列表',path:'404.vue'},
							{title:'角色权限',path:'404.vue'},
						]
					},
				]
			}
		],

		//标签页配置数据
		scrollLeft:0,
		currentNavTab:'0',
		navTab:[],
      }
    },

    mounted() {
      this.init()
    },
    methods:{
    	//初始化
		init() {
			//面包屑
			this.breadCrumb = [this.menusList[0].title];

			this.currentCacheKey = 123;

			this.navTab = [{cacheKey:this.currentCacheKey,label:this.menusList[0].title,index:'0',closable:false,path:this.menusList[0].path}];

			this.currentTabComponent = this.currentTabComponent = resolve => require(['../views/'+this.menusList[0].path], resolve);
		},
		
    	//点击 标签页 标签触发
		clickElTag:function(index){
			this.getInfo(index)
			this.changeNavTab(index)
		},

		//关闭 标签页 标签触发
		closeElTag:function(command){
			switch (command){
				//关闭所有标签页
				case 'all':
					this.navTab = [this.navTab[0]];
					if(this.currentNavTab !== '0') {
						this.getInfo(this.navTab[0].index)
						this.changeNavTab(this.navTab[0].index);
					}
					break;
				//关闭其他标签页
				case 'other':
					this.navTab = this.navTab.filter(tab => tab.index === this.currentNavTab || tab.index==='0');
					break;
				default:
					break;
			}
			this.scrollLeft = 0;
      	},

		//删除 标签页 标签触发
		delElTag:function(index){
			let tabs = this.navTab;
			let _this = this;
	        let currentTabName = this.currentNavTab;
	        let targetName = tabs[index].index;
	        if (currentTabName === targetName) {
	          tabs.forEach((tab, ind) => {
	            if (tab.index === targetName) {
	              let nextTab = tabs[ind + 1] || tabs[ind - 1];
	              if (nextTab) {
	                currentTabName = nextTab.index;
	                this.changeNavTab(currentTabName);
	              }
	            }
	          });
	        }
	        this.getInfo(currentTabName);
        	this.currentNavTab = currentTabName;
	        this.navTab = tabs.filter(tab => tab.index !== targetName);
		},

		//标签页 前进或后退
		handleScroll:function(offset) {
			const outerWidth = this.$refs.scrollWrapper.offsetWidth
			const bodyWidth = this.$refs.scrollContainer.offsetWidth
			if (offset > 0) {
				this.scrollLeft = Math.min(0, this.scrollLeft + offset)
			} else {
				if (outerWidth < bodyWidth) {
					if (this.scrollLeft < -(bodyWidth - outerWidth)) {
						this.scrollLeft = this.scrollLeft
					} else {
						this.scrollLeft = Math.max(this.scrollLeft + offset, outerWidth - bodyWidth)
					}
				} else {
					this.scrollLeft = 0
				}
			}
		},

      	//点击 导航 触发
    	clickMenu:function(index,indexPath){
    		let meunInfo = this.getInfo(index);

			//动态添加标签页
			let tabInfo = this.navTab.find(f => f.index == index);
    		if (!tabInfo) {
    			let cache_key = Math.random()
                this.navTab.push({
                	cacheKey:cache_key,
                	label:meunInfo.title,
                	path:meunInfo.path,
                	index: index,
                	closable: true
                });
    		}
    		this.changeNavTab(index)
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
      	},

      	//切换 标签页
      	changeNavTab(index) {
      		setTimeout(() => {
	      		this.currentNavTab = index
		  		let items = this.$refs.scrollItem
				for(let i=0;i<items.length;i++){
					if (this.navTab[i].index === index) {
						this.moveToView(items[i])

						//动态 渲染组件
						this.currentCacheKey = this.navTab[i].cacheKey
						this.currentTabComponent = resolve => require(['../views/'+this.navTab[i].path], resolve)

						break;
					}
				}
			},5);
		},

		//跳转到指定的标签页
		moveToView(tag) {
      		const outerWidth = this.$refs.scrollWrapper.offsetWidth
			const bodyWidth = this.$refs.scrollContainer.offsetWidth
			if (bodyWidth <= outerWidth){
				this.scrollLeft = 0
			} else if (tag.offsetLeft < -this.scrollLeft) {
				// 标签在可视区域左侧
				this.scrollLeft = -tag.offsetLeft
			} else if (tag.offsetLeft < -this.scrollLeft || tag.offsetLeft + tag.offsetWidth >= -this.scrollLeft + outerWidth) {
				// 标签在可视区域右侧
				this.scrollLeft = -(tag.offsetLeft - (outerWidth - tag.offsetWidth))
			}
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

	.el-header{color: #333;line-height: 60px;font-size:16px;}
	.el-breadcrumb__separator{color:#606266}
	.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a{font-weight:normal}

	#scroll-menu{width:100%;display:flex;height:36px;line-height:36px;border-bottom:1px solid #42b983;border-top:1px solid #42b983;}
	#scroll-menu-prev,#scroll-menu-next,#scroll-menu .el-dropdown{width:36px;text-align:center;flex:none;cursor:pointer;}
	#scroll-menu-prev{border-right:1px solid #42b983;}
	#scroll-menu-next,#scroll-menu .el-dropdown{border-left:1px solid #42b983;}
	.scroll-wrapper{flex:auto;margin:0px 6px;position: relative;overflow:hidden;}
	.scroll-container{position:absolute;white-space: nowrap;transition: left .3s ease;}
	.scroll-item{display:inline-block;padding:0px 5px;}
	.scroll-item .el-tag{cursor:pointer;}
</style>