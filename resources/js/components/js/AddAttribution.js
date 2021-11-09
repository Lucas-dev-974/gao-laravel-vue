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
                axios.post('/api/client/search', {query_search: val})
                .then(({data}) => {
                    if(data.success){
                        this.loading = true
                        data.clients.forEach(client => {
                            this.clients.push(this.formattedClient(client))
                        });
                    }
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
                axios.post('/api/attributions/create', this.Client())
                .then(({data}) => {
                    if(data.success){
                        let _data = {
                            id:          this.computer.id,
                            attribution: data.attribution
                        }

                        this.$store.commit('UpdateComputer', _data)
                        this.$emit('updateHorraire', {index: this.hourre, attribution: data.attribution})
                    }
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
                axios.post('/api/client/create', {name: this.clientName})
                .then(({data}) => {
                    console.log(data);
                    if(data.success){
                        this.client = data.client
                        this.search = data.client.name
                        this.addClient = false
                    }
                })
            }
        }
    }
}