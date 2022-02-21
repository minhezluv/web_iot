<template>
  <div>
    <apexchart
      type="line"
      height="700"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
  created() {
    let tempData = [
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
    ]
    //  truong 31 ngay cua 1 thang
  
    //  console.log('this.series', this.series)
    let payload = {
      id: this.deviceClick,
      month: this.monthSelectLine,
      year: this.yearSelectLine
    }

    this.$store.dispatch('loadDataSensorMonth', payload)
    let dataSensorMonth = this.$store.state.listDataSensorMonth
    console.log()
    dataSensorMonth.sort((a, b) => {
      if (a.code < b.code) return -1
      return a.code > b.code ? 1 : 0
    })
    console.log('datasensor:', dataSensorMonth)

    dataSensorMonth.forEach((item, index, array) => {
      tempData[index].name = item.name
      if (item.listData !== undefined) {
        if (item.listData.length != null) {
          item.listData.forEach((element) => {
            tempData[index].data[element.date - 1] = element.sum
          })
        }
      } else {
        console.log('hi')
      }
    })
    this.series = tempData
  },
  props: ['deviceClick', 'usernameClick', 'monthSelectLine', 'yearSelectLine'],
  watch: {
    monthSelectLine: function (newVal, oldVal) {
      console.log('Prop changed: ***', newVal, ' | was: ', oldVal)
      // this.$forceUpdate()

      this.upDateData(newVal, this.yearSelectLine, this.deviceClick)
    },
    yearSelectLine: function (newVal, oldVal) {
      console.log('Prop changed:  ***', newVal, ' | was: ', oldVal)
      // this.$forceUpdate()
      this.upDateData(this.monthSelectLine, newVal, this.deviceClick)
    }
  },

  // chuwa load dk state -> 16
  // computed: {
  //   ...mapState(['listDataSensor'])
  // },
  data: function () {
    return {
      state: 0,
      dataSensorMonth: '',
      dataSensor1: '',
      dataSensor2: '',
      dataSensor3: '',
      dataSensor4: '',
      dataSensor5: '',

      // chart

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
          max: 1000
        }
      }
    }
  },

  methods: {
    upDateData(month, year, deviceClick) {
      //  truong 31 ngay cua 1 thang
      let tempData = [
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
      ]
      for (let i = 1; i < 32; i++) {
        this.chartOptions.xaxis.categories.push(i)
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 31; j++) {
          tempData[i].data[j] = 0
        }
      }
      let payload = {
        id: deviceClick,
        month: month,
        year: year
      }
      this.$store.dispatch('loadDataSensorMonth', payload)
      let dataSensorMonth = this.$store.state.listDataSensorMonth

      dataSensorMonth.sort((a, b) => {
        if (a.code < b.code) return -1
        return a.code > b.code ? 1 : 0
      })
      //  console.log('data :', dataSensorMonth)
      dataSensorMonth.forEach((item, index, array) => {
        tempData[index].name = item.name
        if (item.listData !== undefined) {
          if (item.listData.length != null) {
            item.listData.forEach((element) => {
              tempData[index].data[element.date - 1] = element.sum
            })
          }
        } else {
          console.log('hi')
        }
      })
      this.series = tempData
      console.log(month)
    }
  },
  computed: {
    series: {
      get: function () {
   

        let tempData = [
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
        ]
            for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 31; j++) {
        tempData[i].data[j] = 0
      }
    }
        let dataSensorMonth = this.$store.state.listDataSensorMonth
        console.log('minh')
        dataSensorMonth.sort((a, b) => {
          if (a.code < b.code) return -1
          return a.code > b.code ? 1 : 0
        })
        console.log('datasensor:', dataSensorMonth)

        dataSensorMonth.forEach((item, index, array) => {
          tempData[index].name = item.name
          if (item.listData !== undefined) {
            if (item.listData.length != null) {
              item.listData.forEach((element) => {
                tempData[index].data[element.date - 1] = element.sum
              })
            }
          } else {
            console.log('hi')
          }
        })
        console.log("temp:",tempData);
        return tempData
      
      },
      set: function () {
        let tempData = [
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
        ]
        let dataSensorMonth = this.$store.state.listDataSensorMonth
        console.log('minh')
        dataSensorMonth.sort((a, b) => {
          if (a.code < b.code) return -1
          return a.code > b.code ? 1 : 0
        })
        console.log('datasensor:', dataSensorMonth)

        dataSensorMonth.forEach((item, index, array) => {
          tempData[index].name = item.name
          if (item.listData !== undefined) {
            if (item.listData.length != null) {
              item.listData.forEach((element) => {
                tempData[index].data[element.date - 1] = element.sum
              })
            }
          } else {
            console.log('hi')
          }
        })
        return tempData
      }
    }
  }
  //  mounted(){
  //        //  truong 31 ngay cua 1 thang
  //       let tempData = [
  //         {
  //           name: '',
  //           data: []
  //         },

  //         {
  //           name: '',
  //           data: []
  //         },
  //         {
  //           name: '',
  //           data: []
  //         },
  //         {
  //           name: '',
  //           data: []
  //         },
  //         {
  //           name: '',
  //           data: []
  //         }
  //       ]
  //       for (let i = 1; i < 32; i++) {
  //         this.chartOptions.xaxis.categories.push(i)
  //       }
  //       for (let i = 0; i < 5; i++) {
  //         for (let j = 0; j < 31; j++) {
  //           tempData[i].data[j] = 0
  //         }
  //       }
  //       let payload = {
  //         id: this.deviceClick,
  //         month: this.monthSelectLineh,
  //         year: this.yearSelectLineyear
  //       }
  //       this.$store.dispatch('loadDataSensorMonth', payload)
  //       let dataSensorMonth = this.$store.state.listDataSensorMonth

  //       dataSensorMonth.sort((a, b) => {
  //         if (a.code < b.code) return -1
  //         return a.code > b.code ? 1 : 0
  //       })
  //     //  console.log('data :', dataSensorMonth)
  //       dataSensorMonth.forEach((item, index, array) => {
  //         tempData[index].name = item.name
  //         if (item.listData !== undefined) {

  //           if (item.listData.length != null) {
  //             item.listData.forEach((element) => {

  //               tempData[index].data[element.date - 1] = element.sum
  //             })
  //           }
  //         } else {
  //           console.log('hi')
  //         }
  //       })
  //        this.series = tempData
  //         console.log(this.monthSelectLine)
  //  }
  //   setDataLineChart() {
  //     setInterval(() => {
  //       //this.$store.dispatch('loadDataSensor', this.deviceClick)
  //       this.series[0].data.splice(0, 1)
  //       // this.series[0].data.push(this.getRandomArbitrary(0, 99))
  //       this.updateSeriesLine()
  //     }, 3000)
  //   },
  //   updateSeriesLine() {}
  // }
}
</script>
