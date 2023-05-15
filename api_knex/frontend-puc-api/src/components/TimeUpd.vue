<template>
  <div v-if="time" class="edit-form">
    <h4>Time</h4>
    <form @submit.prevent="atualizaTime()">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome" v-model="time.nome" required/>
      </div>
      <div class="form-group">
        <label for="local">Local</label>
        <input type="text" class="form-control" id="local" v-model="time.local" required/>
      </div>
      <div class="form-group">
        <label for="apelido">Apelido</label>
        <input type="text" class="form-control" id="apelido" v-model="time.apelido" required/>
      </div>
      <div class="mt-2">
        <button v-if="isAdmin" type="submit" class="btn btn-primary" style="margin-right: 5px;">Atualizar</button>
        <div v-if="isAdmin" class="btn btn-danger" style="margin-right: 5px;" @click.prevent="deletaTime()">Deletar</div>
        <router-link :to="'/times'" class="btn btn-secondary"><i class="fas fa-back"></i>Voltar</router-link>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import TimeService from "../services/TimeService";

  export default {
    name: "time-upd",
    data() {
      return {
        time: null,
        isAdmin: localStorage.getItem("isAdmin") === 'true'
      };
    },
    methods: {
      timeInfo(id) {
        TimeService.getById(id)
          .then(response => {
            this.time = response.data;
          })
          .catch(e => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.e(e.response?.data.message || 'Erro');
            if(e.response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.setItem("logado", false);
              this.$router.push('/')
            }
          });
      },
      atualizaTime() {
        TimeService.update(this.time.id, this.time)
          .then(response => {
            this.time = response.data;
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.s("Time atualizado com sucesso!");
          })
          .catch(e => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.e(e.response.data.message);
            if(e.response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.setItem("logado", false);
              this.$router.push('/')
            }
          });
      },
      deletaTime() {
        TimeService.delete(this.time.id)
          .then(response => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.s("Time deletado com sucesso!");
            this.$router.push('/times')
          })
          .catch(e => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.e(e.response.data.message);
            if(e.response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              localStorage.setItem("logado", false);
              this.$router.push('/')
            }
          });
      }
    },
    mounted() {
      this.timeInfo(this.$route.params.id);
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 500px;
    margin: auto;
    margin-top: 5rem;
  }
  </style>