export default function ({ store, route, redirect }) {
  const userPermissions = store.state.index.permissions;
  const requiredPermissions = route.meta[0]?.permissions || [];

  const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

  if (!hasPermission) {
      return redirect('/'); // Redirect jika tidak memiliki izin
  }
}
