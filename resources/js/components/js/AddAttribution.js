import axios from "axios"
import _ from "lodash"

export default{
    props: {
        computer:{ required: true },
        date:    { required: true },
        hourre:  { required: true },
    },

    data(){
        return{
            dialog: false,

            loading: false,
            clients: [],
            client:  {},
            search:  '',

            addClient:  false,
            clientName: ''
        }
    },

    watch: {
        search: function(val){
            if(val && val.length > 1){
                axios.patch('/api/client/' + val)
                .then(({data}) => {
                    this.loading = true
                    data.clients.forEach(client => {
                        this.clients.push(this.formattedClient(client))
                    });
                }).catch(error => {
                    this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
                })
            }
        }
    },

    methods: {
        formattedClient(client){
            return {
                id:   client.id,
                name: client.name,
            }
        },

        Attribuer(){
            if( _.isNumber(this.client.id)){
                axios.post('/api/attributions/', this.Client())
                .then(({data}) => {
                    let _data = {
                        id:   this.computer.id,
                        data: data.attribution,
                        type: 'add-attribution'
                    }
                    this.$store.commit('UpdateComputer', _data)
                    this.$emit('updateHorraire', {index: this.hourre, attribution: data.attribution})
                    this.dialog = false
                }).catch(error => {
                    // this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
                })
            }else this.$store.commit('Alert', {alert: true, color: 'red', message: 'Veuillez sélectionner un client'})
        },

        Client(){
            return {
                computerID: this.computer.id,
                userID:     this.client.id,
                horraire:   this.hourre,
                date:       this.date
            }
        },

        AddClient(){
            if(this.clientName.length > 0){
                axios.post('/api/client/', {name: this.clientName})
                .then(({data}) => {
                    this.dialog = false
                    this.$emit('updateHorraire', {index: this.hourre, attribution: data.attribution})
                    this.dialog = false
                }).catch(error => {
                    this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
                })
            }
        }
    }
}