<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Tổng tài khoản</p>
              <h4 class="card-title">{{ totalUser }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i></div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Tổng thiết bị</p>
              <h4 class="card-title">{{ totalDevice }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i></div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Tổng dữ liệu</p>
              <h4 class="card-title">{{ totalData }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-clock-o"></i></div>
          </stats-card>
        </div>

       
      </div>

      <div class="row">
        <div class="card col-md-11 ml-3">
          <line-chart></line-chart>
        </div>

       
      </div>

      <div class="row">
        <div class="card col-md-11 ml-3">
          <bar-chart></bar-chart>
        </div>
      </div>
       <div class="row">
        <div class="card col-md-11 ml-3">
         <BarChartMoney/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatsCard from 'src/components/Cards/StatsCard.vue'

import LineChart from 'src/components/Chart/LineChart'

import BarChart from 'src/components/Chart/BarChart'
import BarChartMoney from 'src/components/Chart/BarChartMoney'
import { mapGetters } from 'vuex'
export default {
  created() {
    this.$store.dispatch('loadListDevice')
    this.$store.dispatch('loadListUser')
    this.$store.dispatch('loadDataTotal')
   // this.totalData = this.$store.state.totalData
  },
  components: {
    StatsCard,
    LineChart,

    BarChart,
    BarChartMoney
  },
  computed: {
    ...mapGetters(['totalUser', 'totalDevice','totalData'])
  },
  data() {
    return {
     
      total: 0
    }
  }
}
</script>
<style></style>
