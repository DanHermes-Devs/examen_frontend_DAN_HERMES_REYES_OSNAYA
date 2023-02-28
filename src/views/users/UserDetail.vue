<template>
    <div class="row">
        <div class="col-12 col-md-8">
            <div class="d-flex gap-2 align-items-center">
                <router-link :to="{ name: 'UsersList' }" class="btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path
                            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                </router-link>
                <h1>Datos del Usuario: <b>{{ user.name }}</b></h1>
            </div>
            <ul>
                <li><b>Nombre</b>: {{ user.name }}</li>
                <li><b>Correo Electrónico</b>: {{ user.email }}</li>
                <li><b>Contraseña encriptada</b>: {{ user.password }}</li>
                <li><b>Dirección</b>: {{ user.user_info.direccion }}</li>
                <li><b>Teléfono</b>: {{ user.user_info.telefono }}</li>
                <li><b>Fecha de nacimiento</b>: {{ user.user_info.fecha_nacimiento }}</li>
                <li><b>Edad</b>: {{ edad }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: [],
            edad: ""
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.axios.get('http://127.0.0.1:9000/api/user/' + this.$route.params.id)
                .then(response => {
                    this.user = response.data.data
                    this.edad = response.data.edad
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>