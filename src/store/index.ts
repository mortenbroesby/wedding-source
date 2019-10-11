import Vue from "vue";
import * as Vuex from "vuex";

Vue.use(Vuex);

type Mutations = typeof mutations;
type Actions = typeof actions;

interface Dispatch {
  (action: keyof Actions, payload?: any, options?: Vuex.DispatchOptions): Promise<any>;
}

interface Commit {
  (type: keyof Mutations, payload?: any, options?: Vuex.CommitOptions): void;
}

type Context = {
  dispatch: Dispatch;
  commit: Commit;
  state: RootState;
};

class TypedStore extends Vuex.Store<RootState> {
  commit: Commit;
  dispatch: Dispatch;
}

export interface RootState {
  applicationHasLoaded: boolean;
  spinnerVisible: boolean;
  isOnline: boolean;
}

export const state: RootState = {
  applicationHasLoaded: false,
  spinnerVisible: true,
  isOnline: true,
};

const mutations = {
  SET_APPLICATION_INITIALISED(prevState: RootState, hasInitialised: boolean): void {
    prevState.applicationHasLoaded = hasInitialised;
  },

  SET_SPINNER_VISIBILITY(prevState: RootState, isVisible: boolean): void {
    prevState.spinnerVisible = isVisible;
  },

  SET_ONLINE_STATE(prevState: RootState, isOnline: boolean): void {
    prevState.isOnline = isOnline;
  },
};

const actions = {
  async initialise({ dispatch }: Context): Promise<void> {
    dispatch("setApplicationInitialised", true);
  },

  setApplicationInitialised({ commit }: Context, hasInitialised: boolean) {
    commit("SET_APPLICATION_INITIALISED", hasInitialised);
  },

  setSpinner({ commit }: Context, isVisible: boolean): void {
    commit("SET_SPINNER_VISIBILITY", isVisible);
  },

  setOnline({ commit }: Context, isOnline: boolean): void {
    commit("SET_ONLINE_STATE", isOnline);
  },
};

export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions,
});
