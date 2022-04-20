<template>
   <div class="post__list">
        <p><span style="font-weight:bold">Title:</span>  {{post.title}}</p>
        <p><span style="font-weight:bold">Body:</span> {{post.body}}</p>
        <my-button @click="$emit('remove',post)" style="margin-top:20px">Удалить</my-button>
  </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style>
.post__list{
    width: 500px;
    height: 225px;
    border:1px solid aqua;
    font-size: 20px;
    margin:0 auto;
    background-color: #fff;
    margin-bottom: 10px;
  }
</style>