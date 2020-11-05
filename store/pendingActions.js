export const state = () => ({
  preAuthAction: {}
});

export const mutations = {
  setPreAuthAction( state, action ) {
    state.preAuthAction = action;
  }
}