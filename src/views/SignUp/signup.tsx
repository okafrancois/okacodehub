import {FormEvent, useEffect, useRef, useState} from 'react';
import './signup.scss'
import Layout from "../../components/Layout/Layout";
import {logo} from '@assets/img/iconsLib';
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { signUpUser} from "../../app/func";
import {Link} from "react-router-dom";

const SignUp = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const signUpError = useAppSelector(state => state.signup.error)
    const errorMessage = useAppSelector(state => state.signup.errorMessage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rePasswordRef = useRef<HTMLInputElement>(null);
    const [passwordToggle, setPasswordToggle] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const username = usernameRef.current?.value;

        if (email && password && username) {
            signUpUser({email, password, username}, dispatch)
        }
    }

    const togglePassword = () => {
        if (passwordRef.current) {
            passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
            setPasswordToggle(!passwordToggle);
        }

        if (rePasswordRef.current) {
            rePasswordRef.current.type = rePasswordRef.current.type === 'password' ? 'text' : 'password';
            setPasswordToggle(!passwordToggle);
        }
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/employees')
        }
    })

    return (
        <Layout containerClass={"signup-view"} header={false}>
            <div className="signup-view__headings">
                <div className="signup-view__logo">
                    {logo}
                </div>
                <h1 className="signup-view__title">Bienvenue sur le Hub Okacode</h1>
            </div>
            <form className="signup-view__form login-form" onSubmit={handleSubmit}>
                <label className={"login-form__field email"}>
                    <span>Adresse email</span>
                    <input ref={emailRef} type="email" placeholder="Email" className={"input"}/>
                </label>
                <label className={"login-form__field username"}>
                    <span>Nom d'utilisateur</span>
                    <input ref={usernameRef} type="text" placeholder="Identifiant unique" className={"input"}/>
                </label>
                <label className={"login-form__field"}>
                    <span>Mot de passe</span>
                    <span className={"password input"}>
                        <input type="password" placeholder="......." ref={passwordRef}/>
                        <i className={`far fa-eye${passwordToggle ? '' : '-slash'}`} onClick={togglePassword}></i>
                    </span>
                </label>
                <label className={"login-form__field"}>
                    <span>Répéter le mot de passe</span>
                    <span className={"password input"}>
                        <input type="password" placeholder="......." ref={rePasswordRef}/>
                        <i className={`far fa-eye${passwordToggle ? '' : '-slash'}`} onClick={togglePassword}></i>
                    </span>
                </label>
                <button className={"login-form__button button --primary"}>Créer un compte</button>
                {signUpError && <p className={"login-form__error"}>{errorMessage}</p>}
                <div className="signup-view__actions">
                    <span className={"signup-view__actions__text"}>Vous avez déjà un compte ? </span>
                    <Link to={"/login"} className={"signup-view__actions__link"}>Se connecter</Link>
                </div>
            </form>
        </Layout>
    );
};

export default SignUp;
