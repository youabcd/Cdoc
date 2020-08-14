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

            <el-col span="8"><el-button type="primary" round @click="open">邀请成员进入</el-button></el-col>

            <el-col span="8"><el-button type="danger" round="" @click="open2">删除该团队</el-button></el-col>
          </el-row>

<!--表格-->
          <el-tabs v-model="activeName" type="card" style="margin-top:36px;">

<!--团队成员表-->
            <el-tab-pane label="团队成员" name="first">
              <el-table
                :data="tableData"
                height="450"
                style="width: 100%"
                :default-sort = "{prop: 'UserName', order: 'descending'}">

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

<!--团队文件表-->
            <el-tab-pane label="团队文档" name="third">
              <el-table
                :data="tableData02"
                height="450"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @row-click="clickFile">


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

              </el-table>
            </el-tab-pane>

          </el-tabs>


  </div>

</template>

<script>

  const TextPowerOptions = ['可读', '可编辑', '可分享', '可评论'];

export default {
  name: 'MyTeam',

  mixins: [],

  components: {},

  props: {teamId:{type:String,teamId:null,required:true}},

  data() {
    return {
      teamId:'',

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

      activeName:'first',
      drawer: false,
      innerDrawer: false,
      radio: 3,
      checkAll: false,
      checkedTextPowers: ['可读', '可分享'],
      textpowers: TextPowerOptions,
      isIndeterminate: true,

//团队信息
      gridData: [{
        teamId:'1234567',
        teamName:'youabcd',
        teamLeaderName: '张三',
        teamLeaderId: '1111111',
        teamCreateDate:'2020-8-10'
      }],

//成员信息
      tableData: [
      {
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
      },{
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
      },{
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
      },],

//文件信息
      tableData02: [{
        TextName: '文件1',
        Founder: '张三',
        UpdateDate: '2020-8-12',
        TextPower: '可读',
        textId:'123',
      }, {
        TextName: '文件2',
        Founder: '张三',
        UpdateDate: '2020-8-12',
        TextPower: '可编辑',
        textId:'123k',
      }, {
        TextName: '文件3',
        Founder: '张三',
        UpdateDate: '2020-8-12',
        TextPower: '可分享',
        textId:'12g',
      }, {
        TextName: '文件4',
        Founder: '张三',
        UpdateDate: '2020-8-12',
        TextPower: '可评论',
        textId:'1243',
      }],

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
