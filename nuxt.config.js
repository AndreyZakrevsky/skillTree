const pkg = require('./package')


module.exports = {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    "~assets/css/fonts.scss",
    "~assets/css/main.scss",
    "~assets/css/single-skill.scss",
    "~assets/css/badges.scss",
    "~assets/css/map.scss",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vee-validate.js',
    '~plugins/global-components',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
