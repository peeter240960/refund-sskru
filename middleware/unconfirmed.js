export default async ({ store, redirect }) => {
    if (!store.state.authen.user) {
        redirect('/')
    }
    if (store.state.authen.user.confirm && (store.state.authen.user.confirm != 0 || store.state.authen.user.confirm != '0')) {
        redirect('/confirmed')
    }
}