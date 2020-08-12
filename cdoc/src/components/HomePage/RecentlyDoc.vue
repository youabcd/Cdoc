<template>
  <div>

    <br/>
    <van-row>
      <van-col span="21"></van-col>
      <van-col span="2">

        <div style="border-right: 3px solid;border-color: darkgrey">
    <span>
      <el-tooltip class="item" effect="dark" content="文件排序方式" placement="top-start">
        <el-popover
          placement="bottom"
          width="120"
          trigger="click"
          content="">
          <van-cell-group>
            <van-cell title="更改时间" clickable @click="rank(1)"/>
            <van-cell title="创建时间" clickable @click="rank(2)"/>
          </van-cell-group>

          <van-icon name="ellipsis" slot="reference" clickable/>
        </el-popover>
      </el-tooltip>
    </span>
      </div>

      </van-col>
    </van-row>
    <br/>



  <div v-for="(item,index) in fileList" :key="item">
    <van-row>
      <van-col span="2"></van-col>
      <van-col span="20">
        <div style="border-top: 3px solid;border-color: darkgrey;" >
          <h3 style="color: #656565;">{{fileList[index].date}}</h3>
        </div>
      </van-col>
      <van-col span="2">
      </van-col>
    </van-row>

    <van-row>
      <van-col span="2">
      </van-col>

      <van-col span="10">

<div  v-for="(item,index1) in fileList[index].doclist" :key="item">
  <el-dropdown placement="bottom-start" @command="chooseFile" trigger="click">
              <span class="el-dropdown-link">

        <van-cell :title="fileList[index].doclist[index1].docname" clickable  style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);width: 300px" v-if="index1%2==0" @click="clickFile(index,index1)">

          <template #icon>


            <van-image
              width="45"
              height="45"
              :src="require('../../assets/file.jpg')">
            </van-image>

          </template>
          <template #default>

            <div style="color:">创建者:</div><div style="font-size: 20px; color:">{{fileList[index].doclist[index1].owner}}</div>
          </template>
          <template #label>
            <div v-bind:style="{width:'80%'}"><div class="van-ellipsis">{{fileList[index].doclist[index1].doc}}</div></div>
          </template>
        </van-cell>

                </span>
    <el-dropdown-menu slot="dropdown"  style="width: 220px">
      <van-row><van-col span="2"></van-col>
        <van-col span="20">
          <el-dropdown-item>
            <van-image
              width="20"
              height="20"
              :src="require('../../assets/file.jpg')"/>&nbsp;
            {{fileList[index].doclist[index1].docname}}</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-edit-outline" command="0">预览文件</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit-outline" command="1" :disabled="item.power<2">编辑文件</el-dropdown-item>
          <el-dropdown-item icon="el-icon-star-off" divided command="2">收藏</el-dropdown-item>
          <el-dropdown-item icon="el-icon-share" command="3">分享</el-dropdown-item>
          <el-dropdown-item icon="el-icon-top-right" command="4" divided>导出</el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit" command="5" :disabled="item.power<3">重命名</el-dropdown-item>
          <el-dropdown-item icon="el-icon-document" command="6">创建副本</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" divided style="color: red" command="7">删除</el-dropdown-item>
        </van-col>
        <van-col span="2"></van-col>
      </van-row>
    </el-dropdown-menu>
  </el-dropdown>

</div>

      </van-col>

      <van-col span="1">
      </van-col>

      <van-col span="10">

        <div  v-for="(item,index1) in fileList[index].doclist" :key="item">
          <el-dropdown placement="bottom-start" @command="chooseFile" trigger="click">
              <span class="el-dropdown-link">

        <van-cell :title="fileList[index].doclist[index1].docname" clickable  style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);width: 300px" v-if="index1%2==1"  @click="clickFile(index,index1)">
          <template #icon>
            <van-image
              width="45"
              height="45"
              :src="require('../../assets/file.jpg')"/>
          </template>
          <template #default>
            <div style="color:">创建者:</div><div style="font-size: 20px; color:">{{fileList[index].doclist[index1].owner}}</div>
          </template>
          <template #label>
            <div v-bind:style="{width:'80%'}"><div class="van-ellipsis">{{fileList[index].doclist[index1].doc}}</div></div>
          </template>
        </van-cell>

                </span>
            <el-dropdown-menu slot="dropdown"  style="width: 220px">
              <van-row><van-col span="2"></van-col>
                <van-col span="20">
                  <el-dropdown-item>
                    <van-image
                      width="20"
                      height="20"
                      :src="require('../../assets/file.jpg')"/>&nbsp;
                    {{fileList[index].doclist[index1].docname}}</el-dropdown-item>
                  <el-dropdown-item divided icon="el-icon-edit-outline" command="0">预览文件</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit-outline" command="1" :disabled="fileList[index].doclist[index1].power<2">编辑文件</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-star-off" divided command="2">收藏</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-share" command="3">分享</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-top-right" command="4" divided>导出</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit" command="5" :disabled="fileList[index].doclist[index1].power<3">重命名</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-document" command="6">创建副本</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete" divided style="color: red" command="7">删除</el-dropdown-item>
                </van-col>
                <van-col span="2"></van-col>
              </van-row>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </van-col>

      <van-col span="1">
      </van-col>
    </van-row>
    <br/>
  </div>

    <!--重命名对话框-->
    <van-dialog v-model="showRenameDialog" title="标题" show-cancel-button @confirm="confirmRenameFile">
      <van-field v-model="newDocName" label="输入新文件名" />
    </van-dialog>

  </div>
