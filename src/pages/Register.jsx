import RegisterLoginForm from "../components/RegisterAndLoginForm"

function Register(){
    document.title = "Luminous | Sign up"

    return (
        <RegisterLoginForm page="register" />
    )
}

export default Register