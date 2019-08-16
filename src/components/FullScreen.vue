<template>
	<i class="el-icon-full-screen" style='font-size:18px;margin-right:15px;cursor:pointer;' title='进入/退出全屏' @click="getFullCreeen"></i>
</template>

<script>
  export default{
    name:'FullScreen',
    data() {
    	return{
    		n:0, //全屏进入退出控制标志
    	}
    },
    methods:{
    	//进入/退出全屏 相关方法
    	getFullCreeen(){
            this.n++;
            this.n%2==0?this.outFullCreeen(document):this.inFullCreeen(document.documentElement)
        },
        inFullCreeen(element){
            let el = element;
            let rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
                el.mozRequestFullScreen || el.msRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) { 
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                let wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        outFullCreeen(element){
            let el = element;
            let cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
                el.mozCancelFullScreen || el.exitFullScreen;
            if (typeof cfs != "undefined" && cfs) { 
                cfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                let wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
    }
  }
</script>