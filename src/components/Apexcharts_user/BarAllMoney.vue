
<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarChartMoneyUser',
  extends: Bar,
   created() {
    let payload = {
      year: 2022,
      id:this.idUser
    }
    let listmoney=[];
    this.$store.dispatch('loadDataTotalYearUser', payload);
    let temp=this.$store.state.listAllDataYearUser;
    for(let element of temp){
     let money=0;
     if(element<=10000){
       money=element/1000*5.973;
       
     }else if(element<=20000){
       money=((element-10000)/1000)*7.052+10*5.973;
     }else if(element<=30000){
       money=((element-20000)/1000)*8.669+10*5.973+10*7.052;
     }else {
         money=((element-30000)/1000)*8.669+10*5.973+10*7.052+10*8.669;
     }
     listmoney.push(money);
   }
   this.data.datasets[0].data=listmoney;
    console.log("dataset: ",this.data.datasets[0].data);
    
    // console.log('this.series', this.series)
  },
     props: ['idUser'],
  data() {
    return {
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        datasets: [
          {
            data: [0,0],
            label: 'Nghìn đồng',
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
          text: 'Tổng tiền Hàng tháng trong năm'
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
