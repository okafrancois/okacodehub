import {FormEvent, useEffect, useRef, useState} from 'react';
import './login.scss'
import Layout from "../../components/Layout/Layout";
import {logo} from '@assets/img/iconsLib';
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logUserIn} from "../../app/func";
import {Link} from "react-router-dom";

const Login = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const logginError = useAppSelector(state => state.auth.error)
    const errorMessage = useAppSelector(state => state.auth.errorMessage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const keepLoggedInRef = useRef<HTMLInputElement>(null);
    const [passwordToggle, setPasswordToggle] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const keepLoggedIn = keepLoggedInRef.current?.checked ?? false;

        if (email && password) {
            logUserIn({email, password}, dispatch, keepLoggedIn)
        }
    }

    const togglePassword = () => {
        if (passwordRef.current) {
            passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
            setPasswordToggle(!passwordToggle);
        }
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/employees')
        }
    })

    return (
        <Layout containerClass={"login-view"} header={false}>
            <div className="login-view__headings">
                <div className="login-view__logo">
                    {logo}
                </div>
                <h1 className="login-view__title">Bienvenue sur le Hub Okacode</h1>
            </div>
            <form className="login-view__form login-form" onSubmit={handleSubmit}>
                <label className={"login-form__field email"}>
                    <span>Adresse email</span>
                    <input ref={emailRef} type="email" placeholder="Email" className={"input"}/>
                </label>
                <label className={"login-form__field"}>
                    <span>Mot de passe</span>
                    <span className={"password input"}>
                        <input type="password" placeholder="......." ref={passwordRef}/>
                        <i className={`far fa-eye${passwordToggle ? '' : '-slash'}`} onClick={togglePassword}></i>
                    </span>
                </label>
                <label className={"login-form__field keep"}>
                    <input ref={keepLoggedInRef} type="checkbox"/>
                    <span>Se souvenir de moi</span>
                </label>
                <button className={"login-form__button button --primary"}>Se connecter</button>
                {logginError && <p className={"login-form__error"}>{errorMessage}</p>}
                <div className="login-view__actions">
                    <span className={"login-view__actions__text"}>Vous n'avez pas de compte ? </span>
                    <Link to={"/signup"} className={"login-view__actions__link"}>Créer un compte</Link>
                </div>
            </form>
        </Layout>
    );
};

export default Login;
