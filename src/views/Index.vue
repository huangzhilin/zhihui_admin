<template>
<div>
	<div class='diy_row'>
		<div class='diy-menu'>
			<el-button v-for='item,index in zujianNavs' plain @click='addZujian(index)'>{{item.name}}</el-button>
		</div>

		<draggable :list="zujian" class='diy-phone' @end ='end'>
			<div v-for='item,index in zujian' :class="currentZujian-1==index?'optional selected':'optional'" @click='selectZujian(index)'>
				<component :is="item.componentPhone" :config='item.config'></component>
				<del @click='delZujian(index)'>删除</del>
			</div>
		</draggable>
		
		<div class='diy-editor'>
			<component v-if='currentZujian' :is="zujian[currentZujian-1]['componentEditor']" :config="zujian[currentZujian-1]['config']"></component>
		</div>
	</div>
	<div>faefewafwefwef</div>
</div>
</template>

<script>
import draggable from "vuedraggable";
import phoneIphone from "../components/diy/phone/Iphone.vue";
import editorIphone from "../components/diy/editor/Iphone.vue";
export default {
	name: 'index',
	components: {
		draggable,
		phoneIphone,editorIphone,
	},
	data() {
		return {
			zujianNavs:[
				{icon:'fwae',name:'图片轮播',config:{
					componentPhone:'phoneIphone',componentEditor:'editorIphone',config:{
						fontSize:22
					}
				}},
				{icon:'fwae',name:'单图组',config:{
					componentPhone:'phoneIphone',componentEditor:'editorIphone',config:{

					}
				}},
				{icon:'fwae',name:'图片橱窗',config:{
					componentPhone:'phoneIphone',componentEditor:'editorIphone',config:{}
				}},
				{icon:'fwae',name:'视频组',config:{
					componentPhone:'phoneIphone',componentEditor:'editorIphone',config:{}
				}}
			],

			//当前选择了哪个组件
			currentZujian:0,
			zujian: [],
		};
	},

	methods: {

		selectZujian: function(index){
			this.currentZujian = index+1;
		},
		addZujian: function(index){
			this.zujian.push(JSON.parse(JSON.stringify(this.zujianNavs[index].config)));
			this.currentZujian = this.zujian.length
		},
		delZujian: function(index){
			this.$confirm('确定要删除该项?').then(() => {
				this.zujian.splice(index,1);
				this.currentZujian = 0;
	        });
		},

		//移动后触发
		end:function(evt){
			this.currentZujian = evt.newIndex+1
		}
	}
};
</script>

<style scoped>
.diy_row{display:flex;flex-wrap:wrap;}

.diy-menu{height:300px;width:200px;background:red;margin-right:20px;margin-bottom:20px}

.diy-phone{height:300px;width:300px;margin-right:20px;margin-bottom:20px}

.optional{position:relative;}
.optional.selected:before,.optional:hover:before{content: "";position: absolute;top: 0;left: 0;right: 0;bottom: 0;border: 2px dashed #00a0e9;cursor: move;}
.optional del{display:none;position: absolute;height:16px;line-height: 16px;width:32px;right:1px;
    bottom:1px;z-index:90;background: rgba(0, 0, 0, 0.4);font-size:12px;text-align: center;color: #fff;font-style:normal;cursor:pointer;}
.optional.selected del,.optional:hover del{display:inline-block;}


    


.diy-editor{height:300px;width:300px;background:blue;margin-bottom:20px}
</style>