import axios from 'axios'
import { RECEIEVE_TOPICS, DELETE_TOPIC_SUCCESS, DELETE_TOPIC_FAIL } from '../mutation-types'

const state = {
  topics: [],
  count: 0,
  pages: 0
}

const getters = {
  topics: state => state.topics,
  count: state => state.count,
  pages: state => state.pages
}

const actions = {
  fetchTopics ({commit}, filter = { pageIndex: 1 }) {
    const { pageIndex } = filter
    axios.post('/api/topics/get/' + pageIndex)
            .then((response) => {
              if (response.data && response.data.count) {
                commit(RECEIEVE_TOPICS, response.data)
              }
            })
            .catch((err) => {
              console.log(err)
            })
  },
  deleteTopic ({commit}, topicId) {
    return axios.post('/api/topic/delete', {_id: topicId})
            .then((response) => {
              if (response.data && response.data.success === 1) {
                commit(DELETE_TOPIC_SUCCESS, topicId)
              } else {
                commit(DELETE_TOPIC_FAIL)
              }
            })
            .catch((err) => {
              console.log(err)
              commit(DELETE_TOPIC_FAIL)
            })
  }
}

const mutations = {
  [RECEIEVE_TOPICS] (state, data) {
    state.topics = data.topics
    state.count = data.count
    state.pages = Math.ceil(data.count / 10)
  },
  [DELETE_TOPIC_SUCCESS] (state, id) {
    const topics = state.topics.slice(0)
    const topicIndex = topics.findIndex(t => t._id === id)
    topics.splice(topicIndex, 1)
    state.topics = topics
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
