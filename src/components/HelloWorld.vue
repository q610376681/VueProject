<template>
  <div class="add-or-minus">
    <button @click="minus">-1</button>
    <input disabled :value="number">
    <button @click="add">+1</button>
    <div v-if="meetTen">已经到10了</div>
    <div>{{number|formatText}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      number: 0
    }
  },
  filters: {
    formatText (value) {
      return ['零', '一', '二']
    }
  },
  computed: {
    meetTen () {
      return this.number === 10
    }
  },
  methods: {
    minus () {
      this.number -= 1
    },
    add () {
      this.number += 1
    }
  }
}
</script>
