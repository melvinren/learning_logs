<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="nav">
      <div class="item"><router-link :to="{name:'Home'}">Home</router-link></div>
      <div class="item"><router-link :to="{name:'Topics'}">Topics</router-link></div>
      <div class="item"><router-link :to="{name:'About'}">About</router-link></div>
    </div>    
    <hr/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav{
  display: flex;
  width: 50%;
  margin: 10px auto;
  font-size: 22px;
  color:#41b883;
}
.nav .item{
  flex-grow: 1;
  padding: 10px;
}
a{
  text-decoration: none;
  color:#41b883
}
a.router-link-exact-active{
  font-weight: bold;
  color: #08f087;
}
</style>
