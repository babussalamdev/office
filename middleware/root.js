export default function ({ route, redirect }) {
  const userRoot = this.$auth.user.role
  const requiredRoot = route.meta[0]?.roots || ''

  const hasRoot = userRoot !== requiredRoot

  if(!hasRoot) {
    return redirect('/')
  }
}
