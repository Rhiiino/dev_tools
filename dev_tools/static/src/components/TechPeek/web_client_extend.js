/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { useService } from "@web/core/utils/hooks";
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";


patch(WebClient.prototype, "WebClientPatchTechPeek", {
    async setup(){
        /* xxx */
        this._super.apply(this, arguments); 

        // Dev Overlay vars
        this.orm = useService("orm");
        this.keyDownActive = false
        this.storedLabels = {}


        onMounted(async () => {

            // Note: Decided not to use a service for this tool since all I needed to query for was only a few values. May still create a servic in the future
            var response = await this.orm.call('dev.tools', 'initialize_tech_peek_variables', [[]], {})

            if (!response.tool_configs.tech_peek_active){return} // Simply exits if inactive

            this.keyTrigger = response.hotkeys.toggle 
            this.labelColor = response.label_color

            document.addEventListener('keydown', (ev) => {
                if (ev.key === this.keyTrigger){
                    if (!this.keyDownActive){
                        this.keyDownActive = true

                        var labels = document.querySelectorAll('label[for]'); // Select only those labels which have the for attribute set
                        for (var elem of labels){
                            var technicalName = elem.getAttribute('for')
                            this.storedLabels[technicalName] = elem.innerHTML //  Store data as technicalName : Label in dict
                            elem.textContent = technicalName // Set textContent to the techincalName 
                            if (this.labelColor){elem.style.color = this.labelColor;}

                        }

                        var labels = document.querySelectorAll('th');
                        for (var elem of labels){
                            var technicalName = elem.getAttribute('data-name')
                            this.storedLabels[technicalName] = elem.innerHTML //  Store data as technicalName : Label in dict
                            elem.textContent = technicalName // Set textContent to the techincalName 
                            if (this.labelColor){elem.style.color = this.labelColor;}
                        }
                    }           
                }
            })

            document.addEventListener('keyup', (ev) => {
                if (ev.key === this.keyTrigger){
                    if (this.keyDownActive){
                        this.keyDownActive = false

                        // Restore the field label for all elements which the label was changed for
                        var labels = document.querySelectorAll('label[for]');
                        for (var elem of labels){
                            if (this.storedLabels.hasOwnProperty(elem.getAttribute('for'))){
                                elem.innerHTML = this.storedLabels[elem.getAttribute('for')]
                                if (this.labelColor){elem.style.color = 'black';}
                            }
                        }

                        var labels = document.querySelectorAll('th');
                        for (var elem of labels){
                            if (this.storedLabels.hasOwnProperty(elem.getAttribute('data-name'))){
                                elem.innerHTML = this.storedLabels[elem.getAttribute('data-name')]
                                if (this.labelColor){elem.style.color = 'black';}
                            }
                        }
                        this.storedLabels = {}
                    }
                }
            })

        })
    },
})