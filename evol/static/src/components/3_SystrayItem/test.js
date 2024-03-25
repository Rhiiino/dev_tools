/** @odoo-module **/

import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import {getCookie, setCookie, deleteCookie} from 'web.utils.cookies';
var session = require('web.session');


export class xxxComponent extends Component {

    setup() {
        /* Constructor for Component. */
        this.orm = useService("orm");
        // this.state = useState({'xxx': useService("xxx")});
    };



    async testFunc(ev){
        /* Test Method. */
        console.log('TestFunc Running')
    }
}


// Define object for Component and insert into systemtray
xxxComponent.template = "evol.TestComp";
xxxComponent.components = { Dropdown, DropdownItem };
export const xxxObj = {
    Component: xxxComponent,
};
registry.category("systray").add("xxxObj", xxxObj, { sequence: 1000 });  // The higher the sequence number, the further left it will appear in the system tray
