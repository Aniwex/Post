<template>
  <div>
    <transition-group name="post_list">
      <post-item
      v-for="(post,index) in posts"
      :key="post._id"
      :post="post"
      :index="index"
      @remove="$emit('remove',post,index)"
      @save ="saveArg"
      >
      </post-item>
    </transition-group>
    
  </div>
  
</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
  props:{
        posts:{
            type: Array,
            require:true
        },
        },
        methods: {
          saveArg(arg) {
            this.$emit('save',arg)
          }
        }
}
</script>

<style>
.post_list{
    display: inline-block;
    margin-right: 10px;
  }
.post_list-enter-active,
.post_list-leave-active{
    transition: all 0.4s ease;
  }
.post_list-enter-from,
.post_list-leave-to{
    opacity: 0;
    transform: translateX(30px);
  }
.post_list-move{
    transition: transform 0.4s ease;
  }
</style>