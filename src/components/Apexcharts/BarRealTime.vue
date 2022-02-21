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
  name: 'BarRealTime',
  created() {
    let payload = {
      id: this.deviceClick,
      year: this.yearSelectBar
    }
    this.$store.dispatch('loadDataSenSorYear', payload)
    console.log('payload-id: ', payload.id)
    console.log('dataYear', this.dataYear)
    // console.log('this.series', this.series)
  },

  props: ['deviceClick', 'usernameClick', 'yearSelectBar'],
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
      set: function () {
        return this.series
      },
      get: function () {
        let tempData = [
          { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          { name: '', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        ]
        this.dataYear = this.$store.state.listDataSensorYear

        this.dataYear.sort((a, b) => {
          if (a.code < b.code) return -1
          return a.code > b.code ? 1 : 0
        })
        this.dataYear.forEach((item, index, array) => {
          // console.log('item', item)
          tempData[index].name = item.name
          if (item.listData.length != 0) {
            item.listData.forEach((element) => {
              //console.log(element)
              tempData[index].data[element.date - 1] = element.sum
              //  console.log(this.series[index].data[element.date - 1])
            })
          }
        })
        return tempData
      }
    }
  }
}
</script>
