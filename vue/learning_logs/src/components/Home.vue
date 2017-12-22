<<template>  
<div>
  <h3>{{ title }}</h3>
  <h4>{{ subtitle }}</h4>
</div>
</template>
<<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'Learning Log',
      subtitle: "Learning log helps you keep track of your learning, for any topic you're learning about"
    }
  }
}
</script>
