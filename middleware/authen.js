export default async ({ store, redirect }) => {
    try {
        await store.dispatch('authen/getMe')
        if (!store.state.authen.user._id) {
            redirect('/')
        }
    } catch (err) {
        console.log('err', err?.response?.data?.message);
        redirect('/')
    }
}