export default async ({ store, redirect }) => {
    try {
        if (localStorage.getItem('login')) {
            await store.dispatch('authen/getMe')
            if (store.state.authen.user) {
                if (
                    !store.state.authen.user.confirm &&
                    (store.state.authen.user.confirm != '0' ||
                        store.state.authen.user.confirm != 0)
                ) {
                    redirect('/confirmed')
                } else {
                    redirect('/unconfirmed')
                }
            }
        }
    } catch (err) {
        console.log('err', err?.response?.data?.message);
    }
}