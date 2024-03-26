/** @odoo-module **/
import { registry } from "@web/core/registry";


export class HoverBarManager {
    /* xxx */

    constructor(env, { orm }) {
        /* xxx */
        this.env = env;
        this.orm = orm;
        this.initialize()   // Call to set variables
    }

    async initialize(){
        /* xxx */
        var response = await this.orm.call('dev.tools', 'initialize_hover_bar_variables', [[]], {});
        this.toolConfigs = response.tool_configs
        this.moduleConfigs = response.module_configs
        this.moduleStyles = response.module_styles
    }
}



// Define service object
export const HoverBarCustom = {
    dependencies: [ "orm" ],
    async start(env, { orm }) {
        return new HoverBarManager( env,{ orm })
    },
}

// Add service to registry
registry.category("services").add("HoverBarService", HoverBarCustom);
