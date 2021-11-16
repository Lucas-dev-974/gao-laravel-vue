import axios from "axios";
import ComputerCard  from '../../components/ComputerCard.vue'
import AddComputer   from '../../components/AddComputer.vue'

export default {
    data(){
        return {
            dateMenu: false,
            date: new Date().toISOString().substr(0, 10),
            reload: false
        }
    },

    components:{
        ComputerCard, AddComputer
    },

    mounted(){
        this.checkLogin()
        axios.get('/api/computers/' + this.date).then(({data}) => {
            this.$store.commit('SetComputer', data.computers)
        }).catch(error => {
            this.$store.commit({alert: true, message: error.message, color: 'error'})
        })
    },

    methods:{
        checkLogin(){
            if(this.$store.state.UserInfos){
                if(this.$store.state.UserInfos.access_token){ // Define token authorization
                    axios.defaults.headers.common = {'Authorization': `bearer ${this.$store.state.UserInfos.access_token}`}
                    axios.get('/api/auth/').then(({data}) => {
                        if(data.success !== true)  window.location.href = '/login'
                    })
                } 
                else window.location.href = '/login'
            }else window.location.href = '/login'
            
        },


        initialize: function (){
            axios.post('/api/computers/', {date: this.date})
            .then(({ data }) => {
                if(data.success){
                    this.$store.commit('SetComputer', data.computers)
                    this.reload = !this.reload
                }
            })
        },
    }
}