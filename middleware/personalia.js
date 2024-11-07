export default function ({ store, route, redirect }) {
  const userPersonalia = store.state.index.personalia;
  const requiredPersonalia = route.meta[0]?.personalias || '';

  const hasPersonalia = userPersonalia === requiredPersonalia

  if (!hasPersonalia) {
    return redirect('/'); // Redirect jika tidak memiliki izin
  }
}
