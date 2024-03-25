/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onRendered, onMounted, loadFile } from "@odoo/owl";

// Testing
import { browser } from "@web/core/browser/browser";
import { useHotkey } from "@web/core/hotkeys/hotkey_hook";
var session = require('web.session');





export class TestComp extends Component {
    setup(){
        /* xxx */

        this.orm = useService("orm");
        this.state = useState({})
 


        onMounted(() => {

            // General key listener for de/activating input shell
            document.addEventListener('keydown', (ev) => {
                console.log('Test key pressed: ', ev.key)

                // For testing
                // if (ev.key == this.testHotkey) {
                //     this.testStuff()
                // }

            });

        
        })
    }

    // ------------------ Test methods ------------------
    async testStuff(){
        /* Only for testing */
     console.log("T1")

    }

}




TestComp.template = "dev_tools.TestComp";
// or 
// TestComp.template = xml
//     `<div t-on-click="testStuff">
//     </div>`;


export const TestCompObj = {
    Component: TestComp,
};

// registry.category("systray").add("TestCompObj", TestCompObj, { sequence: 2 });
