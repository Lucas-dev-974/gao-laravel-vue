import axios from "axios";
import ComputersList from '../../components/ComputerList.vue'
import ComputerCard  from '../../components/ComputerCard.vue'

export default {
    data(){
        return {
            dateMenu: false,
            date: new Date().toISOString().substr(0, 10),
            reload: false
        }
    },

    components:{
        ComputersList, ComputerCard
    },

    mounted(){
        this.checkLogin()
        axios.post('/api/computers/get', {date: this.date}).then(({data}) => {
            if(data.success){
                this.$store.commit('SetComputer', data.computers)
            }
        })
    },

    methods:{
        checkLogin(){
            if(this.$store.state.UserInfos){
                if(this.$store.state.UserInfos.access_token){ // Define token authorization
                    axios.defaults.headers.common = {'Authorization': `bearer ${this.$store.state.UserInfos.access_token}`}
                    axios.get('/api/auth/test-token').then(({data}) => {
                        if(data.success !== true)  window.location.href = '/login'
                    })
                } 
                else window.location.href = '/login'
            }else window.location.href = '/login'
            
        },


        initialize: function (){
            axios.post('/api/computers/get', {date: this.date})
            .then(({ data }) => {
                if(data.success){
                    this.$store.commit('SetComputer', data.computers)
                    this.reload = !this.reload
                }
            })
        },
    }
}