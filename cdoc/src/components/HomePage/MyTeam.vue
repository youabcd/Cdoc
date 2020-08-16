<template>
  <div class="MyTeam" id="MyTeam" @contextmenu="showMenu">
      <vue-context-menu :contextMenuData="contextMenuData"
        @home="home"
        @deletedata="deletedata"></vue-context-menu>

      <el-row style="width:100%;">
          <el-col span="8">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
                <el-table :data="gridData">
                  <el-table-column width="200" property="teamId" label="团队ID"></el-table-column>
                  <el-table-column width="100" property="teamLeaderName" label="创建者"></el-table-column>
                  <el-table-column width="200" property="teamLeaderId" label="创建者ID"></el-table-column>
                  <el-table-column width="200" property="teamCreateDate" label="团队创建时间"></el-table-column>
                </el-table>
                <el-button slot="reference">{{teamId}}</el-button>
              </el-popover>
            </el-col>

<!--邀请协助者-->
            <el-col span="8"><el-button type="primary" round @click="invite">邀请成员进入</el-button></el-col>

<!--退出/删除团队-->
            <el-col span="8">
                <el-button type="danger" round="" @click="deleteTeam" v-if="myemail==TeamData[0].TeamLeaderID">删除团队
                </el-button>

                <el-button type="danger" round="" @click="deleteTeam" v-if="myemail!=TeamData[0].TeamLeaderID">退出团队
                </el-button>
            </el-col>
          </el-row>

<!--表格-->
          <el-tabs v-model="activeName" type="card" style="margin-top:36px;">

<!--团队成员表-->
            <el-tab-pane label="团队成员" name="first">
              <el-table
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
              >

                <el-table-column
                  prop="UserName"
                  label="成员姓名"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="ParticipateDate"
                  label="加入时间"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="UserId"
                  label="成员ID"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="PowerToTeam"
                  label="成员权限"
                  sortable>
                </el-table-column>



                <el-table-column label="移除成员">

                  <template slot-scope="scope">
                    <el-popconfirm
                      cancelButtonText='取消'
                      confirmButtonText='确定'
                      icon="el-icon-info"
                      iconColor="red"
                      title="是否确定移除该成员？"
                    >
                      <el-button slot="reference" type="danger">移除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>


<!--文档列表-->
            <el-tab-pane label="团队文档" name="second">
              <el-table
                :row-class-name="rowClassName"
                :data="tableData02"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @cell-mouse-enter="hoverInTable"
                @cell-mouse-leave="hoverOutTable"
              >


                <el-table-column
                  prop="TextName"
                  label="文件名"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="Founder"
                  label="创建者"
                  sortable
                >
                </el-table-column>

                <el-table-column
                  prop="UpdateDate"
                  label="更新时间"
                  sortable
                >
                </el-table-column>



                <el-table-column label="删除文档">
                  <template slot-scope="scope">
                    <el-popconfirm
                      confirmButtonText='确定'
                      cancelButtonText='取消'
                      icon="el-icon-info"
                      iconColor="red"
                      title="是否确定删除文档？"
                    >
                      <el-button slot="reference" type="danger">删除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>

                <el-table-column>
                  <template slot-scope="scope">
                    <el-dropdown placement="bottom-start" @command="chooseFile">
                      <span class="el-dropdown-link">
                        <i v-if="scope.$index==nowindex" class="el-icon-s-tools" ></i>
                      </span>
                      <el-dropdown-menu slot="dropdown"  style="width: 220px">
                        <van-row><van-col span="2"></van-col>
                          <van-col span="20">
                            <el-dropdown-item>
                              <van-image
                                width="20"
                                height="20"
                                :src="require('../../assets/file.jpg')"/>&nbsp;
                              文档操作</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline" command="0">预览文件</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline" command="1" :disabled="tableData02[scope.$index].power<2">编辑文件</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-star-off" divided command="2">收藏</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-share" command="3">分享</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-top-right" command="4" divided>导出</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit" command="5" :disabled="tableData02[scope.$index].power<3">重命名</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-document" command="6">创建副本</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete" divided style="color: red" command="7">删除</el-dropdown-item>
                          </van-col>
                          <van-col span="2"></van-col>
                        </van-row>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>


              </el-table>
              </el-tab-pane>

