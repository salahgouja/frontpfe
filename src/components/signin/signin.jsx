import axios from "axios";
import React, { useState } from 'react';
import Footer from "../common/footer/Footer";
import Header from "../common/header/Header";
import Back from "./back/back";
import * as Components from './Components';

function Sign() {
    const [signIn, toggle] = React.useState(true);
    const [Name,setName]=React.useState("");
    const [email,setemail]=React.useState("");
    const [telephone,settelephone]=React.useState("");
    const [mdp,setmdp]=React.useState("");
    const [Cmdp,setCmdp]=React.useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handelchangName=(e)=>{
       setName(e.target.value);
    }
    const handelchangEamail=(e)=>{
        setemail(e.target.value);
     }
     const handelchangePassword=(e)=>{
        setmdp(e.target.value);
     }
     const handelchangePhone=(e)=>{
        settelephone(e.target.value);
     }
     const handelchangeconfirmPassord=(e)=>{
        setCmdp(e.target.value);
     }
    
     const inscrire=async(e)=>{
        e.preventDefault();
        try {
           const res=await axios.post("http://localhost:8000/api/v1/auth/signup",{
            name:Name,
            email:email,
            phoneNumber : telephone ,
            password : mdp ,
            passwordConfirm :Cmdp
           }) 
           if(res.status===201){
            console.log("success");
          
           }
        } catch (error) {
            console.log(error)
        }
     }

     const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // Effectuer la requête de connexion à l'API
          const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
            email: email,
            password: mdp
          });
    
          if (res.status === 200) {
            const token = res.data.token; // Récupérer le jeton d'authentification du back-end
            const userRole = res.data.data.role; // Récupérer le role de l'utilisateur du back-end
            const userId = res.data.data._id ;
            const userName = res.data.data.name;
            const userEmail = res.data.data.email;
            const userPhone = res.data.data.phoneNumber ;
            const userPassword = res.data.data.password ;
            const conservatoire = res.data.data.conservatoire ;
            // Enregistrer le jeton et le role de l'utilisateur dans le stockage local ou les cookies
            setIsLoggedIn(true);
            localStorage.setItem('token', token);
            localStorage.setItem('UserRole', userRole);
            localStorage.setItem('UserName',userName);
            localStorage.setItem('UserEmail',userEmail);
            localStorage.setItem('UserPhone', userPhone);
            localStorage.setItem('UserPassword', userPassword); 
            localStorage.setItem('conservatoire', conservatoire); 
            localStorage.setItem('UserId',userId); 
       if (token && userRole==="superadmin") {
        alert("Login réussi");
        window.location.href = "dashboard";
       } else if(token && userRole==="conservatoire"){
        alert("Login réussi");
        window.location.href = "dashboard";
       }else{
        alert("Login réussi");
        window.location.href = "/";
       }
       
        
          }
        } catch (error) {
          console.log(error);
        }
      };
    
   
      

    return (
        <>
            <Header/>
            <Back />
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Créer un compte</Components.Title>
                        <Components.Input type='text'  name="Name" placeholder='Nom' onChange={handelchangName} />
                        <Components.Input type='email' name="email" placeholder='Email' onChange={handelchangEamail} />
                        <Components.Input type='number' name="telephone" placeholder='Telephone' onChange={handelchangePhone}  />
                        <Components.Input type='password' name="mdp" placeholder='Mot de passe' onChange={handelchangePassword}/>
                        <Components.Input type='password' name="Cmdp" placeholder='Confirmer le mot de passe' onChange={handelchangeconfirmPassord} />
                        <Components.Button onClick={inscrire}>S'inscrire</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Se connecter</Components.Title>
                        <Components.Input type='email' name="name" placeholder='Email' onChange={handelchangEamail} />
                        <Components.Input type='password' name="password" placeholder='Mot de passe' onChange={handelchangePassword} />
                        <Components.Anchor href='#'>Mot de passe oublié ?</Components.Anchor>
                        <Components.Button onClick={handleLogin}>Se connecter</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Bienvenue de retour !</Components.Title>
                            <Components.Paragraph>
                                Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Se connecter
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Bonjour, ami !</Components.Title>
                            <Components.Paragraph>
                                Entrez vos informations personnelles et commencez votre voyage avec nous.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                S'inscrire
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>

            <Footer/>
        </>
    )
}

export default Sign