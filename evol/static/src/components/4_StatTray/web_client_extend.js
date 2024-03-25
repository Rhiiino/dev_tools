/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { useService } from "@web/core/utils/hooks";
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";



// How to patch an existing component (Usually done for the purpose of adding methods/variables to it or to alter existing methods)
patch(WebClient.prototype, "WebClientPatchToolPanelPatch", {
    async setup(){
        /* xxx */
        this._super.apply(this, arguments); 

        this.orm = useService("orm");
        // this.state = useState({'xxx': useService("xxx")})
        this.debugIsOn = false // Sets bool representing whether the debug is on/off

        // Set hotkeys
        this.testHotkey = ''

        onMounted(() => {

            // Mouse event listener
            document.addEventListener("mouseover", async (event) => {

                // Get element stats
                var elementStats = await this.getElementStats(event)
                // console.log(elementStats)

                // Apply to DOM
                if (elementStats){
                    Object.keys(elementStats).forEach(key => {
                        var elemId = '#' + key
                        $(elemId).text(elementStats[key])
                    })
                }
            })

            // Set debugIsOn variable
            this.setDebugIsOn()

            // General key listener for toggling input shell (This is placed on the DOM itself)
            document.addEventListener('keydown', async(ev) => {

                // xxx
                if (ev.key == this.stickyToggleHotkey) {
                    this.toggleSticky(ev)
                }
            });

        })
    },



    // ------------------ Custom Methods ------------------
    async getElementStats(ev){
        /* Checks if the element the event was triggered is appropriate */

        // Initialize vars
        var elem = ev.target
        var stats = {}

        // Reset fields
        stats['technical_name'] = ''
        stats['field_type'] = ''
        stats['model_name'] = ''

        // If regular field element
        if (elem.tagName === 'LABEL' && elem.getAttribute('for')){
            stats['technical_name'] = elem.getAttribute('for')

            // If label has sup element, extract stats from it
            if (this.debugIsOn && elem.querySelector('sup')){
                var toolTip = JSON.parse(elem.querySelector('sup').getAttribute('data-tooltip-info'))
                stats['field_type'] = toolTip.hasOwnProperty('field') && toolTip.field.hasOwnProperty('type') ? toolTip.field.type : ''
                stats['model_name'] = toolTip.hasOwnProperty('field') && toolTip.field.hasOwnProperty('relation') ? toolTip.field.relation : ''
            }
        }
        
        // If from notebook header
        else if (elem.tagName === 'SPAN' && elem.parentNode.parentNode.tagName === 'TH'){
            var thElem = elem.parentNode.parentNode
            stats['technical_name'] = thElem.getAttribute('data-name')

            // If element has tooltop element, extract stats from it
            if (this.debugIsOn && thElem.getAttribute('data-tooltip-info')){
                var toolTip = JSON.parse(thElem.getAttribute('data-tooltip-info'))
                stats['field_type'] = toolTip.hasOwnProperty('field') && toolTip.field.hasOwnProperty('type') ? toolTip.field.type : ''
                stats['model_name'] = toolTip.hasOwnProperty('field') && toolTip.field.hasOwnProperty('relation') ? toolTip.field.relation : ''
            }
        }

        return stats

    },

    async setDebugIsOn(){
        /* xxx */
        var urlArgs = new URLSearchParams(window.location.search)  
        if (urlArgs.get('debug') && urlArgs.get('debug') == 1){this.debugIsOn = true}
    },




    // ------------------ Test methods ------------------
    async xxxxxx(ev){
        /* Only for testing */ 
    },

   

})