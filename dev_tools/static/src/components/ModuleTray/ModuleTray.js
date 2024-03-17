/** @odoo-module **/

import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Component, useState } from "@odoo/owl";
import {getCookie, setCookie, deleteCookie} from 'web.utils.cookies';
var session = require('web.session');


export class ModuleTrayComponent extends Component {
    /* Class representation of the custom Module Tray tool used for both un/installing and upgrading desired modules via the system tray. */

    setup() {
        /* Constrtuctor for Custom Module Tray Component. */
        this.orm = useService("orm");
        this.state = useState({'ModuleTrayService': useService("ModuleTrayService")});
        this.notification = useService("notification");
        // this.testFunc(); // Solely for testing purposes
    };

    async upgradeModule(element, module){
        /* Callback for upgrading a desired module. Also alerts user after a successfull upgrade based on user preference. 
            Failed upgrades are notifed via conventional method, aka pink-screen */

        $('.tool_status').css({'background-color': '#f6f618', 'display': 'inline-block', 'animation': 'pulse_yellow 2s infinite'});
        await this.state.ModuleTrayService.upgradeModule(module.id)

        var tool_configs = this.state.ModuleTrayService.tool_configs
        if (['temporary_sticky', 'persistent_sticky'].includes(tool_configs.upgrade_success_alert_style)){
            var message = 'Hello There'
            var sticky_style = tool_configs.upgrade_success_alert_style === 'persistent_sticky' ? true : false 
            this.notification.add(`${message}`, {title: `"${module.name}" upgraded successfully`, type: "success", sticky: sticky_style,});
        } else if (tool_configs.upgrade_success_alert_style === 'systray_icon'){
            $('.tool_status').css({'background-color': '#00ff01', 'display': 'inline-block', 'animation': 'pulse_green 2s infinite'});
        }
    };

    async updateState(element, module){
        /* Callback for module in/uninstall. Updates state afterwards to re-rerender component.*/
        await this.state.ModuleTrayService.updateModuleState(module)
        this.state.ModuleTrayService.modules.find(mod => mod.id === module.id).state = module.state === 'installed' ? 'uninstalled' : 'installed'
    };

    async testFunc(ev){
        /* Test Method. */
        console.log('TestFunc Running')
    }

}


// Define object for ModuleTrayComponent and insert into systemtray
ModuleTrayComponent.template = "dev_tools.ModuleTray";
ModuleTrayComponent.components = { Dropdown, DropdownItem };
export const ModuleTrayObj = {
    Component: ModuleTrayComponent,
};
registry.category("systray").add("ModuleTrayObj", ModuleTrayObj, { sequence: 2 });
