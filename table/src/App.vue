<script setup>
import Header from './components/Header.vue'
import Table from './components/Table.vue'

</script>

<template>
  <Header></Header>
  <Table></Table>
  
</template>

<style>
#app{
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
  max-width: 100%;
  height: fit-content;
  background-color: #141414;
}
html, body {
    background-color: #141414;
    height: fit-content;
    margin: 0;
    
    font-family: 'VT323', monospace;
}
</style>
