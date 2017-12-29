<template>
  <div class="topics">
      <div class="newtopic">
        <input type="text" v-model="newtopic" /><input v-on:click="addTopic" type="button" value="add" />
      </div>
      <p class="title">All topics</p>
      <ul v-if="count>0">
          <li v-for="item in items" :key="item._id">
              <router-link :to="{ name: 'Topic', params: { id: item._id , item:item }}">{{item.text}}</router-link>
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
import axios from 'axios'
export default {
  name: 'Topics',
  data () {
    return { items: [], count: 0, pages: 0, newtopic: '' }
  },
  created: function () {
    this.loadTopics()
  },
  methods: {
    loadTopics: function () {
      const pageIndex = this.$route.params.pageIndex || 1
      axios.post('/api/topics/get/' + pageIndex)
            .then((response) => {
              if (response.data && response.data.count) {
                this.items = response.data.topics
                this.count = response.data.count
                this.pages = Math.ceil(this.count / 10)
              }
            })
            .catch((err) => {
              console.log(err)
              this.data = { items: [] }
            })
    },
    addTopic: function (e) {
      if (this.newtopic) {
        const topic = { text: this.newtopic }
        axios.post('/api/topic', topic)
          .then((response) => {
            if (response.data && response.data.success === 1) {
              this.loadTopics()
              this.newtopic = ''
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
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

