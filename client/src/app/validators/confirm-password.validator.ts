import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string)=>{
    return(FormGroup: FormGroup)=>{
        let control = FormGroup.controls[controlName];
        let matchingControl = FormGroup.controls[controlNameToMatch];

        if(matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']){
            return;
        }

        if(control.value !== matchingControl.value){
            matchingControl.setErrors({confirmPasswordValidator: true});
        }else{
            matchingControl.setErrors(null);
        }
    }
}