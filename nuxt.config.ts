// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  runtimeConfig: {
    secret: '',
    public: {
    },
    private: {
    }
  },

  devtools: { enabled: true },

  nitro: {
    plugins: ["~/server/index.ts"],
  },

  // mongoose: {
  //   uri: process.env.NUXT_PRIVATE_MONGODB_ADDRESS,
  //   options: {},
  //   modelsDir: 'models',
  // },
  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
})
