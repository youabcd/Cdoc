<template>
    <div v-if="refreshed">
        <!--<div class="background">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
        </div>-->
        <van-sticky>
            <div class="up" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
              <div style="padding:15px 0;">
                <van-row>
                  <van-col span="3">
                      <span style="font-size:21px;">金刚石文档</span>
                  </van-col>
                  <van-col span="7"></van-col>
                  <van-col span="8">
                       <el-input placeholder="搜索文件"
                       size="small"
                       prefix-icon="el-icon-search"
                       v-model="input2">
                       </el-input>
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
                </van-row>
              </div>
            </div>
        </van-sticky>


      <div>
        <van-row  style="margin-top:15px;">
          <van-col span="3">
            <van-sidebar v-model="activeKey" @change="onChange" style="width:100%;">
              <van-sidebar-item title="工作台" />
              <van-sidebar-item title="收件箱" />
              <van-sidebar-item title="我的桌面" />
              <van-cell is-link style="width:100%;" @click="openteam">
                  <van-sidebar-item title="团队空间" @click="openteam" />
              </van-cell>
              <van-sidebar-item title="回收站" />
              <van-sidebar-item title="帮助中心" />
            </van-sidebar>
          </van-col>

          <van-col span="17">
            <div v-if="index1">
              <van-tabs v-model="activeDoc" style="width:80%;">
                <van-tab title="最近使用"><RecentlyDoc/></van-tab>
                <van-tab title="我创建的"><CreateDoc/></van-tab>
                <van-tab title="我的收藏"><FavouriteDoc/></van-tab>
                <van-tab title="工作动态">内容 4</van-tab>
              </van-tabs>
            </div>

            <div v-if="index2">
                收件箱
            </div>

            <div v-if="index3">
                <MyDesktop/>
            </div>

            <div v-if="index4">
                团队空间
            </div>

            <div v-if="index5">
              <RecycleBin/>
            </div>

            <div v-if="index6">
                帮助中心
            </div>

          </van-col>

          <van-col span="3">
              <van-button type="" block style="margin-top:66px;background-color: #071543;color: white">新建</van-button>
              <van-button type="" block style="margin-top:16px;background-color: #f4f4f4;color: black">模板库</van-button>
              <van-button type="" block style="margin-top:16px;background-color: #f4f4f4;color: black">导入</van-button>
          </van-col>

          <van-col span="1">
          </van-col>
        </van-row>
      </div>

      <van-popup
      v-model="showpop"
      closeable
      position="left"
      :style="{ height: '100%',width:'50%'}">
          <van-cell v-for="(item,index) in teams" :key="item" :title="teams[index].teamName" clickable @click="toteamwork(item)" style="margin-top:40px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)" >
              <template #icon>
                    <van-image
                        width="80"
                        height="80"
                        :src="require('../assets/team.jpg')">
                    </van-image>
              </template>
              <template #default>
                  <div style="color:">团队创建者:</div><div style="font-size: 20px; color:">{{teams[index].teamLeader}}</div>
              </template>
          </van-cell>
      </van-popup>

    </div>
</template>

<script>
    import {Toast} from "vant";
    import baseUrl from "./baseUrl";
    import axios from 'axios'
    import RecentlyDoc from "./HomePage/RecentlyDoc";
    import CreateDoc from "./HomePage/CreateDoc";
    import FavouriteDoc from "./HomePage/FavouriteDoc";
    import RecycleBin from "./HomePage/RecycleBin";
    import MyDesktop from "./HomePage/MyDesktop";

    export default{
      name: "Home",
      components: {MyDesktop, RecycleBin, FavouriteDoc, CreateDoc, RecentlyDoc},
      data(){
            return{
                myemail:localStorage.getItem('myemail'),//登着的邮箱
                imgSrc:require('../assets/loginback.jpg'),
                userhead:"https://img.yzcdn.cn/vant/cat.jpeg",//用户头像
                icon1:'apps-o',
                icon2:'bars',
                size1:25,
                size2:15,

                activeDoc: '',  // 最近使用 创建 收藏

              refreshed: true,

                showtype:1,//平铺 1 列表 2
                index1:true,
                index2:false,
                index3:false,
                index4:false,
                index5:false,
                index6:false,
                showpop:false,
                teams:[
                  {teamId: '',teamName: '', teamLeader:'',teamCreateDate:''}
                ],//队伍名称
                //teamowner:['she','you','he','she','you','he','she','you','he'],//队伍创立者

                tableData: [{ // 我创建的
                id:'1',
          date: '2016-05-03',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'2',
          date: '2016-05-02',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'3',
          date: '2016-05-04',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'4',
          date: '2016-05-01',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'5',
          date: '2016-05-08',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'6',
          date: '2016-05-06',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }, {
        id:'7',
          date: '2016-05-07',
          owner: '王小虎',
          docname: '上海市普陀区金沙江路 1518 弄'
        }],
            }
        },
        methods:{
            onCommand(command){
            },
            onRowclick(row,event,column){
                Toast(row.id);
            },
            changetype(type){
                if(type==1){
                    this.size1=25;
                    this.size2=15;
                    this.showtype=1;
                }
                else if(type==2){
                    this.size1=15;
                    this.size2=25;
                    this.showtype=2;
                }
            },
            rank(index){
                if(index==1){}
                else if(index==2){}
                else if(index==3){}
                else if(index==4){}
                else {}
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
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            openteam(){
                this.showpop=true;
            },
            onChange(index) {
                if(index==0){
                    this.index1=true;
                    this.index2=false;
                    this.index3=false;
                    this.index4=false;
                    this.index5=false;
                    this.index6=false;
                }
                else if(index==1){
                    this.index1=false;
                    this.index2=true;
                    this.index3=false;
                    this.index4=false;
                    this.index5=false;
                    this.index6=false;
                }
                else if(index==2){
                    this.index1=false;
                    this.index2=false;
                    this.index3=true;
                    this.index4=false;
                    this.index5=false;
                    this.index6=false;
                }
                else if(index==3){
                    this.index1=false;
                    this.index2=false;
                    this.index3=false;
                    this.index4=true;
                    this.index5=false;
                    this.index6=false;
                    this.show=true;
                }
                else if(index==4){
                    this.index1=false;
                    this.index2=false;
                    this.index3=false;
                    this.index4=false;
                    this.index5=true;
                    this.index6=false;
                }
                else if(index==5){
                    this.index1=false;
                    this.index2=false;
                    this.index3=false;
                    this.index4=false;
                    this.index5=false;
                    this.index6=true;
                }
            },
        },
      mounted(){

      },
      created() {

      }
    }
</script>

<style>
.up{
  background:white;
  width:100%;
  height:60px;

}
.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: fixed;
}
.leftdiv{
	width:300px;
	height:800px;
}
</style>
