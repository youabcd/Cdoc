<template>
  <div v-if="refreshed">
    <!--<div class="background">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
        </div>-->

<!--上标-->
    <div style="z-index:99999;position: absolute;width:100%;margin-top:-18px">
    <van-sticky>
      <div class="up" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <div style="padding:15px 0;">
          <van-row>
            <van-col span="4">
              <span style="font-size:21px;">金刚石文档</span>
            </van-col>
            <van-col span="6"></van-col>
            <van-col span="8">
              <el-dropdown placement="bottom">
                <span class="el-dropdown-link">
                  <el-input
                    v-model="searchData"
                    placeholder="搜索文件"
                    size="small"
                    prefix-icon="el-icon-search"
                  >
                  </el-input>
                </span>
                <el-dropdown-menu v-if="searchData.length>0" slot="dropdown">
                  <div
                    v-for="(item, index) in Newitems"
                    :key="index">
                    <el-dropdown-item>{{ item.docname }}</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </van-col>
            <van-col span="2"></van-col>
            <van-col span="1">
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
                    :src="userhead"
                  /><i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user" @click.native="toMyinfo"
                    >个人信息</el-dropdown-item
                  >
                  <el-dropdown-item
                    icon="el-icon-warning-outline"
                    @click.native="toLogin"
                    ><span style="color:red;">退出账号</span></el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-circle-plus-outline"
                    >帮助</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-sticky>
    </div>

    <div>

    <van-row style="margin-top:15px;">

<!--侧边栏-->
      <van-col span="4">
      <div style="">
        <van-sticky :offset-top="80">

        <van-row>

    <!--左边栏-->
        <van-col span="4" style="text-align:left;">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="onChange"
          >
            <el-menu-item index="0">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">工作台</span>
            </el-menu-item>
            <el-menu-item index="1">
              <i class="el-icon-receiving"></i>
              <span slot="title">收件箱</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-s-platform"></i>
              <span slot="title">我的桌面</span>
            </el-menu-item>

<!--团队部分-->
            <el-submenu index="3">
              <template slot="title">
                <van-icon name="friends" size="21px"/>
                <span slot="title">&nbsp&nbsp&nbsp团队空间</span>
              </template>
              <div v-for="(item,index) in allTeams" :key="index" @click="openindex(item)">
                  <el-menu-item>{{item.teamName}}</el-menu-item>
              </div>
            </el-submenu>

            <el-menu-item index="4">
              <i class="el-icon-delete-solid"></i>
              <span slot="title">&nbsp回收站</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-s-help"></i>
              <span slot="title">&nbsp帮助中心</span>
            </el-menu-item>
          </el-menu>
          </van-col>
          <van-col span="16"></van-col>

    <!--右边栏-->
          <van-col span="3">
          <van-button
            type=""
            block
            style="margin-top:66px;background-color: #071543;color: white" @click="newDoc"
            >新建</van-button
          >
          <van-button
            type=""
            block
            style="margin-top:16px;background-color: #f4f4f4;color: black"
            >模板库</van-button
          >
          <van-button
            type=""
            block
            style="margin-top:16px;background-color: #f4f4f4;color: black"
            >导入</van-button
          >
          </van-col>
          <van-col span="1"></van-col>

          </van-row>

          </van-sticky>
        </div>
        </van-col>


<!--中间部分-->
    <!--工作台-->


        <van-col span="16">
            <div style="z-index:999;position: relative;width:100%;margin-top:65px;">

                      <div v-if="index1">
                      <van-tabs v-model="activeDoc" style="width:80%;">
                      <van-tab title="最近使用"><RecentlyDoc /></van-tab>
                      <van-tab title="我创建的"><CreateDoc /></van-tab>
                      <van-tab title="我的收藏"><FavouriteDoc /></van-tab>
                      <van-tab title="工作动态">这里是工作动态项目</van-tab>
                      </van-tabs>
                      </div>

    <!--收件箱-->
          <div v-if="index2">
            收件箱
          </div>

    <!--桌面-->
          <div v-if="index3">
            <MyDesktop />
          </div>

    <!--团队空间-->
          <div v-if="index4">
            团队空间
          </div>

    <!--回收站-->
          <div v-if="index5">
            <RecycleBin />
          </div>

    <!--帮助中心-->
          <div v-if="index6">
            帮助中心
          </div>

      </div>
      </van-col>


      </van-row>
    </div>

<!--新建文件对话框-->
    <van-dialog v-model="showNew" title="新建文件" show-cancel-button @confirm="confirmNewFile">
        <van-field v-model="DocName" label="输入文件名" />
    </van-dialog>

  </div>
</template>

