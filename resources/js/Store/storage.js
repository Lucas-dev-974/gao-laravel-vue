import { Alert } from 'bootstrap'
import { data } from 'jquery'
import Vue  from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const VuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage
})

const store = new Vuex.Store({
    plugins: [ VuexLocalStorage.plugin ],
    state:{
        AlertMessage: "",
        OnAlert: false,
        AlertColor: "",
        count: 0,


        UserInfos: null,
        Computers: [],
        AccessToken: null
    },

    mutations: {
        UpdateToken(state, token){
            state.AccessToken = token
        },

        Alert(state, AlertData){
            if(AlertData.alert){
                state.OnAlert      = true
                state.AlertMessage = AlertData.message
                state.AlertColor   = AlertData.color
            }else{
                state.OnAlert = false
            }
        }, 

        SetUser(state, user){
            state.user      = null
            state.UserInfos = user
        },

        SetComputer(state, computers){
            state.Computers = []
            state.Computers = computers
        },

        AddComputer(state, computer){
            state.Computers.push(computer)
        },

        RemoveComputer(state, computerID){
            console.log('in remove function storage: ', computerID);
            
            let computers = state.Computers.filter(computer => computer.id != computerID)
            state.Computers = computers
        },

        UpdateComputer(state, computer_data){
            state.Computers.forEach(computer => {
                if(computer_data.id == computer.id){
                    switch(computer_data.type){
                        case 'update-name':
                            computer.name = computer_data.data
                            break

                        case 'add-attribution':
                            computer.attributions.push(computer_data.data)
                            break

                        case 'delete-attribution':
                            console.log('delete attribution local');
                            let attributions = computer.attributions.filter(attribution => attribution.id != computer_data.data.id)
                            computer.attributions = attributions
                            break
                    }
                }
            });
        },
    }
})

export default store;