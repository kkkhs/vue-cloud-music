<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'

const tabs = [
  {
    value: 'find',
    icon:'mdi-headphones',
    text: '发现'
  },
  {
    value: 'podcast',
    icon:'mdi-podcast',
    text: '播客'
  },
  {
    value: 'my',
    icon:'mdi-music',
    text: '我的'
  },
  {
    value: 'follow',
    icon:'mdi-account-star',
    text: '关注'
  },
  {
    value: 'community',
    icon:'mdi-forum-outline',
    text: '社区'
  },
]
const route = useRoute()
const router = useRouter()
const active = ref(route.name)
console.log(active.value)
watch(active, (nv) =>{
  console.log(nv)
  router.push({name: nv})
})
</script>

<template>
    <router-view/>
    <v-bottom-navigation 
      style="z-index: 10;"
      mode="shift"
      grow
      v-model="active" 
      active 
    >
      <v-btn 
        :ripple="false"
        variant="plain"
        color="red-darken-1" 
        v-for="v in tabs"
        :key="v.value"
        :value="v.value" 
        @click="active = v.value"
      >
        <v-icon 
          aria-hidden="false"
          size="30"
          rounded="xl"
        >{{ v.icon }}</v-icon>
        <span>{{ v.text }}</span>
      </v-btn>
    </v-bottom-navigation>
</template>