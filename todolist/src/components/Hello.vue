<template>

  <div class="todolist">
        <div class="sidebar">
            <!--<div class="addtodo">
                <a class="addbtn" v-on:click="showinput()">+</a>
            </div>
            <div class="statusbar">
                <ul>
                    <li class="all">
                        <span>全部</span>
                        <span>{{aall}}</span>
                    </li>
                    <li></li>
                    <li class="no">
                        <span>未完成</span>
                        <span>{{active}}</span>
                    </li>
                    <li></li>
                    <li class="yes">
                        <span>已完成</span>
                        <span>{{finish}}</span>
                    </li>
                </ul>
            </div>
          
            <div class="selectBtn" v-bind:class="{selectAll: isAll}" @click="isAll = !isAll">select</div>
            <div class="delAllBtn" @click="delAll()">delAll</div>
            <div class="classify">
                <ul>
                    <li @click="tabAll()" v-bind:class="{tabClick: clickThis == 'all'}">全部</li>
                    <li></li>
                    <li @click="tabActive()" v-bind:class="{tabClick: clickThis == 'active'}">未完成</li>
                    <li></li>
                    <li @click="tabFinish()" v-bind:class="{tabClick: clickThis == 'finish'}">已完成</li>
                </ul>
            </div>-->
        </div>
        <div class="main">
            <div class="main_input_toolbar">
                <input class="main_input" placeholder="请输入任务,按回车键可添加"  v-model="inputCon" v-on:keyup.enter="addTodoList()">
                <div class="main_toolbar">
                    <div class="mt_btn1">
                        <a @click="tabAll()" v-bind:class="{tabClick: clickThis == 'all'}"href="javascript:;">
                        全部
                        <span class="todo_num">{{aall}}</span>
                        </a>
                        <a @click="tabActive()" v-bind:class="{tabClick: clickThis == 'active'}" href="javascript:;">未完成<span class="todo_num">{{active}}</span></a>
                        <a @click="tabFinish()" v-bind:class="{tabClick: clickThis == 'finish'}" href="javascript:;">已完成<span class="todo_num">{{finish}}</span></a>
                    </div>
                    <div class="mt_btn2">
                        <a href="javascript:;" class="finishAll" v-bind:class="{selectAll: isAll}" @click="isAll = !isAll">完成全部</a>
                        <a href="javascript:;" class="delAll" @click="isShow=true">全部删除</a>
                    </div>
                </div>
            </div>
            <div class="todocon">
                <ul>
                    <li v-for="item in filteredTodo" v-bind:class="{edit_li: item == isEdit}">
                        <span class="checkbox" v-bind:class="{'select': item.isFinish}" v-on:click="select(item)"></span>
                        <span class="every_to_do" v-bind:class="{'finish': item.isFinish}" @dblclick="edit(item)">{{item.con}}</span>
                        <a class="del" @click="delData(item)">删除</a>
                        <input class="edit" type="text" v-model="item.con" v-focus="item == isEdit" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)">
                    </li>
                </ul>
            </div>
        </div>
        <!--<div class="addcon" v-bind:class="{'conShow': isShow}">
            <div class="inputcon">
                <input type="text" placeholder="请输入任务" v-model="inputCon" v-on:keyup.enter="addTodoList()">
                <button class="affirm" @click="addTodoList()">添 加</button>
                <div class="conclose" v-on:click="isShow=false">X</div>
            </div>
        </div>-->
        <div class="warning" v-bind:class="{'warningShow': isShow}">
            <div class="w_alert">
                <p>确认删除所有任务吗？请确保备份或者已全部完成，删除后不可恢复！</p>
                <a class="wa_del" href="javascript:;" @click="delAll()">删除</a>
                <a class="wa_cancel" href="javascript:;" @click="isShow=false">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
import aboutData from '../../static/js/data'
import Vue from 'vue'

var filters = {
    aall(todo){
        return todo
    },
    active(todo){
        return todo.filter((todo)=>{
            return !todo.isFinish
        })
    },
    finish(todo){
        return todo.filter((todo)=>{
            return todo.isFinish
        })
    }
}


export default {
  name: 'todolist',
  data () {
    return {
      todo:aboutData.getData(),
        isShow:false,
        isFinish:false,
        isSelect:false,
        isEdit:null,
        dataCache: null,
        inputCon:'',
        all:0,
        no:0,
        yes:0,
        hashName:'all',
        clickThis:'all'
    }
  },
  computed: {
    aall: function(){
        var len = filters.aall(this.todo).length;
        if(len >= 999){
            return '999+'
        }else{
            return len;
        }
    },  
    active: function(){
        var len = filters.active(this.todo).length;
        if(len >= 999){
            return '999+'
        }else{
            return len;
        }
    },
    finish: function(){
        var len = filters.finish(this.todo).length;
        if(len >= 999){
            return '999+'
        }else{
            return len;
        }
    },
    isAll: {
        get(){
            return this.active === 0 && this.todo != ''
        },
        set(value){
            this.todo.forEach((todo)=>{
                todo.isFinish = value
            })
        }
    },
    filteredTodo(){

            if(this.clickThis == 'all'){
                return filters.aall(this.todo)
            }else if(this.clickThis == 'active'){
                return filters.active(this.todo)
            }else if(this.clickThis == 'finish'){
                return filters.finish(this.todo)
            }
            
    }
  },
  methods:{
        showinput: function(){
            this.isShow = true;
            this.inputCon = '';
        },
        addTodoList: function(){
            var date = new Date();
            var time = date.getTime();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();

            if(this.inputCon == ''){
                alert("请输入任务");
            }else{
                var items = {
                    con:this.inputCon,
                    isFinish:false,
                    createTime:year+"年"+month+"月"+day+"日 "+hour+":"+min,
                }
                this.inputCon = '';
                this.todo.push(items);
                aboutData.store(this.todo);
                this.isShow = false;
            }
            
        },
        select: function(item){
            item.isFinish = ! item.isFinish;
            aboutData.store(this.todo);
        },
        delAll: function(){
            this.todo = [];
            aboutData.store(this.todo);
            this.isShow = false;
        },
        delData: function(item){
            var index = this.todo.indexOf(item);
            this.todo.splice(index, 1);
            aboutData.store(this.todo);
        },
        edit: function(item){
            this.isEdit = item;
            this.dataCache = item.con;
        },
        doneEdit: function(item){
            this.isEdit = null;
            if(item.con == ''){
                this.delData(item);
            }else{
                aboutData.store(this.todo);
            } 
        },
        cancelEdit: function(item){
            this.isEdit = null;
            item.con = this.dataCache;
        },
        tabAll: function(){
            this.clickThis = 'all';
        },
        tabActive: function(){
            this.clickThis = 'active'
        },
        tabFinish: function(){
            this.clickThis = 'finish'
        }
    },
    mounted: function(){

    },
    directives: {
        focus(el, value){
            if(value){
                el.focus();
            }   
        }
    }
}


// function hashChange(){
//     var hashName = location.hash.replace(/#\/?/,'');
//     console.log(filters[hashName]);
//     if(filters[hashName]){
//         Vue.hashName = hashName;
        
//     }else{
//         location.hash = '';
//         Vue.hashName = 'all';
//     }

// }

// window.addEventListener('hashchange', hashChange);


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

