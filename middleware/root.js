export default function ({ $auth, route, redirect }) {
  const userRoot = $auth.user.role
  const requiredRoot = route.meta[0]?.roots || ''

  const hasRoot = userRoot !== requiredRoot

  if(!hasRoot) {
    if (!$auth) {
      // Tangani kasus di mana $auth belum terdefinisi
      return redirect('/');
    }
  }
}
