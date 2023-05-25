import './layout.scss'
import Header from '@components/Header/Header';
import Footer from "@components/Footer/Footer.tsx";
import PropTypes from "prop-types";
import React from "react";

// generate props interface

interface LayoutProps {
    children: React.ReactNode;
    containerClass?: string;
    header?: boolean;
    footer?: boolean;
}
const Layout = ({children, containerClass, header = true, footer = true}: LayoutProps) => {
    return (
        <div className={`app`}>
            {header && <Header/>}
            <main className={`${containerClass}`}>
                {children}
            </main>
            {footer && <Footer/>}
        </div>
    );
};

// generate props-types

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    containerClass: PropTypes.string,
    header: PropTypes.bool,
    footer: PropTypes.bool,
}

export default Layout;
