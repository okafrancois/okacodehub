import './ressources.scss';
import Layout from "@components/Layout/Layout.tsx";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import userCover from '@assets/img/default-user.png';
import AddCollection from "@components/Add-Collection/add-collection.tsx";


const Ressources = () => {
    const username = useAppSelector(state => state.user.data.username)
    const userImage = useAppSelector(state => state.user.data.profilePictureUrl)

    return (
        <Layout containerClass={"ressources-view"}>
            <aside className={"ressources-view__side-menu side-nav"}>
                <Link to={"profile"} className={"side-nav__username"}>
                    <img className={"user-image"} src={userImage ?? userCover} alt=""/>
                    {username}
                </Link>
                <nav className={"sidenav"}>
                    <Link to={"/ressources"} className={"side-nav__link button --primary"}>Créer une collection</Link>
                </nav>
            </aside>
            <div className="ressources-view__content">
                <AddCollection/>
            </div>
        </Layout>
    );
}

export default Ressources;
