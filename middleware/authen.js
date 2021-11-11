export default async ({ store, redirect }) => {
    try {
        if (!store.state.authen.user) {
            redirect('/')
        }
    } catch (err) {
        console.log('err', err?.message);
        console.log('err', err?.response?.data?.message);
        redirect('/')
    }
}