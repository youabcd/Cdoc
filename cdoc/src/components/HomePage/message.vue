<template>
  <el-container>
    <el-aside width="50px"></el-aside>
    <el-main>
      <div>
        <h2 style="color: darkgrey">我的消息</h2>
        <br />
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="新消息" name="first">
            <el-table
              :data="newmessage"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column align="center" width="50">
                <el-badge is-dot class="item">
                  <i class="el-icon-message-solid"></i>
                </el-badge>
              </el-table-column>
              <el-table-column prop="message" label="信息" align="center"></el-table-column>
              <el-table-column prop="date" label="日期" align="center" width="150px"></el-table-column>
              <el-table-column prop="people" label="发件人" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <!--type=='1'-->
                  <el-tooltip v-if="scope.row.type=='1'" effect="dark" content="查看" placement="top">
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-right"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                  <!--type=='2'-->
                  <el-tooltip v-if="scope.row.type=='2'" effect="dark" content="同意" placement="top">
                    <el-button
                      size="small"
                      type="success"
                      icon="el-icon-check"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.type=='2'" effect="dark" content="拒绝" placement="top">
                    <el-button
                      size="small"
                      type="danger"
                      icon="el-icon-close"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                  <!--type=='3'-->
                  <el-tooltip
                    v-if="scope.row.type=='3'"
                    effect="dark"
                    content="去查看被评论文档"
                    placement="top"
                  >
                    <el-button
                      size="small"
                      type="primary"
                      icon="el-icon-right"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                  <!--type=='4'-->
                  <el-tooltip v-if="scope.row.type=='4'" effect="dark" content="查收" placement="top">
                    <el-button
                      size="small"
                      type="danger"
                      icon="el-icon-check"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                  <!--type=='5'-->
                  <el-tooltip v-if="scope.row.type=='5'" effect="dark" content="查收" placement="top">
                    <el-button
                      size="small"
                      type="warning"
                      icon="el-icon-check"
                      circle
                      @click="changemessage(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="已读消息" name="second">
            <el-table
              :data="oldmessage"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column align="center" width="50">
                <i class="el-icon-message-solid"></i>
              </el-table-column>
              <el-table-column prop="message" label="信息" align="center"></el-table-column>
              <el-table-column prop="date" label="日期" align="center" width="120px"></el-table-column>
              <el-table-column prop="people" label="发件人" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                  <!--type=='1'-->
                  <el-tooltip v-if="scope.row.type=='1'" effect="dark" content="查看" placement="top">
                    <el-button size="small" type="primary" icon="el-icon-right" circle></el-button>
                  </el-tooltip>
                  <!--type=='3'-->
                  <el-tooltip
                    v-if="scope.row.type=='3'"
                    effect="dark"
                    content="去查看被评论文档"
                    placement="top"
                  >
                    <el-button size="small" type="primary" icon="el-icon-right" circle></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除" placement="top">
                    <el-button size="small" type="danger" icon="el-icon-delete" circle></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import message from "./message";
  export default {
    name: "test",
    components: { message },
    data() {
      return {
        activeName: "first",
        number: "10",
        drawer: false,
        oldmessage: [],
        newmessage: [
          {
            // 我创建的
            type: "1",
            id: 1,
            message: "L1给你分享了文件",
            date: "2020-08-01",
            people: "Matrix.L",
            state: "new",
          },
          {
            type: "2",
            id: 2,
            message: "L2邀请你加入团队",
            date: "2020-08-02",
            people: "Matrix.L",
            state: "new",
          },
          {
            type: "3",
            id: 3,
            message: "L3评论了你的文档",
            date: "2020-08-03",
            people: "Matrix.L",
            state: "new",
          },
          {
            type: "4",
            id: 4,
            message: "L4将你踢出了团队",
            date: "2020-08-03",
            people: "Matrix.L",
            state: "new",
          },
          {
            // 我创建的
            type: "5",
            id: 5,
            message: "L5拒绝了你的邀请LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
            date: "2020-08-04",
            people: "Matrix.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
            state: "new",
          },
        ],
      };
    },
    methods: {
      shownumber() {
        return this.number;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changemessage(temp) {
        var i;
        var position = 0;
        for (i = 0; i < this.newmessage.length; i++) {
          if (this.newmessage[i].id == temp) {
            position = i;
            break;
          }
        }
        var dic = new Array();
        dic["type"] = this.newmessage[position].type;
        dic["id"] = this.newmessage[position].id;
        dic["message"] = this.newmessage[position].message;
        dic["date"] = this.newmessage[position].date;
        dic["people"] = this.newmessage[position].people;

        this.newmessage.splice(position, 1);
        this.oldmessage.splice(this.oldmessage.length - 1, 0, dic);
      },
    },
  };
</script>

<style>
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
