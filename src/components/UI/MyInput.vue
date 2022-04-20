<template>
  <input :value="modelValue" @input="updateInput" class="post__input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props:{
        modelValue: [String,Number]
    },
    methods: {
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style>
  .post__input{
    border:3px solid #7FFF00;
    display: flex;
    width:300px;
    height:26px;
    margin: 0 auto;
    margin-bottom: 10px;
    
  }
</style>