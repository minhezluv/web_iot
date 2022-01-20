<template>
  <card>
    <h4 class="card-title">Device Detail</h4>
    <form class="form" v-if="Object.keys(deviceDetail).length !== 0">
      <div class="row">
        <div class="col-md-3">
          <label for="" class="control-label">Name Device</label>
          <input
            type="text"
            placeholder="Name Device"
            :disabled="true"
            v-model="deviceDetail.name"
          />
        </div>
        <div class="col-md-3 check-box">
          <input
            type="checkbox"
            :disabled="true"
            id="name_device"
            v-model="deviceDetail.alive"
            :checked="deviceDetail.alive"
          /><label for="namedevice"><span class="ml-1">Collect</span></label>
        </div>
      </div>

      <h4>SenSor</h4>
      <div class="row">
        <div class="col-md-2">
          <label for="" class="control-label">Sensor 01</label>
          <input
            class="form-control"
            :disabled="true"
            type="text"
            placeholder="Name Sensor 01"
            v-model="deviceDetail.sensorList[0].name"
          />
        </div>
        <div class="col-md-2 check-box">
          <input
            :disabled="true"
            type="checkbox"
            id="name_sensor_01"
            :checked="deviceDetail.sensorList[0].status"
          /><label for="name_sensor_01"
            ><span class="ml-1">Collect</span></label
          >
        </div>

        <div class="col-md-2">
          <base-input
            :disabled="true"
            type="text"
            label="Sensor 02"
            placeholder="Name Sensor 02"
            v-model="deviceDetail.sensorList[1].name"
          >
          </base-input>
        </div>
        <div class="col-md-2 check-box">
          <input
            :disabled="true"
            type="checkbox"
            id="name_sensor_02"
            :checked="deviceDetail.sensorList[1].status"
          /><label for="name_sensor_02"
            ><span class="ml-1">Collect</span></label
          >
        </div>
        <div class="col-md-2">
          <label for="" class="control-label">Sensor 03</label>
          <input
            class="form-control"
            :disabled="true"
            type="text"
            placeholder="Name Sensor 03"
            v-model="deviceDetail.sensorList[2].name"
          />
        </div>
        <div class="col-md-2 check-box">
          <input
            type="checkbox"
            id="name_sensor_03"
            :disabled="true"
            :checked="deviceDetail.sensorList[2].status"
          /><label for="name_sensor_03"
            ><span class="ml-1">Collect</span></label
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <label for="" class="control-label">Sensor 04</label>
          <input
            class="form-control"
            type="text"
            :disabled="true"
            placeholder="Name Sensor 04"
            v-model="deviceDetail.sensorList[3].name"
          />
        </div>
        <div class="col-md-2 check-box">
          <input
            type="checkbox"
            :disabled="true"
            :checked="deviceDetail.sensorList[3].status"
          /><label for="name_sensor_04"
            ><span class="ml-1">Collect</span></label
          >
        </div>

        <div class="col-md-2">
          <label for="" class="control-label">Sensor 05</label>
          <input
            class="form-control"
            type="text"
            :disabled="true"
            placeholder="Name Sensor 05"
            v-model="deviceDetail.sensorList[4].name"
          />
        </div>
        <div class="col-md-2 check-box">
          <input type="checkbox" id="name_sensor_05" :disabled="true" /><label
            for="name_sensor_05"
            ><span class="ml-1">Collect</span></label
          >
        </div>
      </div>

      <div class="clearfix"></div>
    </form>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2 ml-3">
            <div class="form-group">
              <label for="exampleFormControlSelect2" class="ml-4">Month</label>
              <select
                class="form-control"
                id="exampleFormControlSelect2"
                v-model="monthSelectLine"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
          </div>
          <div class="col-md-2 ml-3">
            <div class="form-group">
              <label for="exampleFormControlSelect2" class="ml-4">Year</label>
              <select
                class="form-control"
                id="exampleFormControlSelect2"
                v-model="yearSelectLine"
              >
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </div>
<div class="row">
          <div class="card col-md-11 ml-5">
            <div>
              <line-user
                :deviceClick="deviceClick"
                :monthSelectLine="monthSelectLine"
                :yearSelectLine="yearSelectLine"
              ></line-user>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-2 ml-3">
            <div class="form-group">
              <label for="exampleFormControlSelect2" class="ml-4">Year</label>
              <select
                class="form-control"
                id="exampleFormControlSelect2"
                v-model="yearSelectBar"
              >
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="card col-md-11 ml-5">
          <div>
            <bar-user
              :deviceClick="deviceClick"
              :yearSelectBar="yearSelectBar"
            ></bar-user>
          </div>
        </div>
      </div>
      <br />
    </div>
  </card>
</template>
<script>
import axios from 'axios'
import BarUser from '../components/Apexcharts_user/BarUser.vue'
import LineUser from '../components/Apexcharts_user/LineUser.vue'

export default {
  components: { BarUser, LineUser },
  created() {
    this.deviceClick = localStorage.getItem('idDeviceClick')
    console.log('id: ', this.deviceClick)
    let url = '/api/device/' + this.deviceClick
    axios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((result) => {
        this.deviceDetail = result.data
        console.log('device detail: ', this.deviceDetail)
        this.listSensor = result.data.sensorList
        this.listSensor.sort((a, b) => {
          if (a.code < b.code) return -1
          return a.code > b.code ? 1 : 0
        })
        //console.log('listSensor', this.listSensor)
        this.listSensor.sort((a, b) => {
          if (a.code < b.code) return -1
          return a.code > b.code ? 1 : 0
        })
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },
  data() {
    return {
      monthSelectLine: 1,
      yearSelectLine: 2022,
      yearSelectBar: 2022,

      deviceClick: '',

      deviceDetail: ''
    }
  }
}
</script>

<style scoped>
.form {
  min-height: 540px;
}
.check-box input {
  margin-top: 40px;
  margin-left: 10px;
}

select,
.row .select {
  margin-left: 19px;
  min-width: 7;
}
</style>