<!--权限列表-->
            <el-tab-pane label="权限设置" name="third">
              <el-table
                :data="tableData03"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
              >


                <el-table-column
                  prop="UserName"
                  label="成员姓名"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="UserId"
                  label="成员ID"
                  sortable
                >
                </el-table-column>

                <el-table-column
                  prop="PowerToTeam"
                  label="成员权限"
                  sortable>
                </el-table-column>

                <el-table-column
                  prop="TextPower"
                  label="文档权限"
                  sortable>
                </el-table-column>

                <el-table-column label="设置文档权限">
                  <template slot-scope="scope">
                    <el-popover
                      placement="right"
                      width="400"
                      trigger="click">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 15px 0;"></div>
                      <el-checkbox-group v-model="checkedTextPowers" @change="handleCheckedTextPowersChange">
                        <el-checkbox v-for="TextPower in textpowers" :label="TextPower" :key="TextPower">{{TextPower}}</el-checkbox>
                      </el-checkbox-group>
                      <el-button slot="reference">设置权限</el-button>

                    </el-popover>

                  </template>
                </el-table-column>

                <el-table-column label="设置成员权限">
                  <template slot-scope="scope">
                    <el-popover
                      placement="right"
                      width="400"
                      trigger="click">
                        <el-radio-group v-model="radio">
                          <el-radio :label="3">创建者权限</el-radio>
                          <el-radio :label="6">管理权限</el-radio>
                          <el-radio :label="9">邀请权限</el-radio>
                          <el-radio :label="12">无权限</el-radio>
                        </el-radio-group>

                      <el-button slot="reference">设置权限</el-button>
                    </el-popover>
                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>

          </el-tabs>


<!--邀请对话框-->
    <van-dialog v-model="showInvite" title="邀请协助者" show-cancel-button style="height:400px;width:350px;" @confirm="confirmInvite" :show-confirm-button="isshowConfirm" confirm-button-text="发送邀请" @cancel="cancelInvite">
        <van-search v-model="keywords" placeholder="请输入受邀对象用户名" v-if="radio=='1'" @input="onSearch"/>
        <van-search v-model="keywords" placeholder="请输入受邀对象邮箱" v-if="radio=='2'" @input="onSearch"/>

        <template>
            <el-radio v-model="radio" label="1" @change="onSearch">用户名搜索</el-radio>
            <el-radio v-model="radio" label="2" @change="onSearch">用户邮箱搜素</el-radio>
        </template>

        <van-cell v-for="(item,index) in possible" :key="item" :title="possible[index].userName" title-style="text-align:left;margin-left:20px;" :icon="possible[index].userImage" clickable @click="chooseOne(item)" v-if="radio=='1'&&havechoose==false">
            <template #icon>
                <van-image
                width="25"
                round
                fit="cover"
                height="25"
                :src="possible[index].userImage"/>
            </template>
        </van-cell>
        <van-cell v-for="(item,index) in possible" :key="item" :title="possible[index].userId" title-style="text-align:left;margin-left:20px;" :icon="possible[index].userImage" clickable @click="chooseOne(item)" v-if="radio=='2'&&havechoose==false">
            <template #icon>
                <van-image
                width="25"
                round
                fit="cover"
                height="25"
                :src="possible[index].userImage"/>
            </template>
        </van-cell>

        <div v-if="havechoose==true" style="margin-top:50px;">
            <p style="margin-left:20px;color:grey;"></p>
        </div>
    </van-dialog>

  </div>

</template>

<script>

  import axios from 'axios'
  import {Dialog, Toast} from 'vant'
  import baseUrl from "../baseUrl";
  const TextPowerOptions = ['可读', '可编辑', '可分享', '可评论'];

