<template>
  <form class="row" @submit.prevent>
    <input v-model="barName" :placeholder="newBarPlaceholder" class="flex">
    <button type="submit" :disabled="!barName" @click="addBar">
      <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 512 512">
        <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
            v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z" />
      </svg>
    </button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { createNewBar } from '@/bookmarkState'

export default {
  name: 'CreateBar',
  setup (props, { emit }) {
    const barName = ref('')

    function addBar () {
      return createNewBar(this.barName).then((newBar) => {
        barName.value = ''
        emit('create', newBar)
      })
    }

    return {
      barName,
      addBar,
      newBarPlaceholder: browser.i18n.getMessage('newBarPlaceholder')
    }
  }
}
</script>

<style scoped>
.row {
  background: yellow;
}
</style>
