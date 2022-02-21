<template>
  <card class="card-user" style="height:100%">
    <img
      slot="image"
      src="../../../public/img/faces/media2.jpg"
      alt="..."
      
    />
    <div class="author">
      <a href="#">
        <img class="avatar border-gray" src="../../../public/img/faces/girlfriend.jpg" style="" alt="..." />

        <h4 class="title">
          {{ role }}<br />
          <small>{{ fullName }}</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">
      A
    </p>
    <div slot="footer" class="text-center d-flex justify-content-center">
      <button href="#" class="btn btn-simple">
        <i class="fa fa-facebook-square"></i>
      </button>
      <button href="#" class="btn btn-simple">
        <i class="fa fa-twitter"></i>
      </button>
      <button href="#" class="btn btn-simple">
        <i class="fa fa-google-plus-square"></i>
      </button>
    </div>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
export default {
  created() {
    this.fullName = JSON.parse(localStorage.getItem("userLogin")).fullName;
    this.role = JSON.parse(
      localStorage.getItem("userLogin")
    ).authorities[0].authority;
  },
  components: {
    Card
  },
  data() {
    return {
      fullName: "",
      role: ""
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-md-3 col-md-offset-1";
      } else if (remainder === 2) {
        return "col-md-4";
      } else {
        return "col-md-3";
      }
    }
  }
};
</script>
<style></style>
