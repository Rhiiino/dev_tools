/** @odoo-module **/
import { registry } from "@web/core/registry";


export class InputShellManager {
    /* xxx */

    constructor(env, { orm }) {
        /* xxx */
        this.env = env;
        this.orm = orm;
        this.initialize()   // Call to set variables
    }

    async initialize(){
        /* xxx */
        var response = await this.orm.call('dev.tools', 'initialize_input_shell_variables', [[]], {});
        this.hotkeys = response.hotkeys
    }

}





// Define service object
export const InputShellCustom = {
    dependencies: [ "orm" ],
    async start(env, { orm }) {
        return new InputShellManager( env,{ orm })
    },
}

// Add service to registry
registry.category("services").add("InputShellService", InputShellCustom);
