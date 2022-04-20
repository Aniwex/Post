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
    <div ref="observer" class="observer"></div>



      <!-- <div class="page__wrapper">
        <div class="page" :class="{
          'current__page': this.page === pageNumber
        }"
        v-for="pageNumber in totalPage"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        >
          {{pageNumber}}
        </div>
      </div> -->
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
      page:1,
      limit:10,
      totalPage:0,
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
        params:{
          _page:this.page,
          _limit:this.limit,
        }})
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      } catch (error) {
        alert(error.message)
      }
    },
    async loadMorePosts(){
      try {
        this.page+=1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
        params:{
          _page:this.page,
          _limit:this.limit,
        }})
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts,...response.data];
      } catch (error) {
        alert(error.message)
      }
    },
    // changePage(pageNumber){
    //   this.page = pageNumber;
    //   this.fetchPost()
    // }
  },
  mounted(){
    this.fetchPost();
    this.$refs.observer;
    const options = {
    rootMargin: '0px',
    threshold: 1.0
    }
    const callback = (entries) => {
        if(entries[0].isIntersecting && this.page < this.totalPage){
          this.loadMorePosts()
        }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed:{
     sortedPosts(){
        return [...this.posts].sort((post1, post2 ) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
      sortedAndSearchPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
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
