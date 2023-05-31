import {Link} from "react-router-dom";
import './header.scss';
import {burgerIcon, logo} from '@assets/img/iconsLib';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logUserOut} from "../../app/func.ts";
import React, {useRef} from "react";

const Header = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const dispatch = useAppDispatch()
    const userMenuRef: React.MutableRefObject<any> = useRef(null)

    const handleLogout = () => {
        logUserOut(dispatch)
    }

    const handleToggleMenu = () => {
        userMenuRef.current.classList.toggle('active')
    }

    return (
        <header className={"header-component"}>
            <div className="header-component__wrapper container">
                <Link className="header-component__logo" to={'/'}>
                    {logo}
                </Link>
                <nav className={"main-nav"}>
                    <a href={"#"} className="main-nav-item">
                        <span className={"main-nav-item__text"}>Documentation</span>
                    </a>
                    {
                        !loggedIn &&
                        <Link className="main-nav-item button --outline-primary" to={'/login'}>
                            <span className={"main-nav-item__text"}>Se connecter</span>
                        </Link>
                    }
                    {
                        !loggedIn &&
                        <Link className="main-nav-item button --primary" to={'/login'}>
                            <span className={"main-nav-item__text"}>Créer un compte</span>
                        </Link>
                    }
                    {
                        loggedIn &&
                        <div className="main-nav__logged-in user-menu">
                            <button className={"user-menu__notifs"}>
                                <i className={"fa fa-bell"}></i>
                            </button>
                            <button className={"user-menu__toggle"} onClick={handleToggleMenu}>
                                <i className={'fa fa-user'}></i>
                            </button>
                            <div className="user-menu__wrapper" ref={userMenuRef}>
                                <Link to={'/ressources'} className="main-nav__logged-in-link">
                                    <span className="main-nav__logged-in-text">Ressources</span>
                                </Link>
                                <Link to={'/profile'} className="main-nav__logged-in-link">
                                    <span className="main-nav__logged-in-text">Profil</span>
                                </Link>
                                <Link to={'/'} className="main-nav-item button --outline-primary" onClick={handleLogout}>Se déconnecter</Link>
                            </div>
                        </div>
                    }
                </nav>
                <button className={"header-component__menu-toggle"}>
                    {burgerIcon}
                </button>

            </div>
        </header>
    );
};

export default Header;
