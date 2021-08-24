export const state = () => ({
    user: null
})
export const getters = {
    me: (state) => state.user,
    isAuthen: (state) => !!state.user
}
export const mutations = {
    setAuth(state, payload) {
        state.user = payload
    },
}