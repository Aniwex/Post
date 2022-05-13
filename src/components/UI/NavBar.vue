<template>
  <div class="navbar">
      <h2 @click="$router.push('/')">Сайт постов</h2>
      <div class="navbar__btns">
          <my-button 
          @click="$router.push('/posts')" 
          style="margin-right:10px">Посты</my-button>
          <my-button 
          @click="$router.push('/about')" 
          style="margin-right:10px">О сайте</my-button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar{
    height: 50px;
    background-color: aqua;
    display: flex;
    align-items: center;
}
.navbar__btns{
    margin-left: auto;
    display: flex;
}
</style>