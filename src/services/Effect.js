import Param from './Param';
import { colors } from '../constants/theme';

class Effect {
    constructor({
        title = 'effect', 
        subtitle = 'a new effect', 
        isActive = true, 
        description = 'a goofy write-up', 
        params = [], 
        borderColor = colors.a, 
        fillColor = colors.a40, 
        activeColor = colors.a80, 
        previewImage = null, 
        processingFunction = defaultProcessingFunction
    }){
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.isActive= isActive;
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.activeColor = activeColor;
        this.previewImage = previewImage;
        this.processingFunction = processingFunction;
        this.params = {};
        Object.keys(params).forEach(key => {
            this.params[key] = [];
            params[key].forEach(param => {
                this.params[key].push(new Param({type: key, ...param}));
            })
        })
    }
}

// spit out the same input you received
const defaultProcessingFunction = () => {

};

export default Effect;