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
            axios.post('/api/computers/', {name: this.computer_name})
            .then(({data}) => {
                this.$store.commit('AddComputer', data.computer)
            }).catch(error => {
                this.$store.commit('Alert', {alert: true, message: error.message, color: 'error'})
            })
        }
    }
}