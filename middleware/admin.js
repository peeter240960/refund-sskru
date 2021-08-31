export default async ({ store, redirect }) => {
    if (!store.state.authen.user) {
        redirect('/')
    }
    if (store.state.authen.user.role != 'admin') {
        redirect('/')
    }
}