export default {

  name: 'MyTeam',

  mixins: [],

  components: {},

  props: {
      teamId:{//团队ID
          type:String,
          teamId:null,
          required:true
      },
  },

  data() {
    return {
      teamId:'',

      nowindex: -1,
      lastindex: -1,
      newDocName: '',
      showRenameDialog: false,

      contextMenuData: {
            menuName: 'demo',
            //菜单显示的位置
            axis: {
                x: null,
                y: null
            },
            //菜单选项
            menulists: [{
                fnHandler: 'home', //绑定事件
                icoName: 'fa fa-home fa-fw', //icon图标
                btnName: '回到主页' //菜单名称
            },
            {
                fnHandler: 'deletedata',
                icoName: 'fa fa-minus-square-o  fa-fw',
                btnName: '删除布局'
            }]
          },
      myemail:localStorage.getItem('myemail'),
      activeName:'first',
      drawer: false,
      innerDrawer: false,
      radio: 3,
      checkAll: false,
      checkedTextPowers: ['可读', '可分享'],
      textpowers: TextPowerOptions,
      isIndeterminate: true,

//团队信息
      TeamData: [{
        TeamId:'1234567',
        TeamLeaderName: '张三',
        TeamLeaderID: '1',
        TeamCreateDate:'2020-8-10'

      }],

//成员信息
      tableData: [{
        UserName: '张三',
        ParticipateDate: '2020-08-10',
        UserId: '1234567',
        PowerToTeam: '团主'
      }, {
        UserName: '李四',
        ParticipateDate: '2020-08-11',
        UserId: '7654321',
        PowerToTeam: '管理员'
      }, {
        UserName: '王二',
        ParticipateDate: '2020-08-11',
        UserId: '1122344',
        PowerToTeam: '成员'
      }, {
        UserName: '刘五',
        ParticipateDate: '2020-08-12',
        UserId: '1111111',
        PowerToTeam: '成员'
      }],
//文档信息

      tableData02: [{
        TextName: '文件1',
        Founder: '张三',
        UpdateDate: '2020-8-12',
      }, {
        TextName: '文件2',
        Founder: '张三',
        UpdateDate: '2020-8-12',
      }, {
        TextName: '文件3',
        Founder: '张三',
        UpdateDate: '2020-8-12',
      }, {
        TextName: '文件4',
        Founder: '张三',
        UpdateDate: '2020-8-12',
      }],

//成员权限信息
      tableData03: [{
        UserName: '张三',
        UserId: '1234567',
        PowerToTeam: '团主',
        TextPower: '可读,可分享'
      }, {
        UserName: '李四',
        UserId: '7654321',
        PowerToTeam: '管理员',
        TextPower: '可读,可分享'
      }, {
        UserName: '王二',
        UserId: '1122344',
        PowerToTeam: '成员',
        TextPower: '可读,可分享'
      }, {
        UserName: '刘五',
        UserId: '1111111',
        PowerToTeam: '成员',
        TextPower: '可读,可分享'
      }],

      //邀请成员
      showInvite:false,
      radio:'1',
      checked:false,
      isshowConfirm:false,
      keywords:'',//搜索用关键字
      havechoose:false,
      possible:[//可能搜索对象推荐
               ],

    }

  },


  methods: {
//鼠标右键点击事件
    showMenu () {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
      this.contextMenuData.axis = {
        x, y
      }
    },
    homed () {
      alert("主页")
    },
    deletedata () {
      console.log('delete!')
    },

    // 下拉框部分
    rowClassName({row,rowIndex}){
      row.index = rowIndex;
    },
    hoverInTable(row){
      this.nowindex = row.index;
      this.lastindex = row.index;
    },
    hoverOutTable(row){
      this.nowindex = -1;
    },
    chooseFile(command){
      let index = this.lastindex;
      if(command==0)
        this.showFile(index);
      else if(command==1)
        this.openFile(index);
      else if(command==2)
        this.setFavourite(index);
      else if(command==3)
        this.shareFile(index);
      else if(command==4)
        this.exportFile(index);
      else if(command==5)
        this.renameFile(index);
      else if(command==6)
        this.saveFileAs(index);
      else if(command==7)
        this.deleteFile(index);
    },
//新建文件
    newDoc(){
      this.showNew=true;
    },
    confirmNewFile(){
      //需要传入 文件名 this.DocName 创建者 this.myemail  团队id  this.teamID(-1为不在团队内，其余为团队id)
      let _this = this;
      let data = new FormData();
      data.append('docName',this.DocName+='.doc');
      data.append('userId',this.myemail);
      data.append('teamId',this.teamID);
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

//分享框部分
    //搜索推荐用户
    onSearch(){
      this.havechoose=false;
      //this.keywords传给后端，返回至多5个可能目标用户
      let _this = this;
      let data = new FormData();
      data.append('value',this.keywords);
      let model = 1;
      if(this.radio == 1)
        model = 2;
      data.append('model',model);
      data.append('userId',this.myemail);
      axios.post(baseUrl+'/userSearchDocUser',data)
        .then(function (response) {
          _this.possible = [];
          for(let i=0; i<response.data.length;i++){
            _this.possible.push(response.data[i]);
          }
        })
        .catch(function (err) {
        })
    },

    //点击推荐用户
    chooseOne(item){
      this.keywords=item.useremail;
      this.havechoose=true;
      this.isshowConfirm=true;
    },

    confirmShare(){//提交分享 参数：分享对象邮箱 keywords 是否给编辑权限 check(false 不给/true 给)
      let index = this.lastindex;
      let _this = this;

      let data = new FormData();
      data.append('userId',this.myemail);
      data.append('objId',this.keywords);
      data.append('docId',this.tableList[index].docid);
      data.append('power',this.checked);
      axios.post(baseUrl+'/userShareFile',data)
        .then(function (response) {
          Toast(response.data.message);
        })
        .catch(function (err) {
        });

      this.keywords='';
      this.havechoose=false;
      this.isshowConfirm=false;
    },

    cancelShare(){
      this.keywords='';
      this.havechoose=false;
      this.isshowConfirm=false;
    },
    // 预览文件
    showFile(index){
      // TODO 预览文件
      localStorage.setItem('readnow',true);
      this.$router.push({
        path:'/test',
        query:{
          editing:this.tableList[index].docid,
        },
      });
    },
    // 打开文件
    openFile(index){
      localStorage.setItem('readnow',false);
      this.$router.push({
        path:'/test',
        query:{editing:this.tableList[index].docid,
        },
      });
    },
    // 收藏文件
    setFavourite(index) {
      let _this = this;
      let data = new FormData();
      data.append('userId',this.myemail);
      data.append('docId',this.tableList[index].docid);
      axios.post(baseUrl+'/userSetFavourite',data)
        .then(function (response) {
          Toast(response.data.message);
        })
        .catch(function (err) {
        })
    },
    // 分享文件
    shareFile(index){
      // TODO 分享文件，设置权限
      this.showShare=true;
    },
    // 导出文件
    exportFile(index){
      // TODO 下载文件 文件id为this.tableList[index].docid
    },
    // 文件重命名
    renameFile(index){
      this.showRenameDialog = true;
      this.newDocName = this.tableList[index].docname;
      this.newDocName = this.newDocName.substring(0,this.newDocName.length-4);
    },
    confirmRenameFile(){
      // TODO 文件重命名
      let index = this.lastindex;
      let _this = this;
      let data = new FormData();
      data.append('userId',this.myemail);
      data.append('docId',this.tableList[index].docid);
      data.append('newName',this.newDocName+".doc");
      axios.post(baseUrl+'/userRenameFile',data)
        .then(function (response) {
          Toast(response.data.message);
          if(response.data.success) {
            _this.tableList[index].docname = _this.newDocName+".doc";
          }
        })
        .catch(function (err) {
        })
    },
    // 保存文件副本
    saveFileAs(index){
      // 保存文件副本
      let name =this.tableList[index].docname;
      name = name.substring(0,name.length-4);
      Toast(name);
      let _this = this;
      let data = new FormData();
      data.append('userId',this.myemail);
      data.append('docName',name+"-副本.doc");
      axios.post(baseUrl+'/userCreateNewFile',data)
        .then(function (response) {
          Toast(response.data.message);
          if(response.data.success)
            _this.loadData();
        })
        .catch(function (err) {
        })
    },
    // 删除文件
    deleteFile(index){
      let msg = '';
      console.log(this.tableList[index].ownerid)
      if(this.tableList[index].ownerid === this.myemail){
        msg = "文件将被放入回收站，是否确认？";
      }
      else{
        msg = "您不是文件的创建者，此操作只会删除文件在您这里的显示，文件本身不会删除，是否确认？"
      }
      Dialog.confirm({
        title: '删除文件',
        message: msg,
      })
        .then(() => {
          let _this = this;
          let data = new FormData();
          data.append('userId',this.myemail);
          data.append('docId',this.tableList[index].docid);
          axios.post(baseUrl+'/userDeleteFile',data)
            .then(function (response) {
              Toast(response.data.message);
              if(response.data.success){
                _this.loadData();
              }
            })
            .catch(function (err) {
            })
        })
        .catch(() => {
        });
    },












//邀请成员
    invite(){
        this.showInvite=true;
    },
        //搜索推荐用户
        onSearch(){
            this.havechoose=false;
            //this.keywords传给后端，返回至多5个可能目标用户
            let _this = this;
            let data = new FormData();
            data.append('value',this.keywords);
            let model = 1;
            if(this.radio == 1)
              model = 2;
            data.append('model',model);
            data.append('userId',this.myemail);
            axios.post(baseUrl+'/userSearchDocUser',data)
            .then(function (response) {
              _this.possible = [];
                for(let i=0; i<response.data.length;i++){
                  _this.possible.push(response.data[i]);
                }
            })
            .catch(function (err) {
            })
        },

        //点击推荐用户
        chooseOne(item){
            this.keywords=item.userId;
            this.havechoose=true;
            this.isshowConfirm=true;
        },

        confirmInvite(){//提交分享 参数：分享对象邮箱 keywords
            let index = this.nowindex;
            let _this = this;
            let data = new FormData();
            data.append('userId',this.myemail);
            data.append('objId',this.keywords);
            data.append('teamId',this.teamId);
            axios.post(baseUrl+'/userShareFile',data)
            .then(function (response) {
                Toast(response.data.message);
            })
            .catch(function (err) {
            });

            this.keywords='';
            this.havechoose=false;
            this.isshowConfirm=false;

        },

        cancelInvite(){
            this.keywords='';
            this.havechoose=false;
            this.isshowConfirm=false;
        },




    formatter(row, column) {
      return row.address;
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },


//点击进入编辑器页面
    clickFile(row){
        this.$router.push({
            path:'/test',
            query:{editing:row.textId},
        });
    },

//鼠标右键动作
    mouseClickright(){},

    show(){
    document.oncontextmenu = function(){return false};     //禁止鼠标右键菜单显示
     var res = document.getElementById('MyTeam');      //找到id为box的div
     document.body.onmouseup = function(e){     //在body里点击触发事件
        if(e.button===2){       //如果button=1（鼠标左键），button=2（鼠标右键），button=0（鼠标中间键）
            console.log(e);     //将传进去的参数打印出来
            console.log(e.offsetY);     //打印出鼠标点击的Y轴坐标
            console.log(e.offsetX);     //打印出鼠标点击的X轴坐标
            res.style.top = e.offsetY+'px';     //鼠标点击时给div定位Y轴
            res.style.left = e.offsetX+'px';    //鼠标点击时给div定位X轴
            res.style.display = 'block';        //显示div盒子
        }else{
            res.style.display = 'none';         //否则不显示div盒子
        }

     }
     },

    open() {
      this.$prompt('请输入邀请成员手机号码', '邀请', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已发出邀请'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出'
        });
      });
    },

    open2() {
      this.$confirm('此操作将永久删除该团队空间, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCheckAllChange(val) {
        this.checkedTextPowers = val ? TextPowerOptions : [];
        this.isIndeterminate = false;
      },
    handleCheckedTextPowersChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.textpowers.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.textpowers.length;
      },

  }
}
</script>

<style>
  .el-table td, .el-table th{
    text-align :center
  }
  .item {
    float: right;
  }
</style>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
