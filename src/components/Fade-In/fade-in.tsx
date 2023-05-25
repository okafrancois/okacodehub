import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import './fade-in.scss';

interface FadeInProps {
    children: React.ReactNode;
    direction?: string;
    delay?: number;
}

const FadeIn = ({children, direction, delay}: FadeInProps) => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    const observer = useMemo(() => {
        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
    }, []);

    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [observer]);


    return (
        <div ref={elementRef} className={`fade-in fade-in-${direction}`} style={{
transitionDelay: `${delay}s`
        }}>
            {children}
        </div>
    );
}

FadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.string,
}

export default FadeIn;
