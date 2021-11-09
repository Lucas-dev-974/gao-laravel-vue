import axios from "axios";

export default{
    data(){
        return {
            computer_name: '',
            dialog: false,
        }
    },

    methods: {
        AddComputer(){
            axios.defaults.headers.common = {'Authorization': `bearer ${this.$store.state.UserInfos.access_token}`}
            axios.post('/api/computers/create', {name: this.computer_name})
            .then(({data}) => {
                if(data.success){
                    console.log('Ajout de l\'ordi: ', data.computer);
                    this.$store.commit('AddComputer', data.computer)
                }
            })
            console.log('Ajout ordi');
        }
    }
}