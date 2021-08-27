export default async ({ store, redirect }) => {
    if (!store.state.authen.user._id) {
        redirect('/')
    }
    if (store.state.authen.user.role != 'admin') {
        redirect('/')
    }
}