</template>

<script>
  import {Dialog, Toast} from "vant";
  import baseUrl from "../baseUrl";
  import axios from 'axios'
    export default {
        name: "RecentlyDoc",
      data() {
          return{
            myemail:localStorage.getItem('myemail'),//登着的邮箱
            imgSrc:require('../../assets/loginback.jpg'),

            type: 1,
            icon1:'apps-o',
            icon2:'bars',
            size1:25,
            size2:15,

            // 图标部分
            nowindex: {index: -1, index1: -1},
            newDocName: '',
            showRenameDialog: false,


            fileList:[ // 最近浏览 一个月
              {date:'2020/8/12',doclist:[{docname:'hello',docid:'1',doc:'你好1',owner:'youabcd'},{docname:'hello',docid:'2',doc:'你好2',owner:'youabcd'},{docname:'hello',docid:'3',doc:'你好3',owner:'youabcd'}]},
              {date:'2020/8/11',doclist:[{docname:'hello',docid:'4',doc:'你好4',owner:'youabcd'},{docname:'hello',docid:'5',doc:'你好5',owner:'youabcd'},{docname:'hello',docid:'6',doc:'你好6',owner:'youabcd'}]},
              {date:'2020/8/10',doclist:[{docname:'hello',docid:'7',doc:'你好7',owner:'youabcd'},{docname:'hello',docid:'8',doc:'你好8',owner:'youabcd'},{docname:'hello',docid:'12',doc:'你好12',owner:'youabcd'}]},
              {date:'2020/8/9',doclist:[{docname:'hello',docid:'9',doc:'你好9',owner:'youabcd'},{docname:'hello',docid:'10',doc:'你好10',owner:'youabcd'},{docname:'hello',docid:'11',doc:'你好11',owner:'youabcd'}]},
            ],


          }
      },
      methods:{
        rank(i){
          if(this.type == i){
            return;
          }
          this.type = i;
          this.loadData();
        },


        // 图标下拉框部分

        clickFile(index,index1){
          this.nowindex.index = index;
          this.nowindex.index1 = index1;
        },

        chooseFile(command){
          let index = this.nowindex;
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
        // 预览文件
        showFile(index){
          // TODO 预览文件
        },
        // 打开文件
        openFile(index){
          // TODO 打开一个文件，文件id为 this.fileList[index.index].doalist[index.index1].docid
        },
        // 收藏文件
        setFavourite(index) {
          let _this = this;
          let data = new FormData();
          data.append('userId',this.myemail);
          data.append('docId',this.fileList[index.index].doclist[index.index1].docid);
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
        },
        // 导出文件
        exportFile(index){
          // TODO 下载文件 文件id为this.fileList[index].docid
        },
        // 文件重命名
        renameFile(index){
          this.showRenameDialog = true;
          this.newDocName = this.fileList[index.index].doclist[index.index1].docname;
        },
        confirmRenameFile(){
          // TODO 文件重命名
          let index = this.nowindex;
          let _this = this;
          let data = new FormData();
          data.append('userId',this.myemail);
          data.append('docId',this.fileList[index.index].doclist[index.index1].docid);
          data.append('newName',this.newDocName);
          axios.post(baseUrl+'/userRenameFile',data)
            .then(function (response) {
              Toast(response.data.message);
              if(response.data.success) {
                _this.fileList[index.index].doclist[index.index1].docname = _this.newDocName;
              }
            })
            .catch(function (err) {
            })
        },
        // 保存文件副本
        saveFileAs(index){
          // TODO 保存文件副本
        },
        // 删除文件
        deleteFile(index){
          let msg = '';
          if(this.fileList[index.index].doclist[index.index1].ownerid === this.myemail){
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
              data.append('docId',this.fileList[index.index].doclist[index.index1].docid);
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


        loadData(){
          let _this = this;
          let data = new FormData();
          data.append('userId',this.myemail);
          data.append('type',this.type); // 1 更改时间 2 创建时间
          axios.post(baseUrl+'/getUserRecentlyDoc',data)
            .then(function (response) {
              _this.fileList = [];
              for(let i=0; i<response.data.length; i++){
                let dlist = [];
                for(let j=0; j<response.data[i].docList.length;j++){
                  dlist.push(response.data[i].docList[j]);
                }
                _this.fileList.push({date:response.data[i].date, doclist: dlist});
              }
              console.log(_this.fileList)
            })
            .catch(function (err) {
            })
        }

      },
      mounted() {
          this.loadData();
      }

    }
</script>

<style scoped>

</style>
