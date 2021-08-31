export default async ({ store, redirect }) => {
    if (!store.state.authen.user) {
        redirect('/')
    }
    if (store.state.authen.user.status && (store.state.authen.user.status != 0 || store.state.authen.user.status != '0')) {
        redirect('/confirmed')
    }

    store.commit('access/setAccess', {
        access: store.state.authen.user.status
    })
}