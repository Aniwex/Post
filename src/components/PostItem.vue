<template>
   <div class="post__list">
       <div v-if="selected.title === post.title">
            <my-input v-model="editTitle" style="margin-top:15px"></my-input>
            <my-button @click="args" style="margin-top:5px">Сохранить</my-button>
       </div>
       <div v-else>
            <p style="word-break: break-all;"><span style="font-weight:bold">Title:</span>  {{post.title}}</p>
       </div>
        <p><span style="font-weight:bold">Body:</span> {{post.body}}</p>
        <my-button @click="select(post)" style="margin-top:5px">Изменить</my-button>
        <my-button @click="$emit('remove',post)" style="margin-top:5px">Удалить</my-button>
        
  </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
        index:Number,
    },
    data(){
        return{
            editTitle:'',
            selected:{},
        }
    },
    methods:{
    select(post){
      this.selected = post;
      this.editTitle = post.title;
    },
    async args() {
        this.$emit('save',{post: this.post,editTitle: this.editTitle,index:this.index});
    }
    },
    
}
</script>

<style>
.post__list{
    width: 400px;
    height: 300px;
    border:1px solid aqua;
    font-size: 20px;
    margin:0 auto;
    background-color: #fff;
    margin-bottom: 10px;
  }
</style>