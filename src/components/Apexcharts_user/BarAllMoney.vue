<template>
  <apexchart
    height="700"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>
<script>
export default {
  name: 'BarChartMoneyUser',
  props: ['idUser'],
  created() {
    this.$store.dispatch('loadDataTotalYearUser', {
      year: 2022,
      id: this.idUser
    })
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
            columnWidth: '55%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
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
          ]
        },
        yaxis: {
          title: {
            text: 'value'
          }
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
        }
      }
    }
  },
  computed: {
    series: {
      get: function () {
        let listmoney = [  { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
          
        
        let temp = this.$store.state.listAllDataYearUser
        console.log('temp:', listmoney[0])
        if (temp.length != 0) {
          temp.forEach((item, index, array) => {
            let money = 0
            if (temp[index] <= 10000) {
              money = (temp[index] / 1000) * 5.973
            } else if (temp[index]<= 20000) {
              money = ((temp[index] - 10000) / 1000) * 7.052 + 10 * 5.973
            } else if (temp[index] <= 30000) {
              money = ((temp[index] - 20000) / 1000) * 8.669 + 10 * 5.973 + 10 * 7.052
            } else {
              money =
                ((temp[index] - 30000) / 1000) * 8.669 +
                10 * 5.973 +
                10 * 7.052 +
                10 * 8.669
            }
            listmoney[0].data[index] = money
           // console.log("index",listmoney.data[index]);
          })
        }
        console.log('listmoney', listmoney)
        return listmoney
      },
      set: function () {
        return this.series
      }
    }
  }
}
</script>

<style></style>
