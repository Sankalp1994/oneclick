import { LightningElement, api,wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import {CurrentPageReference} from 'lightning/navigation';
import uploadAction from '@salesforce/apex/mcc_doc_ctrl.uploadAction';
export default class Mcc_doc_cmp extends LightningElement {
   @api recordId;
   @api objectApiName;
   @track src = 'https://sankalp-apps-dev-ed--c.vf.force.com/apex/mcc_doc?id=';

   @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId;
            this.src = this.src + this.recordId;
        }
    }
    hideModalBox(e) {
        // Close the modal window and display a success toast
        this.dispatchEvent(new CloseActionScreenEvent());
        
    }
    valuePassing(event){
        var textValue = this.template.querySelector('[data-id="'+'textValue'+'"]').value;
        alert('Value Passing ---> '+textValue);
        this.src = '';
        this.src = 'https://sankalp-apps-dev-ed--c.vf.force.com/apex/mcc_doc?id='+ this.recordId+ '&textValue=' + textValue;
        //alert('URL Passing---> '+this.src);
    }
    upload(event){
       
    }
}