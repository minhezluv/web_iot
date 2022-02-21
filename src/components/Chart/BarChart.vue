<template>
  <apexchart
    height="500"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: 'BarChart',
    components: {
    apexchart: VueApexCharts
  },
  created() {
    let payload = {
      year: 2022
    }

    this.$store.dispatch('loadDataTotalYear', payload)

    // console.log('this.series', this.series)
  },
  data: function () {
    return {
      dataYear: [],
      // chart
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '55%',
            distributed: true
          }
        },

        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
     
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
            title: {
            text: 'Tháng'
          }
        },
        yaxis: {
          title: {
            text: 'Lít'
          }
        },
        title: {
          text: 'Biểu đổ lượng nước các tháng trong năm',
          align: 'center'
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        },
        theme: {
          palette: 'palette4' // upto palette10
        }
      }
    }
  },
  computed: {
    series: {
      get: function () {
        let lismoney = [{ name: 'Tổng lượng nước trong năm', data: [] }]
        let temp = this.$store.state.listAllDataYear
        for (let element of temp) {
          let money = element
          lismoney[0].data.push(money)
        }
        return lismoney
      },
      set: function () {
        return this.series
      }
    }
  }
}
</script>

<style></style>
