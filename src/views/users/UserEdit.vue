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
                <h1>Editar Usuario</h1>
            </div>
            <form @submit.prevent="updateUser">
                <div class="mb-3">
                    <label class="form-label" for="name">Nombre completo</label>
                    <input v-model="user.name" type="text" name="name" id="name" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="email">Email</label>
                    <input v-model="user.email" type="email" name="email" id="email" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="password">Contraseña</label>
                    <input v-model="user.password" type="password" name="password" id="password" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="direccion">Dirección</label>
                    <input v-model="user.direccion" type="text" name="direccion" id="direccion" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="telefono">Teléfono</label>
                    <input v-model="user.telefono" type="text" name="telefono" id="telefono" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="fecha_nacimiento">Fecha de Nacimiento</label>
                    <input v-model="user.fecha_nacimiento" type="date" name="fecha_nacimiento" id="fecha_nacimiento" class="form-control">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-success" value="Guardar">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                direccion: '',
                telefono: '',
                fecha_nacimiento: ''
            }
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser(){
            this.axios.get('http://127.0.0.1:9000/api/user_edit/' + this.$route.params.id)
                .then(response => {
                    let data = response.data.data;
                    this.user = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        direccion: data.user_info.direccion,
                        telefono: data.user_info.telefono,
                        fecha_nacimiento: data.user_info.fecha_nacimiento
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateUser(){
            this.axios.put('http://127.0.0.1:9000/api/user_update/' + this.$route.params.id, this.user)
                .then(() => {
                    this.$router.push({name: 'UsersList'})
                })
        }
    }
}
</script>