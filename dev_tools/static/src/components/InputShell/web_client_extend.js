/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { useService } from "@web/core/utils/hooks";
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";




// How to patch an existing component (Usually done for the purpose of adding methods/variables to it or to alter existing methods)
patch(WebClient.prototype, "WebClientPatch", {
    async setup(){
        /* xxx */
        this._super.apply(this, arguments); 

        this.orm = useService("orm");
        this.state = useState({'currentTrayMode': 'ORM', 'InputShellService': useService("InputShellService")})
        this.trayModes = ['ORM', 'SQL', 'SCRIBE']

        // Exit if InputShell tool is disabled
        if (!this.state.InputShellService.tool_configs.input_shell_active){return}

        // Set hotkeys
        this.shellToggleHotkey = this.state.InputShellService.hotkeys.toggle
        this.shellSubmitHotkey = this.state.InputShellService.hotkeys.submit
        this.modeCycleHotkey = this.state.InputShellService.hotkeys.mode_cycle
        this.testHotkey = 'TEST'

        
        onMounted(() => {

            // General key listener for toggling input shell (This is placed on the DOM itself)
            document.addEventListener('keydown', (ev) => {

                // For testing
                if (ev.key == this.testHotkey) {
                    this.testFunc2()
                }

                if (ev.key == this.shellToggleHotkey) {
                    ev.preventDefault()
                    var trayInput = document.querySelector('.tray-input')
                    trayInput.style.display = (trayInput.style.display == 'none') ? 'inline-block' : 'none'
                    if (trayInput.style.display == 'inline-block'){trayInput.focus(); trayInput.select();} // If tray is displayed, then place cursor on it
                }
            });


            // Manage key events for tray input (These are placed on the tray itself)
            var trayInput = document.querySelector('.tray-input')
            trayInput.onkeydown = (ev) => {

                // Manage tab pressed (Overrides default behavior to allow tabbing inside input element)
                if (ev.keyCode == 9){
                    ev.preventDefault() // Prevent default behavior (aka jumping to next element)
                    ev.currentTarget.setRangeText('  ', ev.currentTarget.selectionStart, ev.currentTarget.selectionStart, 'end') // Input spaces to represent tab input
                }

                // For mode cycle (sequentially cycles through modes)
                else if (ev.key === this.modeCycleHotkey){
                    ev.preventDefault()
                    // if (ev.currentTarget.value.length == 0){
                    // Checks if current mode which user is switching from is last in mode list, if so sets tray mode to first mode in list
                    var indexOfCurrentTrayMode = this.trayModes.indexOf(this.state.currentTrayMode)
                    this.state.currentTrayMode = this.trayModes[indexOfCurrentTrayMode] === this.trayModes[this.trayModes.length - 1] ? this.trayModes[0] : this.trayModes[indexOfCurrentTrayMode + 1]           
                }

                // For submitting tray input
                else if (ev.key === this.shellSubmitHotkey){
                    ev.preventDefault()
                    
                    // For ORM executions
                    if (this.state.currentTrayMode == 'ORM'){
                        this.executeServerAction(ev)
                    }

                    // For SQL executions
                    else if (this.state.currentTrayMode == 'SQL'){
                        this.executeQuery(ev)
                    }
                }
            }
        })
    },



    // ------------------ Input Shell Methods ------------------
    async executeServerAction(ev){
        /* xxx */
        var code = ev.currentTarget.value
        await this.orm.call('dev.tools', 'execute_server_action', [[]], {'code': code});
    },

    async executeQuery(ev){
        /* xxx */
        var query = ev.currentTarget.value
        var response = await this.orm.call('dev.tools', 'execute_sql_query', [[]], {'query': query});
        var responseString = response.result.join('\n\n')
        await this.orm.call('dev.tools', 'raise_user_error', [[]], {'message': responseString});
    },









    // ------------------ Test methods ------------------
    async testFunc2(){
        /* Only for testing */
        const someFile = "./odoo.log";
        fetch (someFile).then(response => response.text()).then((text) => {
            console.log("text", text)
        })

    },

})