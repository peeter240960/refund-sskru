export default async ({ store, redirect }) => {
    if (!store.state.authen.user._id) {
        redirect('/')
    }
    if (store.state.authen.user.status || store.state.authen.user.status >= 1) {
        redirect('/confirmed')
    }
}