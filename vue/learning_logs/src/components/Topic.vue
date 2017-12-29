<template>
  <div class="topic">
      <p><strong>Topic: </strong>{{ text }}</p>
      <ul v-if="hasEntry">
          <li v-for="entry in entries" :key="entry._id">
			  <p>{{ entry.date}}</p>
			  <p>{{ entry.text }}</p>
		  </li>
      </ul>
      <ul v-else>No entry. You can add a entry.</ul>	  
	  <div>
		  <textarea v-model="newentry" class="entry_text"></textarea><br/><input type="button" v-on:click="addEntry" class="addbtn" value="Add" />
	  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Topic',
  data () {
    return { id: '', text: '', entries: [], newentry: '' }
  },
  created () {
    this.id = this.$route.params.id
    const item = this.$route.params.item
    if (item) {
      this.text = item.text
      this.entries = item.entries || []
    }
  },
  computed: {
    hasEntry: function () {
      return this.entries && this.entries.length > 0
    }
  },
  methods: {
    addEntry: function (e) {
      if (this.newentry) {
        const topic = { _id: this.id, text: this.text, entries: this.entries.slice() }
        const now = new Date()
        const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getMinutes()
        const entry = {
          text: this.newentry,
          date: date
        }
        topic.entries.push(entry)
        axios.post('/api/topic', topic)
           .then((response) => {
             if (response.data && response.data.success === 1) {
               this.entries.push(entry)
               this.newentry = ''
             } else {
               console.error(response.data)
             }
           })
           .catch((err) => {
             console.error(err)
           })
      }
    }
  }
}
</script>
<style>
.topic {
    text-align: left;
}
.entry_text{
	width: 70%;
	height: 100px;
	margin: 10px;
}
.addbtn{
	margin-left: 10px;
	font-size: 16px;
	padding: 5px;
	width: 60px;
}
</style>
