<template>
    <div class="form">
		<h1>Login</h1>
		<form @submit.prevent="loginUsuario()">
			<label for="login">
				<i class="fas fa-user"></i>
			</label>
			<input type="text" v-model="login" name="login" placeholder="Login" id="login" required>
			<label for="senha">
				<i class="fas fa-lock"></i>
			</label>
			<input type="password" v-model="senha" name="senha" placeholder="Senha" id="senha" required>
            <div class="col-md-6">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="col-md-6">
                <button type="button" class="btn btn-info" @click="cadastro()">Cadastrar</button>
            </div>
		</form>
	</div>
</template>
  
<script>
import SegurancaService from "../services/SegurancaService";
  
export default {
    name: 'login',
    data() {
      return {
        login: '',
        senha: ''
      };
    },
    methods: {
        loginUsuario() {
            let data = {
                login: this.login,
                senha: this.senha
            };

            SegurancaService.login(data)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isAdmin", response.data.roles?.split(';').includes('ADMIN'));
                localStorage.setItem("logado", true);
                this.$router.push('/times')
            })
            .catch(e => {
                this.$toastr.defaultPosition = "toast-top-center";
                this.$toastr.e(e.response?.data.message || 'Erro');
            });
        },
        cadastro() {
            this.$router.push('/register')
        }
    },
    mounted() {
      let logado = localStorage.getItem("logado") === 'true';
      if(logado) {
        this.$router.push('/times')
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
.form form input[type="password"], .form form input[type="text"] {
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
  