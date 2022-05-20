<template>
  <div class="container">
    
    <h3 class="post__text">Страница с постами</h3>
      <my-input v-model="searchQuery"
      placeholder="Поиск..."
      >
    </my-input>
    <div>
        <my-button @click="showDialog">Создать пост</my-button>
        <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form  @add="AddPost">
      </post-form>
    </my-dialog>
    <div v-if="posts.length > 0">
        <h3 class="post__text">Список постов</h3>
          <post-list
          :posts="sortedAndSearchPosts" 
          @remove="deletePost" 
          @save="savePost">
          </post-list>
    </div>
      <div v-else>
        <h3 class="post__text">Список постов пуст</h3> 
      </div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '../PostForm.vue'
import PostList from '../PostList.vue'
import axios from 'axios'
export default {
  components: {
    PostList,
    PostForm,
  },
  data(){
    return{
      posts:[],
      dialogVisible:false,
      isPostLoading:false,
      selectedSort:'',
      searchQuery:'',
      sortOptions:[{value:'title',name:'По названию'},{value:'body',name:'По содержимому'}],
    }
  },
  methods:{
      AddPost(post){
      this.posts.push(post);

      this.dialogVisible = false;
    },
    async deletePost(post, index){
      await axios.delete('http://localhost:3000/api/' + post._id);
      this.posts.splice(index,1)
    },
  async savePost(arg){
    const response = await axios.put('http://localhost:3000/api/' + arg.post._id,{
      title:arg.editTitle,
      body:arg.post.body
    })
    this.posts[arg.index] = response.data.post
    
    },
    showDialog(){
      this.dialogVisible = true;
    },
    async fetchPost(){
      try {
        const response = await axios.get('http://localhost:3000/api');
        this.posts = response.data
      } catch (error) {
        alert(error.message)
      }
    },
    
  },
  mounted(){
    this.fetchPost();
  },
  computed:{
      sortedPosts(){
        return [...this.posts].sort((post1, post2 ) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
         },
      sortedAndSearchPosts(){
       return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
    }
    },
    
}
</script>

<style>
body
{
  background-color: #98FB98;
}
.post__text{
   color: black;
   text-align: center;
   padding: 10px 0 15px 0;
   font-size: 20px;
  }
.container {
    width:100%;
    height:100%;
    width:800px;
    background-color:#32CD32;
    margin:0 auto;
  }
  .page__wrapper{
    display: flex;
  }
  .page{
    border: 1px solid black;
    padding:10px;
  }
  .current__page{
    border:2px solid red;
  }
  .observer{
      color: #fff;
  }
</style>
