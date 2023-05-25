import {Link} from "react-router-dom";
import './header.scss';
import {logo} from '@assets/img/iconsLib';
const Header = () => {
    const loggedIn = false

    const handleLogout = () => {
        console.log('logout')
    }

    return (
        <header className={"header-component"}>
            <nav className="main-nav container">
                <Link className="main-nav__logo" to={'/'}>
                    {logo}
                </Link>
                <nav>
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
            </nav>
        </header>
    );
};

export default Header;
