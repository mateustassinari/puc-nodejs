<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="d-flex mb-2">
        <h4>Times</h4>
        <router-link v-if="isAdmin" :to="'/add'" class="btn btn-success" style="margin-left: 5px;"><i class="fas fa-plus"></i></router-link>
        <button @click="logout()" class="btn btn-secondary" style="margin-left: auto;"><i class="fas fa-sign-out-alt"></i></button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Time</th>
            <th style="width:5%;">Ver</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(time, index) in times" :key="index">
            <td>{{ time.nome }}</td>
            <td>
              <router-link :to="'/times/' + time.id" class="btn btn-warning"><i class="fas fa-eye"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
  import TimeService from "../services/TimeService";
  
  export default {
    name: "times",
    data() {
      return {
        times: [],
        isAdmin: localStorage.getItem("isAdmin") === 'true'
      };
    },
    methods: {
      listaTimes() {
        let loader = this.$loading.show();

        TimeService.get()
          .then(response => {
            this.times = response.data;
            loader.hide()
          })
          .catch(e => {
            this.$toastr.defaultPosition = "toast-top-center";
            this.$toastr.e(e.response?.data.message || 'Erro');
            if(e.response?.status === 401) {
              localStorage.setItem("logado", false);
              localStorage.removeItem("token");
              localStorage.removeItem("isAdmin");
              this.$router.push('/')
              loader.hide()
            }
          });
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.setItem("logado", false);
        this.$router.push('/')
      }
    },
    mounted() {
      this.listaTimes();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 650px;
    margin: auto;
    margin-top: 5rem;
  }
  </style>