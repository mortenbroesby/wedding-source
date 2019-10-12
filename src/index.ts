import Logger from "js-logger";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import config from "./config";

import { parseEncrypted, supportsCSSVariables } from "./utilities";
import { router } from "./router";
import { $store, RootState } from "./store";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/performance";

import Toasted from "vue-toasted";
import VueMeta from "vue-meta";

import {
  i18n,
  localisationService,
  defaultLocale,
  activeLanguage,
} from "./services/localisation.service";

import { getUserLocale } from "get-user-locale";

// Setup logger
const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

// Initialise firebase configuration
const decryptedConfig = parseEncrypted(config.firebase);
export const initialisedFirebase
  = firebase.initializeApp(decryptedConfig);

// Initialise firestore
export const db = firebase.firestore();

// Initialize performance monitoring
export const perf = firebase.performance();

// Configure Vue
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

Vue.use(Toasted, {
  theme: "bubble",
  duration: 5000,
});

// Call localisation service init before Vue is loaded
localisationService.initBeforeApplicationLoad();

import { setupServiceWorker } from "./service-worker-init";

// Import components
import App from "./App.vue";

import Spinner from "./components/spinner";
import Home from "./layouts/home";

// Import styles
import "./App.scss";

/*************************************************/
/* APPLICATION SETUP  */
/*************************************************/
function initialiseApplication() {
  @Component({
    mixins: [App],
    store: $store,
    router: router,
    metaInfo: {},
    components: {
      Spinner,
      Home,
    },
  })
  class Application extends Vue {
    /*************************************************/
    /* PROPERTIES */
    /*************************************************/
    checkOnlineStateInterval = -1;

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

    get isOnline(): boolean {
      return this.store.isOnline;
    }

    get metaInfo() {
      return {
        title: "Wedding :: Josephine & Morten",
        meta: config.metaOptions,
        htmlAttrs: {
          lang: activeLanguage,
        },
      };
    }

    /*************************************************/
    /* WATCHERS */
    /*************************************************/
    @Watch("isOnline")
    notifyOnlineState() {
      if (this.isOnline) {
        this.$toasted.success(`Notice: You are online.`);
      } else {
        this.$toasted.info(`Notice: You are offline...`);
      }
    }

    /*************************************************/
    /* LIFE CYCLE */
    /*************************************************/
    async created() {
      this.setWindowSize();
      this.addEventListeners();
      this.setupServiceWorker();

      this.initialiseApplication().then(() => {
        this.setMeta();
        this.setupOnlineCheckInterval();
      });
    }

    beforeDestroy() {
      window.clearInterval(this.checkOnlineStateInterval);
      this.removeEventListeners();
    }

    /*************************************************/
    /* METHODS */
    /*************************************************/
    setMeta() {
      this.$options.metaInfo = this.metaInfo;
    }

    /*************************************************/
    /* METHODS */
    /*************************************************/
    async initialiseApplication() {
      await this.setUserLocale();

      await $store.dispatch("setSpinner", true);
      await $store.dispatch("initialise");

      setTimeout(() => {
        $store.dispatch("setSpinner", false);
      }, 1500);

      Logger.info("Application initialised.");

      return Promise.resolve();
    }

    async setUserLocale() {
      let locale = defaultLocale();

      try {
        locale = await getUserLocale();
      } catch (error) {
        Logger.error("Error getting user locale", error);
      } finally {
        localisationService.initAfterApplicationLoad(locale);
        return Promise.resolve();
      }
    }

    setupServiceWorker() {
      setupServiceWorker();
    }

    addEventListeners() {
      window.addEventListener("offline", this.checkOnlineState);
      window.addEventListener("online", this.checkOnlineState);
      window.addEventListener("resize", this.setWindowSize);
      window.addEventListener("orientationchange", this.setWindowSize);
    }

    removeEventListeners() {
      window.removeEventListener("offline", this.checkOnlineState);
      window.removeEventListener("online", this.checkOnlineState);
      window.removeEventListener("resize", this.setWindowSize);
      window.removeEventListener("orientationchange", this.setWindowSize);
    }

    setupOnlineCheckInterval() {
      this.checkOnlineStateInterval = window.setInterval(() => {
        if (navigator.onLine !== this.isOnline) {
          this.checkOnlineState();
        }
      }, 1000);
    }

    checkOnlineState() {
      if (navigator.onLine) {
        $store.dispatch("setOnline", true);
      } else {
        $store.dispatch("setOnline", false);
      }
    }

    setWindowSize() {
      if (supportsCSSVariables()) {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight / 100}px`);
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