<script>
import { Toast } from "vant";
import baseUrl from "./baseUrl";
import axios from "axios";
import RecentlyDoc from "./HomePage/RecentlyDoc";
import CreateDoc from "./HomePage/CreateDoc";
import FavouriteDoc from "./HomePage/FavouriteDoc";
import RecycleBin from "./HomePage/RecycleBin";
import MyDesktop from "./HomePage/MyDesktop";

export default {
  name: "Home",
  components: { MyDesktop, RecycleBin, FavouriteDoc, CreateDoc, RecentlyDoc },
  data() {
    return {
      searchData: "",
      myemail: localStorage.getItem("myemail"), //登着的邮箱
      imgSrc: require("../assets/loginback.jpg"),
      userhead: "https://img.yzcdn.cn/vant/cat.jpeg", //用户头像
      icon1: "apps-o",
      icon2: "bars",
      size1: 25,
      size2: 15,

      activeDoc: "", // 最近使用 创建 收藏

      refreshed: true,

      showtype: 1, //平铺 1 列表 2
      index1: true,
      index2: false,
      index3: false,
      index4: false,
      index5: false,
      index6: false,
      showpop: false,

//队伍信息
      allTeams:[
          {teamId:"123",teamName:"niu牛0",teamLeader:"youabcd",teamCreateDate:"2020/8/13"},
          {teamId:"123",teamName:"niu牛1",teamLeader:"youabcd",teamCreateDate:"2020/8/13"},
          {teamId:"123",teamName:"niu牛2",teamLeader:"youabcd",teamCreateDate:"2020/8/13"},
          {teamId:"123",teamName:"niu牛3",teamLeader:"youabcd",teamCreateDate:"2020/8/13"},
      ],

//新建部分数据
      showNew:false,
      DocName:'',

    };
  },
  methods: {
    onCommand(command) {},
    onRowclick(row, event, column) {
      Toast(row.id);
    },

    openindex(item){
        Toast(item.teamName);
    },

//新建
    newDoc(){
        this.showNew=true;
    },
    confirmNewFile(){
        //需要传入 文件名 this.DocName 创建者 this.myemail
      let _this = this;
      let data = new FormData();
      data.append('docName',this.DocName+".doc");
      data.append('userId',this.myemail);
      axios.post(baseUrl+'/userCreateNewFile',data)
      .then(function (response) {
          if(response.data.success){
            _this.$router.push({
              path:'/test',
              query:{editing:response.data.result},
            });
          }
      })
      .catch(function (err) {
      })

    },

    changetype(type) {
      if (type == 1) {
        this.size1 = 25;
        this.size2 = 15;
        this.showtype = 1;
      } else if (type == 2) {
        this.size1 = 15;
        this.size2 = 25;
        this.showtype = 2;
      }
    },
    rank(index) {
      if (index == 1) {
      } else if (index == 2) {
      } else if (index == 3) {
      } else if (index == 4) {
      } else {
      }
    },
    toMyinfo() {
      this.$router.push({
        path: "/Myinfo"
      });
    },
    toLogin() {
      localStorage.setItem("myemail", "");
      this.$router.push({
        path: "/"
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openteam() {
      this.showpop = true;
    },
    onChange(index) {
      if (index == 0) {
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.index6 = false;
      } else if (index == 1) {
        this.index1 = false;
        this.index2 = true;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.index6 = false;
      } else if (index == 2) {
        this.index1 = false;
        this.index2 = false;
        this.index3 = true;
        this.index4 = false;
        this.index5 = false;
        this.index6 = false;
      } else if (index == 3) {
        this.index1 = false;
        this.index2 = false;
        this.index3 = false;
        this.index4 = true;
        this.index5 = false;
        this.index6 = false;
        this.show = true;
      } else if (index == 4) {
        this.index1 = false;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = true;
        this.index6 = false;
      } else if (index == 5) {
        this.index1 = false;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.index6 = true;
      }
    }
  },
  mounted() {
    let _this = this;
    let data = new FormData();
    data.append('userId',this.myemail);
    axios.post(baseUrl+'/showUserImage',data)
    .then(function (response) {
        _this.userhead = response.data;
    })
    .catch(function (err) {
    })

  },
  created() {},
  computed: {
    Newitems() {
      var _this = this;
      var Newitems = [];
      _this.tableData.map(function(item) {
        if (item.docname.search(_this.searchData) != -1) {
          Newitems.push(item);
        }
      });
      return Newitems;
    }
  }
};
</script>

<style>
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 1000px;
}
.up {
  background: white;
  width: 100%;
  height: 60px;
}
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
}
.leftdiv {
  width: 300px;
  height: 800px;
}
  .el-input{
    width: 300;
  }
</style>
