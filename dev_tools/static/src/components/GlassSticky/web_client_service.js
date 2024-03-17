/** @odoo-module **/
import { registry } from "@web/core/registry";


export class GlassStickyManager {
    /* xxx */

    constructor(env, { orm }) {
        /* xxx */
        this.env = env;
        this.orm = orm;
        this.initialize()   // Call to set variables
    }

    async initialize(){
        /* xxx */
        var response = await this.orm.call('dev.tools', 'initialize_glass_sticky_variables', [[]], {});
        this.hotkeys = response.hotkeys
        this.tool_configs = response.tool_configs
    }

    async saveStickyInput(input){
        /* xxx */
        await this.orm.call('dev.tools', 'save_sticky_input', [[]], {'input': input});

    }
}



// Define service object
export const GlassStickyCustom = {
    dependencies: [ "orm" ],
    async start(env, { orm }) {
        return new GlassStickyManager( env,{ orm })
    },
}

// Add service to registry
registry.category("services").add("GlassStickyService", GlassStickyCustom);
