import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import * as Sentry from '@sentry/browser';
import * as Integrations from "@sentry/integrations";
import  config from "./config";

Vue.config.productionTip = false

const production = process.env.NODE_ENV === 'production';

if (production) {
  Sentry.init({
    dsn: 'https://237b425bb92749e98198df60f1835d31@sentry.io/1973056',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],

    // NOTE: the config below (`logErrors`) controls whether the error will be logged
    // to the console or not. Considering we are in production, logging
    // errors to the console is not appropriate (since we are using Sentry).
    // So I've turned this setting off. If necessary please re-enable it.
    // More info at: https://docs.sentry.io/platforms/javascript/vue/
    logErrors: false,
    release: 'frontend@' + (config.version || 'unknown'),
  });
}

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
