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
  name: 'BarChartMoney',
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
            text: 'Nghìn đồng'
          }
        },
        title: {
          text: 'Biểu đổ lượng tiền các tháng trong năm',
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
          palette: 'palette3' // upto palette10
        }
      }
    }
  },
  computed: {
    series: {
      get: function () {
        let lismoney = [{ name: 'Tổng doanh thu trong năm', data: [] }]
        let temp = this.$store.state.listAllDataYear
        for (let element of temp) {
          let money = 0
          if (element <= 10000) {
            money = (element / 1000) * 5.973
          } else if (element <= 20000) {
            money = ((element - 10000) / 1000) * 7.052 + 10 * 5.973
          } else if (element <= 30000) {
            money = ((element - 20000) / 1000) * 8.669 + 10 * 5.973 + 10 * 7.052
          } else {
            money =
              ((element - 30000) / 1000) * 8.669 +
              10 * 5.973 +
              10 * 7.052 +
              10 * 8.669
          }
          money=Math.round(money)
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
