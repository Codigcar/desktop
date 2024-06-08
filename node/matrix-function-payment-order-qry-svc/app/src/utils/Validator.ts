import { injectable } from 'inversify';

@injectable()
export class Validator {
    isObject(data){
        return typeof data == "object";
    }
    checkObject(data){
        if(!this.isObject(data)){
            throw(new Error(`Received data is not an object: ${data}`));
        }
    }
    checkReference(data){
        if(typeof data != "string"){
            throw(new Error(`reference is not an string: ${data}`));
        }
        if(data.length > 32){
            throw (new Error(`reference is too long: ${data}`));
        }
    }
}
