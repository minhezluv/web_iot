<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
   created() {
    let payload = {
      year: 2022
    }
    this.$store.dispatch('loadDataTotalYear', payload);
   this.data.datasets[0].data=this.$store.state.listAllDataYear;
    console.log("dataset: ",this.data.datasets[0].data);
    
    // console.log('this.series', this.series)
  },
  data() {
    return {
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        datasets: [
          {
            data: [0,0],
            label: 'đơn vị lít (nước)',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
              '#ff66ff',
              '#3300ff',
              '#00cccc',
              '#ffff00',
              '#ff3300',
              '#0000cc',
              '#330033'
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'TỔNG SẢN LƯỢNG NƯỚC TỪNG THÁNG TRONG NĂM'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // setInterval(() => {
    //   // console.log("dat oc cho");
    //   this.renderChart(this.data, this.options);
    // }, 5000);
    this.renderChart(this.data, this.options)
  }
}
</script>

<style></style>
