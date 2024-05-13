import RegisterLoginForm from "../components/RegisterAndLoginForm";

function Login(){
    document.title = "Luminous | Login"
    
    return (
        <RegisterLoginForm page="login" />
    )
}

export default Login