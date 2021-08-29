export const state = () => ({
    access: 1,
    right: 0,
    scholarshiptype: 0,
    loantype: 0,
    confirmlog: new Date().toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }),
    step: 1
})
export const getters = {
    getAccess: (state) => ({
        access: state.access,
        right: state.right,
        scholarshiptype: state.scholarshiptype,
        loantype: state.loantype,
        confirmlog: state.confirmlog
    }),
    getStep: (state) => state.step
}
export const mutations = {
    setAccess(state, payload) {
        console.log(payload);
        state.access = payload.access ?? state.access
        state.right = payload.right ?? state.right
        state.scholarshiptype = payload.scholarshiptype ?? state.scholarshiptype
        state.loantype = payload.loantype ?? state.loantype
    },
    setStep(state, payload) {
        state.step = payload
    }
}