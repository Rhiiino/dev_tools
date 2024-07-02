/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { FormController } from "@web/views/form/form_controller"



patch(FormController.prototype, "FormControllerPatch", {

    async setup(){
        /* xxx */
        this._super.apply(this, arguments);
        console.log('FormController patch running...')

        // console.log('archInfo: ', this.archInfo)

    }


})