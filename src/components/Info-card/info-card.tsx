import PropTypes from 'prop-types';
import './info-card.scss'

const InfoCard = (props: { title: string | number, desc: string}) => {
    return (
        <div className={"info-card"}>
          <div className="info-card__info">
            <h3 className="info-card__title">{props.title}</h3>
          </div>
            <div className="info-card__desc">
                <p className="info-card__text">{props.desc}</p>
            </div>
        </div>
    );
}

InfoCard.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    desc: PropTypes.string
}

export default InfoCard;
