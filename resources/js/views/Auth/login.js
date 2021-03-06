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
                let loginurl = document.getElementById('authLoginUrl').getAttribute('data-url')
                console.log(loginurl);
                axios.post(loginurl + '/', {email: this.email, password: this.password})
                .then(({data}) => {
                    console.log(data);
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