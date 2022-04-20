<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
    name: 'my-button',
}
</script>

<style>
  .btn{
    display: block;
    margin:0 auto;
    font-size: 18px;
    border: 1px solid aqua;
    background-color: #fff;
    border-radius:15px;
  }
</style>