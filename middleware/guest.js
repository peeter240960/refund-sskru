export default async ({ store, redirect }) => {
    try {
        await store.dispatch('authen/getMe')
        if (store.state.authen.user) {
            redirect('/home')
        }
    } catch (err) {
        console.log('err', err.message);
        console.log('err', err?.response?.data?.message);
    }
}