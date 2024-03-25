/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { FormCompiler } from "@web/views/form/form_compiler"


// Description: xxx
/*
    xxx
*/



patch(FormCompiler.prototype, "FormCompilerPatch", {

    async setup(){
        /* xxx */
        this._super.apply(this, arguments);
        // console.log('FormCompiler patch ...')
    }


})