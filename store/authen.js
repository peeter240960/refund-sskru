export const state = () => ({
    user: null
})
export const getters = {
    me: (state) => state.user,
    isAuthen: (state) => !!state.user
}

export const actions = {
    async getMe({ commit }) {
        const resp = await this.$axios.$get('/api/me')
        if (resp.success) {
            await commit('setAuth', resp.result)
        }
    },
    async logout({ commit }) {
        const resp = await this.$axios.$delete('/api/logout')
        if (resp.success) {
            commit('setAuth', null)
            $nuxt.$router.push('/')
        }
    }
}
export const mutations = {
    setAuth(state, payload) {
        state.user = payload
    },
}