<template>
    <div class="form">
		<h1>Cadastro</h1>
		<form @submit.prevent="register()">
			<label for="nome">
				<i class="fas fa-signature"></i>
			</label>
			<input type="text" v-model="nome" name="nome" placeholder="Nome" id="nome" required>
			<label for="login">
				<i class="fas fa-user"></i>
			</label>
			<input type="text" v-model="login" name="login" placeholder="Login" id="login" required>
            <label for="email">
				<i class="fas fa-envelope"></i>
			</label>
            <input type="email" v-model="email" name="email" placeholder="Email" id="email" required>
            <label for="password">
				<i class="fas fa-lock"></i>
			</label>
			<input type="password" v-model="senha" name="senha" placeholder="Senha" id="senha" required>

            <div style="margin-right: 260px;">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="admin" value="ADMIN" v-model="roles">
                    <span class="form-check-label" for="admin">ADMIN</span>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>

		</form>
	</div>
</template>
  
<script>
import SegurancaService from "../services/SegurancaService";
  
export default {
    name: 'register',
    data() {
      return {
        nome: '',
        login: '',
        email: '',
        senha: '',
        roles: ['USER']
      };
    },
    methods: {
        register() {
            let data = {
                nome: this.nome,
                login: this.login,
                email: this.email,
                senha: this.senha,
                roles: this.roles.join(';')
            };

            SegurancaService.register(data)
            .then(response => {
                this.$toastr.defaultPosition = "toast-top-center";
                this.$toastr.s(response.data.message);
                this.$router.push('/');
            })
            .catch(e => {
                this.$toastr.defaultPosition = "toast-top-center";
                this.$toastr.e(e.response?.data.message || 'Erro');
            });
        }
    }
}

</script>
  
<style scoped>
.form {
    width: 400px;
    background-color: #ffffff;
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.3);
    margin: 100px auto;
}
.form h1 {
    text-align: center;
    color: #5b6574;
    font-size: 24px;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid #dee0e4;
}
.form form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
}
.form form label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #3274d6;
    color: #ffffff;
}
.form form input[type="password"], .form form input[type="text"], .form form input[type="email"] {
    width: 310px;
    height: 50px;
    border: 1px solid #dee0e4;
    margin-bottom: 20px;
    padding: 0 15px;
}
.form form button {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
    border-radius: 0;
}
</style>
  