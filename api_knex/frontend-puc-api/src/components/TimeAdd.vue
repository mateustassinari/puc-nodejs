<template>
  <div class="submit-form">
    <div>
      <h4>Time</h4>
      <form @submit.prevent="salvaTime()">
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
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import TimeService from "../services/TimeService";
  
  export default {
    name: "time-add",
    data() {
      return {
        time: {
          nome: "",
          local: "",
          apelido: ""
        }
      };
    },
    methods: {
      salvaTime() { 
        TimeService.create(this.time)
          .then(response => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.s("Time salvo com sucesso!");
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
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 500px;
    margin: auto;
    margin-top: 5rem;
  }
  </style>