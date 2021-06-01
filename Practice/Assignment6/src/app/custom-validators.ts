import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidator {
    static invalidName(control: FormControl) : {[s:string]: boolean}{
        if (control.value === 'Test'){
            return {'invalidName': true};
        }
        return null;
    }

    static asynInvalidName(control: FormControl) : Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'Test1'){
                    resolve({'invalidName': true})
                }
                resolve (null);
            }, 1000)

        })
        return promise;
    }
}