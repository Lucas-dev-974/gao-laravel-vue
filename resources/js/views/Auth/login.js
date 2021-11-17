import axios from 'axios'

export default{

    
    data(){
        return {
            email: "",
            emailRules: [
                v => !!v || 'L\'email est requis',
                v => /.+@.+/.test(v) || 'l\'email est requis',
              ],
            password: "",
            passwordRules: [
                v => !!v || 'Le mot de passe est requis',
                v => v.length >= 6 || 'Le mot de passe doit comporter au moin 6 charactère',
              ],
        }
    },

    mounted(){
        
    },

    methods: {
        login(){
            if(this.email != "" && this.password!= ""){
                axios.post('//gao-lara-vue.herokuapp.com/api/auth/', {email: this.email, password: this.password})
                .then(({data}) => {
                    console.log(data);
                    if(data.success === false){
                        this.$store.commit('Alert', {alert: true, color: 'red', message: data.message})
                    }else{
                        this.$store.commit('SetUser', data)
                        window.location.href = '/'
                    }
                })
            }else{

            }
        }
    }
}