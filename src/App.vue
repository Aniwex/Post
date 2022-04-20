<template>
  <div class="container">
    <h3 class="post__text">Страница с постами</h3>
      <my-input v-model="searchQuery"
      placeholder="Поиск..."
      ></my-input>
    <div>
        <my-button @click="showDialog">Создать пост</my-button>
        <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog :show="dialogVisible">
      <post-form  @add="AddPost">
      </post-form>
    </my-dialog>
    <div v-if="posts.length > 0">
        <h3 class="post__text">Список постов</h3>
          <post-list
          :posts="sortedAndSearchPosts" @remove="deletePost">
          </post-list>
    </div>
      <div v-else>
        <h3 class="post__text">Список постов пуст</h3> 
      </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
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
      sortOptions:[{value:'title',name:'По названию'},{value:'body',name:'По содержимому'}
      ],
    }
  },
  methods:{
      AddPost(post){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    deletePost(post){
      this.posts = this.posts.filter(arr => arr.id !== post.id)
    },
    showDialog(){
      this.dialogVisible = true;
    },
    async fetchPost(){
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data;
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted(){
    this.fetchPost();
  },
  computed:{
     sortedPosts(){
        return [...this.posts].sort((post1, post2 ) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
      sortedAndSearchPosts(){
      return this.sortedPosts.filter(post => post.title.toLowUpperCase().includes(this.searchQuery.toLowUpperCase()))
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
</style>
