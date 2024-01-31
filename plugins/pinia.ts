import {useStore} from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      // @ts-ignore
      store: useStore($pinia)
    }
  }
})
