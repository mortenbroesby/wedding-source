import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import config from "./config";

import { router } from "./router";
import { $store, RootState } from "./store";

import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";



import {
  i18n,
  localisationService,
  defaultLocale,
} from "./services/localisation.service";

import { getUserLocale } from "get-user-locale";

// Setup logger
const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

// Configure Vue
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

// Import components
import App from "./App.vue";

import Spinner from "./components/spinner";
import Home from "./layouts/home";

// Import styles
import "./App.scss";

// Initialise firestore
firebase.initializeApp(config.firebase);

export const db =
  firebase.firestore();

// Call localisation service init before Vue is loaded
localisationService.initBeforeApplicationLoad();

// Initialise Vue plugins
Vue.use(firestorePlugin);

/*************************************************/
/* APPLICATION SETUP  */
/*************************************************/
function initialiseApplication() {
  @Component({
    mixins: [App],
    store: $store,
    router: router,
    components: {
      Spinner,
      Home,
    }
  })
  class Application extends Vue {
    /*************************************************/
    /* LIFE CYCLE */
    /*************************************************/
    mounted() {
      this.initialiseApplication();
    }

    /*************************************************/
    /* COMPUTED'S */
    /*************************************************/
    get store(): RootState {
      return $store.state;
    }

    get spinnerVisible(): boolean {
      return this.store.spinnerVisible;
    }

    get applicationHasLoaded(): boolean {
      return this.store.applicationHasLoaded;
    }

    /*************************************************/
    /* METHODS */
    /*************************************************/
    initialiseApplication() {
      this.setUserLocale();

      // Simulate load to API.
      $store.dispatch("setSpinner", true);
      $store.dispatch("initialise").then(() => {
        Logger.info("Application initialised.");
        setTimeout(() => {
          $store.dispatch("setSpinner", false);
        }, 1000);
      });
    }

    async setUserLocale() {
      let locale = defaultLocale();

      try {
        locale = await getUserLocale();
      } catch (error) {
        Logger.error("Error getting user locale");
      } finally {
        localisationService.initAfterApplicationLoad(locale);
      }
    }

    /**
     * Rooted translate function.
     * @param key - The key in the locale file
     * @param payload - pass through data which should be compiled at runtime
     */
    public translate(key: any, payload?: any) {
      return i18n.t(key, payload);
    }
  }

  new Application({ i18n }).$mount("#app");
}

/*************************************************/
/* APPLICATION INITIALIZATION  */
/*************************************************/
initialiseApplication();
