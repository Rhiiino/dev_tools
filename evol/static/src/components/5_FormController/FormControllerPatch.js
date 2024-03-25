/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { FormController } from "@web/views/form/form_controller"
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";


// Description: xxx
/*
    xxx
*/



patch(FormController.prototype, "FormControllerPatch", {

    async setup(){
        /* xxx */
        this._super.apply(this, arguments);
        // console.log('FormController patch ...')

        // console.log('archInfo: ', this.archInfo)

        onMounted(() => {
            // console.log('yessss')
        })
    }


})