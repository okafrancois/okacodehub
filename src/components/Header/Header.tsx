import {Link} from "react-router-dom";
import './header.scss';
import {burgerIcon, logo} from '@assets/img/iconsLib';
const Header = () => {
    const loggedIn = false

    const handleLogout = () => {
        console.log('logout')
    }

    return (
        <header className={"header-component"}>
            <div className="header-component__wrapper container">
                <Link className="header-component__logo" to={'/'}>
                    {logo}
                </Link>
                <nav className={"main-nav"}>
                    <Link className="main-nav-item" to={'/signup'}>
                        <span className={"main-nav-item__text"}>Documentation</span>
                    </Link>
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
                        <Link to={'/'} className="main-nav-item button --outline-primary" onClick={handleLogout}>Se déconnecter</Link>
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
