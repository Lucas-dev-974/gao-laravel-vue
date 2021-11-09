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
                        client: attribution.client.name
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
            axios.delete('/api/attributions/delete/' + horraireData.attribution.id)
            .then(({data}) => {
                if(data.success){
                    this.$store.commit('UpdateComputer', {
                        id:          this.computer.id,
                        attribution: data.attribution
                    })
                    let attributions  = this.attributions.filter(attr => attr.id !== horraireData.attribution.id)
                    this.attributions = []
                    this.attributions = attributions

                    this.Init()
                }
            })
        },

        updateHorraire(dataHorraire){
            let horraire = this.horraires.map(horraire =>{
                if(horraire.index == dataHorraire.index){
                    horraire.attribution = {
                        id: dataHorraire.attribution.id,
                        client: dataHorraire.attribution.client.name
                    }
                }
            })
        }
    }
}