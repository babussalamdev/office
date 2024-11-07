import Swal from "sweetalert2";
export default {
    async submit({ commit, state }, value) {
        commit('btn')
        const data = Object.fromEntries(new FormData(value.event.target));
        try {
            const result = await this.$auth.loginWith("local", { data: data });
            if (result) {
                value.$cookies.set("AccessToken", result.data.AccessToken, {
                    // secure: true,
                    expires: 1,
                });
                commit('btn')
                this.$router.push("/");
                if (this.$auth.user.role === "santri") {
                    value.$cookies.remove("AccessToken");
                    this.$auth.logout();
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        text: "Anda tidak memiliki hak akses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            commit('btn')
            if (error.response && error.response.status === 500) {
                Swal.fire({
                    text: error.response.data.name.replace(/(?=[A-Z])/g, " "),
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    text: error.message,
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    },
}
