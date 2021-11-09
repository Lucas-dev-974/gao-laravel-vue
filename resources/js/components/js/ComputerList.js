import axios from 'axios';
import AddComputer from '../AddComputer.vue'

export default{

    data(){
        return {
            clickNumber: {},
            update: false,
            updateComputer: null, 
        }
    },
    
    components: {
        AddComputer
    },

    methods: {
        RemoveComputer(computer){
            if(Object.keys(this.clickNumber).length == 0){
                this.clickNumber = { id: computer.id, click: 1}
                this.$store.commit('Alert', {alert: true, color: 'orange', message: 'Clicker une 2eme fois pour supprimer l\'ordinateur'})
            }else{
                if(this.clickNumber.id !== computer.id){// Si click sur supp un autre ordi alors on reset
                    console.log('different computer click');
                    this.clickNumber = {}                // reset
                }else{                                  // Si double click sur supp le meme ordi alors on supprime
                    axios.delete('/api/computers/delete/' + computer.id)     // Suppression request
                    .then(({data}) => {
                        if(data.success){
                            this.$store.commit('RemoveComputer', computer.id) // Suppression local
                        }else{
                            this.$store.commit('Alert', {alert: true, color: 'orange', message: 'Une erreur est survenue'})
                        }
                    })
                    this.clickNumber = {}
                    this.$store.commit('Alert', {alert: false})
                }
            }
        },

        UpdateName(computer){
            console.log(computer);
            if(computer instanceof KeyboardEvent){
                let data = {
                    id:    this.updateComputer.id,
                    name:  this.updateComputer.name,
                }
                console.log(data);
                axios.post('/api/computers/update', data)
                .then(({data}) => {
                    if(data.success){
                        console.log('ok updated');
                        this.$store.commit('UpdateComputer', computer)
                        this.update = false
                        this.$store.commit('Alert', {alert: true, color: 'success', message: 'L\ordinateur a bien été mis à jour'})
                    }
                })
                
            }else{
                this.updateComputer = computer
                this.update = true
            }

        }
    }
}