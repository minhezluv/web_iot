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
import { mapState } from 'vuex'
export default {
  created() {
    //  truong 31 ngay cua 1 thang
    for (let i = 1; i < 32; i++) {
      this.chartOptions.xaxis.categories.push(i)
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 31; j++) {
        this.series[i].data[j] = 0
      }
    }
    console.log('this.series', this.series)
    let payload = {
      id: this.deviceClick,
      month: this.monthSelectLine,
      year: this.yearSelectLine
    }
    this.$store.dispatch('loadDataSensorMonth', payload)
    this.dataSensorMonth = this.$store.state.listDataSensorMonth

    this.dataSensorMonth.sort((a, b) => {
      if (a.code < b.code) return -1
      return a.code > b.code ? 1 : 0
    })
    console.log(this.dataSensorMonth)

    this.dataSensorMonth.forEach((item, index, array) => {
      // console.log('item', item)
      this.series[index].name = item.name
      if (item.listData.length != 0) {
        item.listData.forEach(element => {
          // console.log(element)
          this.series[index].data[element.date - 1] = element.sum
          // this.series[index].data[element.date - 1] = element.sum
          //  console.log(this.series[index].data[element.date - 1])
        })
      }
    })
  },
  props: ['deviceClick', 'monthSelectLine', 'yearSelectLine'],
  watch: {
    monthSelectLine: function(newVal, oldVal) {
      console.log('Prop changed: ***', newVal, ' | was: ', oldVal)
      this.$forceUpdate()
    },
    yearSelectLine: function(newVal, oldVal) {
      console.log('Prop changed:  ***', newVal, ' | was: ', oldVal)
      this.$forceUpdate()
    }
  },

  // chuwa load dk state -> 16
  // computed: {
  //   ...mapState(['listDataSensor'])
  // },
  data() {
    return {
      dataSensorMonth: '',
      dataSensor1: '',
      dataSensor2: '',
      dataSensor3: '',
      dataSensor4: '',
      dataSensor5: '',

      // chart
      series: [
        {
          name: '',
          data: []
        },

        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        }
      ],
      chartOptions: {
        colors: ['#77B6EA', '#545454', '#00ff00', '#009900', '#ff33ff'],
        chart: {
          height: 450,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
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
          text: 'Biểu đổ lượng nước các sensor của thiết bị theo tháng',
          align: 'left'
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Time'
          }
        },
        yaxis: {
          title: {
            text: 'Valude'
          },
          min: 0,
          max: 350
        }
      }
    }
  },
  mounted() {
    // this.setDataLineChart()
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
