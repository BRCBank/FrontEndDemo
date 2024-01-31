<script setup lang="ts">
const props = defineProps({
  infoTitle: {
    type: String,
    required: true,
  },
  infoContents: {
    type: String,
    required: true,
  },
  linkAddress: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div
      class="self-stretch flex items-stretch justify-between gap-5 mt-5 max-md:max-w-full max-md:flex-wrap flex-none"
  >
    <div
        class="text-center text-xl leading-6 w-6/12 whitespace-nowrap justify-center items-center rounded shadow-sm grow px-5 py-2 border-[0.5px] border-solid border-black"
    >
      {{props.infoTitle}}
    </div>
    <div v-if="props.linkAddress == ''"
         class="text-xl leading-6 w-6/12 self-center grow whitespace-nowrap my-auto"
    >
      {{props.infoContents}}
    </div>
    <a v-else class="underline text-xl leading-6 w-6/12 self-center grow whitespace-nowrap my-auto"
       :href="props.linkAddress" :target="props.target"
    >
      {{props.infoContents}}↗
    </a>
  </div>
</template>

<style scoped>

</style>
