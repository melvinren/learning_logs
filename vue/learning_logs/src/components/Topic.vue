<template>
  <div class="topic">
      <div v-if="newTopic">
        <input v-model="topic.text" /><input type="button" value="Add" v-on:click="updateTopic" />
      </div>
      <div v-else-if="editTopic">
        <input v-model="topic.text" /><input type="button" value="Save" v-on:click="updateTopic" />
      </div>
      <div v-else-if="topic">      
        <p><strong>Topic: </strong>{{ topic.text }}</p>
        <div v-if="hasEntry">
          <transition-group name="list" tag="ul">
            <li v-for="entry in topic.entries" :key="entry.text">
              <p>{{ entry.date}}</p>
              <p>{{ entry.text }}</p>          
            </li>
          </transition-group>
        </div>
        <div v-else>No entry. You can add a entry.</div>	  
        <div>
          <textarea v-model="newentry" class="entry_text"></textarea><br/><input type="button" v-on:click="addEntry" class="addbtn" value="Add" />
        </div>
        </div>
      <div v-else>
        Do not has this topic.
      </div>      
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'Topic',
  data () {
    return { newentry: '' }
  },
  props: ['add', 'edit'],
  computed: mapGetters(['topic', 'hasEntry', 'newTopic', 'editTopic', 'updateTopicSuccess']),
  created () {
    if (this.add === true) {
      this.$store.dispatch('newtopic')
    } else if (this.edit === true) {
      const item = this.$route.params.item
      this.$store.dispatch('edittopic', item)
    } else {
      const item = this.$route.params.item
      this.$store.dispatch('showtopic', item)
    }
  },
  methods: {
    addEntry: function (e) {
      if (this.newentry) {
        const topic = cloneDeep(this.topic)
        const now = new Date()
        const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getMinutes()
        const entry = {
          text: this.newentry,
          date: date
        }
        topic.entries = topic.entries || []
        topic.entries.push(entry)
        this.$store.dispatch('updateTopic', topic).then(() => {
          if (this.updateTopicSuccess) {
            this.newentry = ''
          }
        })
      }
    },
    updateTopic: function () {
      if (this.topic.text) {
        this.$store.dispatch('updateTopic', this.topic).then(() => {
          if (this.updateTopicSuccess) {
            this.$router.back()
          }
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
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
