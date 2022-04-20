<template>
  <div class="post__item">
      <h3 class="post__text">Введите пост</h3>
      <my-input type="text" v-model="post.title"></my-input>
      <my-input type="text" v-model="post.body"></my-input>
      <my-button @click="AddPost" style="margin-top:20px">Добавить пост</my-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            post:{title:'',body:'',id:'',}
        }

  },
  methods:{
      AddPost(){
        this.post.id = Date.now()
        this.$emit('add',this.post);
        this.post = {
            title:'',
            body:'',
            id:''
        }
      }
  }
}
</script>

<style>

</style>