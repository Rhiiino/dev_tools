/** @odoo-module **/
import { registry } from "@web/core/registry";


export class ModuleTrayManager {
    /* Class representation of the Module Tray tool's service class. */

    constructor(env, { orm }) {
        /* Constructor for ModuleTrayManager class, representing the Module Tray object. */
        this.env = env;
        this.orm = orm;
        this.initialize()   // Call to set class variables
    }

    async initialize(){
        /* Called in class constructor to set class variables, to be later used for ModuleTray component. */
        var response = await this.orm.call('dev.tools', 'initialize_module_tray_variables', [[]], {});
        this.modules = response.modules
        this.tool_configs = response.tool_configs
    }

    async upgradeModule(module_id){
        /* Callback for upgrading modules via the Module Tray tool. */
        await this.orm.call('ir.module.module', 'button_immediate_upgrade', [module_id], {});
    }

    async updateModuleState(module){
        /* Callback for un/installing modules via the Module Tray tool. */
        // await this.orm.call('dev.tools', 'update_module_state', [], {'module_id': module.id});
        console.log('TODO: Implement module un/install logic.')
    }
}



// Define object for ModuleTrayComponent and register as service
export const ModuleTrayService = {
    dependencies: ["orm"],  // How you import dependencies in a service variable
    async start(env, { orm }) {
        /* Driver method for service which returns a class object to run service actions. */
        return new ModuleTrayManager( env,{ orm })
    },
}
registry.category("services").add("ModuleTrayService", ModuleTrayService);
