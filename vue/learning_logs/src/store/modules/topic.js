import axios from 'axios'
import { UPDATE_TOPIC_SUCCESS, UPDATE_TOPIC_FAIL, NEW_TOPIC, SHOW_TOPIC, EDIT_TOPIC } from '../mutation-types'

const state = {
  topic: {},
  newTopic: false,
  editTopic: false,
  updateTopicSuccess: false
}

const getters = {
  topic: state => state.topic,
  newTopic: state => state.newTopic,
  editTopic: state => state.editTopic,
  updateTopicSuccess: state => state.updateTopicSuccess,
  hasEntry: state => state.topic && state.topic.entries && state.topic.entries.length > 0
}

const actions = {
  updateTopic ({commit}, topic) {
    return axios.post('/api/topic', topic)
            .then((response) => {
              if (response.data && response.data.success === 1) {
                const updatetopic = (response.data.topics && response.data.topics[0]) || topic
                commit(UPDATE_TOPIC_SUCCESS, updatetopic)
              } else {
                commit(UPDATE_TOPIC_FAIL)
              }
            })
            .catch((err) => {
              console.log(err)
              commit(UPDATE_TOPIC_FAIL)
            })
  },
  newtopic ({commit}) {
    commit(NEW_TOPIC)
  },
  showtopic ({commit}, topic) {
    commit(SHOW_TOPIC, topic)
  },
  edittopic ({commit}, topic) {
    commit(EDIT_TOPIC, topic)
  }
}

const mutations = {
  [UPDATE_TOPIC_SUCCESS] (state, topic) {
    state.updateTopicSuccess = true
    if (topic) {
      state.topic = topic
    }
  },
  [UPDATE_TOPIC_FAIL] (state) {
    state.updateTopicSuccess = false
  },
  [NEW_TOPIC] (state) {
    state.topic = {}
    state.newTopic = true
    state.editTopic = false
    state.updateTopicSuccess = false
  },
  [SHOW_TOPIC] (state, topic) {
    state.topic = topic
    state.newTopic = false
    state.editTopic = false
    state.updateTopicSuccess = false
  },
  [EDIT_TOPIC] (state, topic) {
    state.topic = topic
    state.newTopic = false
    state.editTopic = true
    state.updateTopicSuccess = false
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
