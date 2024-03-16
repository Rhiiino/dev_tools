from odoo import api, fields, models
from odoo.exceptions import UserError


class DevTools(models.Model):
    """Original class representation of the custom model 'Dev Tools'. """
    
    _name = 'dev.tools'
    _description = 'Dev Tools'

    # General fields
    name = fields.Char()

    # Tool toggles
    module_tray_active = fields.Boolean(string='Module Tray', help='Enables a dropdown tray in system tray containing desired modules, allowing quick upgrade functionality.')

    # Module tray fields
    quick_upgradable_module_ids = fields.Many2many('ir.module.module', string='Modules', help='Specfies modules which can be accessible through the module tray.')
    upgrade_success_alert_style = fields.Selection(
        selection=[
            ("persistent_sticky", "Persistent Sticky"),
            ("temporary_sticky", "Temporary Sticky"),
            ("systray_icon", "Subtle")
        ],
        help="Specifies the style in which user is alerted of module upgrade status."
    )
    enable_humor = fields.Boolean(help='Drives the presense of humorous messages on module upgrade success stickies.')



    # ------ Base/Extended methods ------
    @api.model_create_multi
    def create(self, vals):
        """Extension of the base create method."""

        res = super().create(vals)
        # Set show_in_dev_tools bool on quick_upgradable_modules modules
        for rec in res.quick_upgradable_module_ids:
            rec.show_in_devtools = True
        return res

    def write(self, vals):
        """Extension of the base write method."""

        pre_quick_upgradable_module_ids = self.quick_upgradable_module_ids
        res = super().write(vals)

        # Set boolean on modules in quick_upgradable_module_ids that have not been yet set for
        for mod in self.quick_upgradable_module_ids:
            if not mod.show_in_devtools:
                mod.show_in_devtools = True

        # Unset boolean on modules which have been removed from quick_upgradable_module_ids
        for mod in pre_quick_upgradable_module_ids: 
            if mod not in self.quick_upgradable_module_ids:
                mod.show_in_devtools = False

        return res



    # ------ Custom methods ------
    # Module Tray methods
    def initialize_module_tray_variables(self):
        """Returns a list of dictionaries, each of which contain relevant data pertaining to those modules."""
        return {
            'modules': self.env['ir.module.module'].search([('show_in_devtools', '=', True)]).mapped(lambda x: {'id':x.id, 'name':x.shortdesc, 'state':x.state}),
            'tool_configs': self.env.ref('dev_tools.main_dev_tool').mapped(lambda tool: {
                'upgrade_success_alert_style': tool.upgrade_success_alert_style,
                'enable_humor': tool.upgrade_success_alert_style,
                'module_tray_active': tool.module_tray_active
                }
            )[0]
        }


    def update_module_state(self):
        """Used solely for testing"""
        # TODO: button_uninstall_wizard call is not functioning as intended. Code also needs to be restructured.
        if self.state == 'installed': 
            self.sudo().button_uninstall_wizard()

        elif self.state == 'uninstalled': 
            self.button_immediate_install()


