/** @odoo-module **/
import { registry } from "@web/core/registry";


export class xxxManager {
    /* xxx */

    constructor(env, { orm }) {
        /* xxx */
        this.env = env;
        this.orm = orm;
    }

    async x(){
        /* xxx */
        // var response = await this.orm.call('dev.tools', 'initialize_glass_sticky_variables', [[]], {});

    }

    async xx(input){
        /* xxx */
        // await this.orm.call('dev.tools', 'save_sticky_input', [[]], {'input': input});

    }
}



// Define service object
export const xxxCustom = {
    dependencies: [ "orm" ],
    async start(env, { orm }) {
        return new xxxManager( env,{ orm })
    },
}

// Add service to registry
registry.category("services").add("xxxService", xxxCustom);
