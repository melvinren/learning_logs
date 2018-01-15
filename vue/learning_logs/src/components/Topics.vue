<template>
  <div class="topics">
      <div class="newtopic">
        <router-link :to="{ name: 'NewTopic' }">Add Topic</router-link>
      </div>
      <p class="title">All topics</p>
      <ul v-if="count>0">
          <li v-for="item in topics" :key="item._id">
              <router-link :to="{ name: 'Topic', params: { id: item._id , item:item }}">{{item.text}}</router-link>
              <router-link :to="{ name: 'EditTopic', params: { item:item }}">EDIT</router-link>
              <button v-on:click="deleteTopic(item._id)">DELETE</button>
          </li>
          <li>
            <span v-for="i in pages" :key="i"><router-link :to="{ name: 'Topics', params: { pageIndex: i }}">{{ i }}</router-link></span>
          </li>          
      </ul>
      <ul v-else>
          <li>No topic. You can add a new topic.</li>
      </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Topics',
  computed: mapGetters([
    'topics',
    'count',
    'pages'
  ]),
  created: function () {
    this.loadTopics()
  },
  methods: {
    loadTopics: function () {
      const pageIndex = this.$route.params.pageIndex || 1
      this.$store.dispatch('fetchTopics', {pageIndex})
    },
    ...mapActions(['deleteTopic'])
  },
  watch: {
    '$route' (to, from) {
      if (to.name === from.name && to.name && to.params.pageIndex !== from.params.pageIndex) {
        this.loadTopics()
      }
    }
  }
}
</script>
<style>
.topics {
    text-align: left;
}
.title {
    width: 90%;
    margin: auto;
    font-size: 18px;
    font-weight: bold;
}
ul {
    list-style: none;
    width: 80%;
    margin: auto;
    padding: 0;
}
ul>li{
    text-align: left;
    margin: 10px auto;
}
ul>li>a{
  color:black;
}
ul>li>span{
  padding: 5px;
  margin: 3px;
  box-shadow: 2px 2px #c3c3c3
}
.newtopic{
  margin-left: 5%;
  width: 300px;
  padding: 10px 0;
}
</style>

