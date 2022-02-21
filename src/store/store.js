import Vue from 'vue'
import Vuex from 'vuex'

// import listUser from "./Modules/listUser";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        listUser: [],
        listDevice: [],
        listDataSensorMonth: [],
        listDataSensorYear: [],
        listAllDataYear: [],
        listAllDataYearUser: [],
        listAllDataListYear: [],
        totaldata: 0
    },

    getters: {
        totalUser: state => {
            return state.listUser.length
        },
        totalDevice: state => {
            return state.listDevice.length
        },
        totalData: state => {
            return state.totaldata
        }
    },
    mutations: {
        // USER
        SAVE_LISTUSER(state, listUser) {
            state.listUser = listUser
        },

        // DEVICE
        SAVE_LISTDEVICE(state, listDevice) {
            state.listDevice = listDevice
        },

        // SENSOR
        SAVE_DATASENSORMONTH(state, data) {
            state.listDataSensorMonth = data
        },

        SAVE_DATASESORYEAR(state, data) {
            state.listDataSensorYear = data
        },

        // TOTAL
        SAVE_DATATOTAL(state, data) {
            state.totaldata = data
        },
        SAVE_ALLDATASESORYEAR(state, data) {
            state.listAllDataYear = data;
        },
        SAVE_ALLDATASESORYEARUSER(state, data) {
            state.listAllDataYearUser = data;
        },
        SAVE_ALLDATALISTYEAR(state, data) {
            state.listAllDataListYear = data;
        }
    },
    actions: {
        // API List User By Admin
        loadListUser({ commit }) {
            Vue.axios
                .get('/api/auth/list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(result => {
                    // console.log("list user ", result.data);
                    commit('SAVE_LISTUSER', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },

        // API List Device by Admin
        loadListDevice({ commit }) {
            Vue.axios
                .get('/api/admin/device/list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(result => {
                    //console.log("list device ", result.data);
                    commit('SAVE_LISTDEVICE', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },

        // API get data sensor
        loadDataSensorMonth({ commit }, payload) {
            // /api/device/7/alldatasensor/month/12-2020
            // console.log('loadDataSensor run')
            //console.log('dispath')
            console.log("payload:", payload);
            let url = `/api/device/${payload.id}/alldatasensor/month/${payload.month}-${payload.year}`
                // console.log('url', url)
            Vue.axios
                .get(url, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(result => {
                    console.log('datastore: ', result.data)
                    commit('SAVE_DATASENSORMONTH', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },

        loadDataSenSorYear({ commit }, payload) {
            console.log("payload:", payload.id);
            Vue.axios
                .get(`/api/device/${payload.id}/alldatasensor/year/${payload.year}`)
                .then(result => {
                    commit('SAVE_DATASESORYEAR', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },
        loadDataTotal({ commit }) {
            let year = 2022
            Vue.axios
                .get(`api/device/sumdata/year/${year}`)
                .then(result => {
                    console.log('total ', result.data)
                    commit('SAVE_DATATOTAL', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },
        loadDataTotalYear({ commit }, payload) {

            Vue.axios
                .get(`/api/device/alldatabymonth/month/2022`)
                .then(result => {
                    console.log(result.data);
                    commit('SAVE_ALLDATASESORYEAR', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },
        loadDataTotalYearUser({ commit }, payload) {
            console.log("payload:", payload);
            Vue.axios
                .get(`/api/device/alldata/${payload.id}/${payload.year}`)
                .then(result => {
                    console.log(result.data);
                    commit('SAVE_ALLDATASESORYEARUSER', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        },
        loadDataTotalListYear({ commit }, payload) {
            console.log(payload);
            Vue.axios
                .get(`/api/device/alldata`)
                .then(result => {
                    console.log(result.data);
                    commit('SAVE_ALLDATALISTYEAR', result.data)
                })
                .catch(error => {
                    throw new Error(`API ${error}`)
                })
        }
    }

})