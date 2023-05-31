import './add-collection.scss';
import {useRef} from "react";


const AddCollection = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    return (
        <form className={"add-collection form"}>
            <label className="form-field__label">
                <span>Nom de la collection</span>
                <input ref={titleRef} type="text" required className="form-field__input" placeholder={"Ex: Firebase"}/>
            </label>
            <label className="form-field__label">
                <span>Description</span>
                <textarea ref={descRef} className="form-field__input" placeholder={"Ajoutez une description ici ..."}></textarea>
            </label>
            <div className="add-collection__actions">
                <button className="add-collection__cancel button --outline-danger">Annuler</button>
                <button className="add-collection__cancel button --success">Enregistrer la collection</button>
            </div>
        </form>
    );
}

export default AddCollection;
