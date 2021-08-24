export const state = () => ({
    access: 'access',
    have: 'nohave',
    funded: 'nofunded',
    loan: 'noloan',
    step: 1
})
export const getters = {
    getAccess: (state) => ({
        access: state.access,
        have: state.have,
        funded: state.funded,
        loan: state.loan,
    }),
    getStep: (state) => state.step
}
// export const actions = {
//     getInputAccess({ commit }, val) {
//         console.log(val);
//         // commit('setAccess', val)
//     }
// }
export const mutations = {
    setAccess(state, payload) {
        state.access = payload.access ? payload.access : state.access
        state.have = payload.have ? payload.have : state.have
        state.funded = payload.funded ? payload.funded : state.funded
        state.loan = payload.loan ? payload.loan : state.loan
        console.log(payload);
    },
    setStep(state, payload) {
        state.step = payload
    }
}