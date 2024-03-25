/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { FormRenderer } from "@web/views/form/form_renderer"
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";



// Description: xxx
/*
    xxx
*/



patch(FormRenderer.prototype, "FormRendererPatch", {

    async setup(){
        /* xxx */
        this._super.apply(this, arguments);
        this.debugIsOn = false // Sets bool representing whether the debug is on/off

        console.log('FormRenderer patch ...')

        // Get all relational fields from record.activeFields
        // Obtain the ID of those fields from record.data
        // Search and insert those IDs into their respective elements through DOM

        onMounted(() => {


            // Set debugIsOn variable
            this.setDebugIsOn()
            if (!this.setDebugIsOn){return}

            // 1. Construct list of m2o fields
            var activeFields = this.props.archInfo.activeFields
            var many2oneFields = []
            Object.keys(activeFields).forEach(field => {
                var fieldProps = activeFields[field]
                if (fieldProps.hasOwnProperty('FieldComponent') && fieldProps.FieldComponent.hasOwnProperty('supportedTypes') && fieldProps.FieldComponent.supportedTypes.includes('many2one')){
                    many2oneFields.push({'name': field})
                }
            });

            // 2. Get/Store ID of all those identified fields
            var formData = this.props.record.data
            // console.log(formData)
            for (var field of many2oneFields){
                field.id = formData[field.name] ? formData[field.name][0] : false
            }

            // 3. Insert ID into appropriate element/attributes in DOM
            var labels = document.getElementsByTagName('label');
            for (var elem of labels){
                    console.log(Object.keys(many2oneFields))
                if (elem.hasOwnProperty('for') && Object.keys(many2oneFields).includes(elem.for)){
                }
            }



        })

    },

    async setDebugIsOn(){
        /* xxx */
        var urlArgs = new URLSearchParams(window.location.search)  
        if (urlArgs.get('debug') && urlArgs.get('debug') == 1){this.debugIsOn = true}
    },

})