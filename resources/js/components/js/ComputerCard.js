import axios from 'axios'
import { data } from 'jquery'
import AddAttribution from '../AddAttribution.vue'


export default{

    components: {
        AddAttribution
    },

    props:{
        computer: {required:true}, 
        date:     {required: true}
    },

    data(){
        return {
            attributions: [],
            horraires:    [],
            clickNumber:  0 
        }
    },

    mounted() {
        this.Init()
    },

    methods: {
        Init(){
            this.computer.attributions.forEach(attribution => {
                if(!isNaN(attribution.horraire)){
                    let horraire = parseInt(attribution.horraire)
                    this.attributions[horraire] = {
                        id:     attribution.id,
                        client: attribution.users.name
                    }
                }
            })
            this.buildHorraire();
        },

        buildHorraire(){   
            this.horraires = [] 
            for (let i = 0; i < 11; i++) {
                this.horraires.push({
                    index: i + 8,
                    attribution: (typeof this.attributions[i + 8] !== 'undefined') ? this.attributions[i + 8] : false
                })
            }
        },

        DeleteAttribution(horraireData){
            axios.delete('/api/attributions/' + horraireData.attribution.id)
            .then(({data}) => {
                console.log('delete attr: ', data);
                this.$store.commit('UpdateComputer', {
                    id:   this.computer.id,
                    data: data,
                    type: 'delete-attribution'
                })
                console.log('this.attributions:', this.attributions);
                let attributions = this.attributions.filter(attribution => {
                    if(attribution.id != data.id) return attribution
                })
                this.attributions = attributions
                console.log(attributions);
                this.Init()
            }).catch(error => {
                this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
            })
        },

        RemoveComputer(computer){
            switch(this.clickNumber){
                case 0:
                    this.$store.commit('Alert', {alert: true, color: 'orange', message: 'Clicker une 2eme fois pour supprimer l\'ordinateur'})
                    ++this.clickNumber
                case 1:
                    axios.delete('/api/computers/' + computer.id)     // Suppression request
                    .then(({data}) => {
                        this.$store.commit('RemoveComputer', computer.id) // Suppression local
                    }).catch(error => {
                        this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
                    })
                    this.clickNumber = 0
            }
        },

        updateHorraire(dataHorraire){
            this.horraires.map(horraire =>{
                if(horraire.index == dataHorraire.index){
                    horraire.attribution = {
                        id: dataHorraire.attribution.id,
                        client: dataHorraire.attribution.users.name
                    }
                }
            })
        }
    }
}