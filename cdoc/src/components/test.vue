<template>
  <div class="app-container calendar-list-container">
    <div class="background">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
        </div>
        <!--上标-->
    <van-sticky>
            <div class="up" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
              <div style="padding:15px 0;">
                <van-row>
                  <van-col span="3">
                      <el-button type="" size="mini" icon="el-icon-back" @click="goOff()">返回主页</el-button>
                  </van-col>
                  <van-col span="3">
                      <span style="color:darkgrey;font-size:12px;margin-top:15px">文档将自动保存</span>
                  </van-col>
                  <van-col span="3">
                  </van-col>
                  <van-col span="4">
                       <el-input placeholder="文件名"
                       size="small"
                       v-model="docname">
                       </el-input>
                  </van-col>
                  <van-col span="4">
                  </van-col>
                  <van-col span="2"></van-col>
                  <van-col span=1>
                      <i class="el-icon-bell" style="font-size:30px;"></i>
                  </van-col>
                  <van-col span="2">
                      <el-dropdown @command="onCommand">
                        <span class="el-dropdown-link">
                          <van-image
                          round
                          width="30px"
                          height="30px"
                          fit="cover"
                          :src="userhead"/><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>

                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item icon="el-icon-user" @click.native="toMyinfo">个人信息</el-dropdown-item>
                          <el-dropdown-item icon="el-icon-warning-outline"  @click.native="toLogin"><span style="color:red;">退出账号</span></el-dropdown-item>
                          <el-dropdown-item icon="el-icon-circle-plus-outline">帮助</el-dropdown-item>

                        </el-dropdown-menu>

                      </el-dropdown>
                  </van-col>
    <!--是否展示评论区-->
                  <van-col span="1">
                    <el-tooltip class="item" effect="dark" :content="words" placement="bottom">
                        <van-icon name="comment-o" size="30px" @click="showComment"/>
                    </el-tooltip>
                  </van-col>
                </van-row>
              </div>
            </div>
        </van-sticky>



    <van-row>
<!--功能界面-->
      <van-col span="4">
          <van-cell icon="wap-nav" @click="showpop(1)" style="width:50px;height:40px;margin-top:30px;background:;"></van-cell>

          <van-popup closeable rouond v-model="showtools" position="left" style=" height:100%;width:255px;margin-top:60px" @click="closepop">
                <div style="margin-top:15px;">菜单栏</div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" v-if="isConnect==false">
                  <van-cell icon="star-o" clickable @click="left(1)" title="收藏"/>
                </div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" v-if="isConnect==true">
                  <van-cell icon="star" clickable @click="left(1)" title="已收藏"/>
                </div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" >
                  <van-cell icon="share" clickable @click="left(2)" title="分享"/>
                </div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" >
                  <van-cell icon="down" clickable @click="left(3)"  title="保存至本地"/>
                </div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" >
                  <van-cell icon="replay" clickable @click="left(4)"  title="创建副本"/>
                </div>
                <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);margin-top:16px;" >
                  <van-cell icon="description" clickable @click="left(5)"  title="文档信息"/>
                </div>
          </van-popup>
      </van-col>

<!--编辑器-->
      <van-col span="16">
        <div style="">
          <editor
            class="editor"
            :value="content"
            :docid="docid"
            :read="read"
            :setting="editorSetting"
            @show="editors"
            :url              = "Url"
            :max-size         = "MaxSize"
            :accept           = "Accept"
            :with-credentials = "withCredentials"
            @on-upload-fail         = "onEditorReady"
            @on-upload-success= "onEditorUploadComplete"></editor>
        </div>

        <div>
        <span style="color:red">{{docid}}</span>
        <span style="color:blue">{{readonly}}</span></div>
      </van-col>

<!--评论区-->
      <van-col span="4">
          <div v-if="isShowComment">
              <Comment></Comment>
          </div>
      </van-col>
    </van-row>

  </div>
</template>

<script type="text/ecmascript-6">
  import editor from './editor'; // 根据editor.vue组件位置引入
  import {Toast} from "vant";
  import axios from 'axios';
  import baseUrl from './baseUrl'
  import Comment from './Comment'
  export default {
    data() {
      return {
        userhead:'https://img.yzcdn.cn/vant/cat.jpeg',
        imgSrc:require('../assets/loginback.jpg'),

        onemali:localStorage.getItem('myemail'),

        isConnect:true,//是否收藏
        showtools:false,//是否展示左边框


        Url: 'static/upload', // 图片对应的上传地址
        MaxSize: 75765, // 文件大小
        Accept: 'image/jpeg, image/png,image/jpg', // 文件格式
        withCredentials: true,
        content: 'Hello,world!', // 富文本编辑器双向绑定的内容
        editorSetting: { // 配置富文本编辑器高
          height: 650
        },


        docname:'',
        docid: '1', // TODO 接收主页传输的文档id
        read:false,


        words:'点击打开评论区',
        isShowComment:false,//右边框
      }
    },
    components: { // 引入组件
      editor,Comment
    },
    methods: {
      editors(content1) { // editor组件传过来的值赋给content
        console.log(content1)
        this.content = content1
      },
      showComment(){
          if(this.isShowComment==false){
              this.isShowComment=true;
              this.words='点击关闭评论区';
          }
          else{
              this.isShowComment=false;
              this.words='点击打开评论区';
          }
      },
      left(index){},
      showpop(which){
        if(which==1){
          this.showtools=true;
        }
        else{}
      },
      closepop(){
          this.showtools=false;
      },
      goOff(){
            /*if (window.history.length <= 1) {
                this.$router.push({path:'/'})
                return false
            } else {
                this.$router.go(-1)
            }*/
          this.$router.push({
              path:'/Home',
          });
      },
      onEditorReady(ins, ina) { // 上传失败的函数
        console.log('ins')
        console.log(ins)
        console.log(ina)
      },
      onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
        console.log('json')
        console.log(json)
        console.log(json[0].data.filePath)
        this.content = this.content + '<img src=' + json[0].data.filePath + '>'
      },
      toMyinfo(){
          this.$router.push({
              path:'/Myinfo',
          });
      },
      toLogin(){
          localStorage.setItem('myemail','');
          this.$router.push({
              path:'/',
          });
      },
	  initialuserhead(){
			console.log('initial!');
			  let _this=this;
			  let data = new FormData();
			  data.append('docId',this.docid);
			  console.log(this.docid);
			  axios.post(baseUrl+'/initialuserhead', data)
			  .then(function(response){//从后端取值
				if(response.data.success === true) {
				_this.userhead=response.data.result;
				}
				else { // 登录失败 ，，，
				  Toast(response.data.message);
				}
			  })
	  }
    },
    created(){
        this.docid=this.$route.query.editing;

		    this.initialuserhead();
    },
	mounted(){
		
	}
	}
</script>
<style scoped >
.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: fixed;
}
.up{
  background:white;
  width:100%;
  height:60px;
}
</style>
