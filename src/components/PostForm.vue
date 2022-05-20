<template>
  <div class="post__item">
      <h3 class="post__text">Введите пост</h3>
      <my-input type="text" v-model="post.title"></my-input>
      <my-input type="text" v-model="post.body"></my-input>
      <my-button @click="AddPost" style="margin-top:20px">Добавить пост</my-button>
  </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            post:{title:'',body:''}
        }

  },
  methods:{
      async AddPost(){
        const res = await axios.post('http://localhost:3000/api',{
        title:this.post.title,
        body:this.post.body
        })
        .catch(err => console.log(err))
        const post = res.data;
        this.$emit('add',post);
        this.post = {
            title:'',
            body:'',
        }

      }
  }
}
</script>

<style>

</style>