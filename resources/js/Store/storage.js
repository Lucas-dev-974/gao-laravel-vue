import { Alert } from 'bootstrap'
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
        OnAlert: "",
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
            console.log('in store computer update computers list');
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

        UpdateComputer(state, computerData){
            state.Computers.forEach(computer => {
                if(computerData.id === computer.id){
                    if(computerData.name)              // Si on veux mettre à jour le nom de l'ordinauteur
                        computer.name = computerData.name
                    else if(computerData.attribution) // Si on veux m'etre à jour les attributions
                        computer.attributions.forEach(attr => {
                            if(attr.id == computerData.attribution.id){
                                let attributions = computer.attributions.filter(attr => attr.id != computerData.attribution.id)
                                computer.attributions = []
                                computer.attributions = attributions
                            }else{
                                computer.attributions.push(computerData.attribution)
                            }
                        });
                }
            });
        },
    }
})

export default store;