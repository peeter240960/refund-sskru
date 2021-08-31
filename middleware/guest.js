export default async ({ store, redirect }) => {
    try {
        await store.dispatch('authen/getMe')
        if (store.state.authen.user._id) {
            if (
                store.state.authen.user.confirm == 1 ||
                store.state.authen.user.confirm == '1' ||
                store.state.authen.user.confirm == 2 ||
                store.state.authen.user.confirm == '2'
            ) {
                redirect('/confirmed')
            } else {
                redirect('/unconfirmed')
            }
        }
        console.log(store.state.authen.user.confirm);
    } catch (err) {
        console.log('err', err?.response?.data?.message);
        redirect('/')
    }
}