<template>
    <div class="row">
        <div class="col-12 col-md-6">
            <h1>Nuevo Usuario</h1>
            <form @submit.prevent="saveUser">
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
                    <input v-model="user.fecha_nacimiento" type="date" name="fecha_nacimiento" id="fecha_nacimiento"
                        class="form-control">
                </div>
                <div class="mb-3">
                    <input type="submit" class="btn btn-success" value="Guardar">
                </div>
            </form>
        </div>
        <div class="col-12 col-md-6">
            <h1>Usuarios</h1>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td class="d-flex gap-2">
                                <router-link :to="{ name: 'UserDetail', params: { id: user.id } }"
                                    class="btn btn-info">Ver</router-link>
                                <router-link :to="{ name: 'UserEdit', params: { id: user.id } }"
                                    class="btn btn-warning">Editar</router-link>
                                <button class="btn btn-danger" @click="deleteUser(user.id)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Paginación">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" aria-label="Página anterior">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only"></span>
                            </a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page"
                            :class="{ active: page === currentPage }">
                            <a class="page-link" href="#" @click.prevent="onPageChange(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" aria-label="Página siguiente"
                                @click.prevent="onPageChange(currentPage + 1)">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only"></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            user: {
                name: '',
                email: '',
                password: '',
                direccion: '',
                telefono: '',
                fecha_nacimiento: ''
            },
            currentPage: 1,
            perPage: 10,
            totalItems: 0,
            totalPages: 0
        }
    },
    created() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            this.axios.get('http://127.0.0.1:9000/api/all-users?page=' + this.currentPage)
                .then(response => {
                    console.log(response.data.data)
                    this.users = response.data.data.data
                    this.totalItems = response.data.data.total;
                    this.totalPages = Math.ceil(this.totalItems / this.perPage);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getUsers();
        },
        saveUser() {
            this.axios.post('http://127.0.0.1:9000/api/new_user', this.user)
                .then(response => {
                    let user = response.data.data;
                    this.users.push(user)
                    this.user = {
                        name: '',
                        email: '',
                        password: '',
                        direccion: '',
                        telefono: '',
                        fecha_nacimiento: ''
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteUser(id) {
            this.axios.delete('http://127.0.0.1:9000/api/delete_user/' + id)
                .then(response => {
                    let index = this.users.findIndex(user => user.id == id);
                    this.users.splice(index, 1);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>