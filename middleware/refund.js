export default async ({ store, redirect }) => {
    if (!store.state.authen.user) {
        redirect('/')
    }
    // if (!store.state.authen.user.paidtype != 1 && store.state.getAccess.access != 1) {
    //     redirect('/confirmed')
    // }
}