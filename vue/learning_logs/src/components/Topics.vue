<template>
  <div class="topcis">
      <p class="title">All topics</p>
      <ul v-if="hasData">
          <li v-for="item in items" :key="item.id">
              {{item.text}}
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
    return { items: [] }
  },
  created: function () {
    this.loadTopics()
  },
  methods: {
    loadTopics: function () {
      axios.post('/api/topics/get')
            .then((response) => {
              if (response.data && response.data.length) {
                this.items = response.data
              }
            })
            .catch((err) => {
              console.log(err)
              this.data = { items: [] }
            })
    }
  },
  computed: {
    hasData: function () {
      return this.items && this.items.length
    }
  }
}
</script>
<style>
.topcis {
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
</style>

