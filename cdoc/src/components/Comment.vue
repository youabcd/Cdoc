<template>
    <div>

<!--评论区-->
        <div style="height:100px;widthd:100%;">

            <van-cell autosize 
            :title="CommentList[currentPage*3-3].username"
            title-style="text-align:left; margin-left:10px;min-width: 65%;"
            :icon="CommentList[currentPage*3-3].userhead" 
            style="white-space: pre-wrap;">
                <template #icon>
                    <van-image
                         width="40"
                         round
                          height="40"
                          v-bind:src="CommentList[currentPage*3-3].userhead">
                    </van-image>
                </template>
                    <van-icon name="delete" v-if="onemail==CommentList[currentPage*3-3].useremail||onemail==author" @click="deletecomment(currentPage*3-3)"/>
                <template #label>
                    <div>{{CommentList[currentPage*3-3].comments}}</div>
                </template>
            </van-cell>

            <van-cell autosize 
            :title="CommentList[currentPage*3-2].username" 
            title-style="text-align: left; margin-left:10px;min-width: 65%;" 
            :icon="CommentList[currentPage*3-2].userhead" 
            style="white-space: pre-wrap;" 
            v-if="currentPage*3-2<CommentList.length">
                <template #icon>
                    <van-image
                         width="40"
                         round
                          height="40"
                          v-bind:src="CommentList[currentPage*3-2].userhead">
                    </van-image>
                </template>
                    <van-icon name="delete" v-if="onemail==CommentList[currentPage*3-2].useremail||onemail==author" @click="deletecomment(currentPage*3-2)"/>
                <template #label>
                    <div v-bind:style="{width:'100%'}">{{CommentList[currentPage*3-2].comments}}
                    </div>
                </template>
            </van-cell>

            <van-cell autosize 
            :title="CommentList[currentPage*3-1].username" 
            title-style="text-align: left; margin-left:10px;min-width: 65%;" 
            :icon="CommentList[currentPage*3-1].userhead"
            style="white-space: pre-wrap;" 
            v-if="currentPage*3-1<CommentList.length">
                <template #icon>
                    <van-image
                         width="40"
                         round
                          height="40"
                          v-bind:src="CommentList[currentPage*3-1].userhead">
                    </van-image>
                </template>
                    <van-icon name="delete" v-if="onemail==CommentList[currentPage*3-1].useremail||onemail==author" @click="deletecomment(currentPage*3-1)"/>
                <template #label>
                    <div>{{CommentList[currentPage*3-1].comments}}
                    </div>
                </template>
            </van-cell>

            <van-sticky :offset-top="500">
              <van-row>
              <van-col span="20">
              </van-col>
              <van-col span="4">
                <van-pagination
                v-model="currentPage"
                :total-items=CommentList.length
                :show-page-size="5"
                :items-per-page="3"
                force-ellipses>
                </van-pagination>
              </van-col>
              </van-row>
            </van-sticky>
        </div>


<!--发表评论-->
        <div style="margin-top:380px">
            <el-input
            type="textarea"
            placeholder="请输入你的评论"
            :autosize="{ minRows: 4, maxRows: 7}"
            v-model="message"
            maxlength="100"
            show-word-limit>
            </el-input>

            <el-button type="warning" @click="clear">清空输入</el-button>
            <el-button type="info" @click="submit">发表评论</el-button>
            
        </div>
    </div>
</template>

<script>
    import {Toast} from "vant";

    export default{
        name:'Comment',
        data(){
            return{
                currentPage: 1,
                message:'',

                onemail:'567',//localStorage.getItem("myemail"),
                author:'567',

                CommentList:[
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'1322496098@qq.com',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四一二三四五一二三四',useremail:'23',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',useremail:'123',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',useremail:'321',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一',useremail:'',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',useremail:'',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'s一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五',useremail:'',commentid:''},
                    {userhead:'https://img.yzcdn.cn/vant/cat.jpeg',username:'17815566221',comments:'一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五一二三四五d',useremail:'',commentid:''},
                ],
            }
        },
        methods:{
            clear(){
                this.message='';
            },
            submit(){//提交评论,内容为message,用户邮箱onemail
            },
            deletecomment(index){//删除评论
                Toast(index);
            },
        }
    }
</script>

<style>
</style>