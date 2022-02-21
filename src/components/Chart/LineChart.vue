<template>
  <div>
    <apexchart
      ref="realtimeChart"
      type="line"
      height="500"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
   name: 'LineChart',
    components: {
    apexchart: VueApexCharts
  },
  created() {
     let payload = {
      year: 2022
    }
     this.$store.dispatch('loadDataTotalListYear',payload);
  },
  data() {
    return {
      dataSensorMonth: '',
      dataSensor1: '',
     

      // chart
      chartOptions: {
        chart: {
          height: 450,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
            fontFamily: 'Helvetica'
          }
        },
        toolbar: {
          show: false
        },
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Biểu đổ lượng nước các năm',
          align: 'center'
        },
        xaxis: {
          categories: [2019,2020,2021,2022],
          title: {
            text: 'Năm'
          }
        },
        yaxis: {
          title: {
            text: 'lít nước'
          },
          min: 0,
          max: 1000
        }
      }
    }
  },

  computed: {
    series: {
      get: function () {
        let tempData = [
          {
            name: '',
            data: []
          }
        ]
        let temp = this.$store.state.listAllDataListYear
           for (let element of temp) {
          let money = element
          tempData[0].data.push(money)
        }
        console.log("temp:",tempData);
        return tempData
      },
      set: function () {
        return this.series
      }
    }
  },
  methods: {
    setDataLineChart() {
      setInterval(() => {
        //this.$store.dispatch('loadDataSensor', this.deviceClick)
        this.series[0].data.splice(0, 1)
        // this.series[0].data.push(this.getRandomArbitrary(0, 99))
        this.updateSeriesLine()
      }, 3000)
    },
   
  }
}
</script>
