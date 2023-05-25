import './home.scss'
import Layout from "@components/Layout/Layout";
import {Link} from "react-router-dom";
import bannerCover from '@assets/img/banner-cover.png';
import contentCover from '@assets/img/teleportation-cover.png';
import InfoCard from "@components/Info-card/info-card.tsx";
import FadeIn from "@components/Fade-In/fade-in.tsx";

const Home = () => {
    const datas = [
        {
            title: 1598,
            desc: "Ressources ajoutées par les utilisateurs"
        },
        {
            title: 392,
            desc: "Collections de ressources créées"
        },
        {
            title: 25,
            desc: "Collections de ressources en public"
        }
    ]

    return (
        <Layout  containerClass={"home-view container"}>
            <div className="home-view__banner">
                <div className="home-view__banner-wrapper">
                    <div className="home-view__left">
                        <FadeIn direction={"up"}>
                            <h1 className="home-view__title t-header-xlarge">Découvrir <br/>Okacode Hub</h1>
                        </FadeIn>
                        <FadeIn direction={"up"} delay={0.2}>
                            <p className="home-view__text t-base-large">
                                Partagez des ressources avec la communauté et découvrez de nouveaux concepts, approfondissez vos connaissances et facilitez vos recherches.
                            </p>
                        </FadeIn>
                        <div className="home-view__buttons">
                            <FadeIn direction={"up"} delay={0.4}>
                                <Link className="home-view__cta button --primary" to={'/login'}>Parcourir les ressources</Link>
                            </FadeIn>
                        </div>
                    </div>
                    <div className="home-view__right">
                        <div className="home-view__right-wrapper">
                            <FadeIn direction={"up"}>
                                <img src={bannerCover} alt="Network peoples"/>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-view__content">
                <div className="home-view__content-left">
                    <img src={contentCover} alt="teleportation man"/>
                </div>
                <div className="home-view__content-right">
                    <div className="home-view__content-wrapper">
                        {
                            datas.map((data, index) => {
                                return (
                                    <FadeIn direction={"up"} delay={index * 0.1}>
                                        <InfoCard key={index} title={data.title} desc={data.desc}/>
                                    </FadeIn>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
