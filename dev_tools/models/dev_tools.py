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
    input_shell_active = fields.Boolean(string='Input Shell', help='Embeds a hidden input shell, allowing for the use of various input modes via shell mode cycling.')
    glass_sticky_active = fields.Boolean(string='Glass Stickies', help='Allows use of configurable, on-screen sticky notes.')
    tech_peek_active = fields.Boolean(string='Tech Peek', help='Allows visuals to technical specs on every field on a given view.')
    hover_bar_active = fields.Boolean(string='Hover Bar', help='Enables a configurable dock for displaying desired field properties driven my mouse positioning.')

    # Module Tray fields
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

    # Input Shell fields
    shell_toggle_hotkey = fields.Char(string='Shell Toggle Hotkey')
    shell_submit_hotkey = fields.Char(string='Shell Submit Hotkey')
    shell_mode_cycle_hotkey = fields.Char(string='Mode Cycle Hotkey')

    # Glass Sticky fields
    sticky_toggle_hotkey = fields.Char(string='Sticky Toggle Hotkey')
    sticky_input = fields.Text(string='Saved Input')

    # Tech peek fields
    tech_peek_toggle_hotkey = fields.Char(string='Tech Peek Hotkey')
    label_color = fields.Char()

    # Hover bar methods
    enable_technical_name_module = fields.Boolean(string='Technical Name', help='xxx')
    enable_field_type_module = fields.Boolean(string='Field Type', help='xxx')
    enable_relational_model_module = fields.Boolean(string='Relational Model', help='xxx')
    technical_name_module_color = fields.Char(string="TechName Color", help='Specifies color for the technical name module in hover bar.')
    field_type_module_color = fields.Char(string="FieldType Color", help='Specifies color for the field type module in hover bar.')
    relational_model_module_color = fields.Char(string="RelModel Color", help='Specifies color for the relation model module in hover bar.')





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
        """xxxxx"""
        return {
            'modules': self.env['ir.module.module'].search([('show_in_devtools', '=', True)]).mapped(lambda x: {'id':x.id, 'name':x.shortdesc, 'state':x.state}),
            'tool_configs': self.env.ref('dev_tools.main_dev_tool').mapped(lambda tool: {
                'upgrade_success_alert_style': tool.upgrade_success_alert_style,
                'module_tray_active': tool.module_tray_active
                }
            )[0]
        }

    def update_module_state(self):
        """xxxx"""
        # TODO: button_uninstall_wizard call is not functioning as intended. Code also needs to be restructured.
        if self.state == 'installed': 
            self.sudo().button_uninstall_wizard()

        elif self.state == 'uninstalled': 
            self.button_immediate_install()
    


    # Input Shell methods
    def initialize_input_shell_variables(self):
        """xxx"""
        main_tool = self.env.ref('dev_tools.main_dev_tool')
        x = {
            'hotkeys': {'toggle': main_tool.shell_toggle_hotkey, 'submit': main_tool.shell_submit_hotkey, 'mode_cycle': main_tool.shell_mode_cycle_hotkey},
            'tool_configs': {
                'input_shell_active': main_tool.input_shell_active
            }
        }
        return x

    def execute_server_action(self, **kwargs):
        """xxx"""
        sa_rec = self.env.ref("dev_tools.dev_tools_server_action_template")
        sa_rec.code = kwargs.get('code')
        sa_rec.run()

        return {"result": 'Done'} 

    def execute_sql_query(self, **kwargs):
        """xxx"""
        self.env.flush_all()
        self.env.cr.execute(kwargs.get('query'))
        output = self.env.cr.fetchall()
        return {"result": output}

    def raise_user_error(self, **kwargs):
        """xxx"""
        raise UserError(kwargs.get('message'))
    



    # Glass sticky methods
    def initialize_glass_sticky_variables(self):
        """xxx"""
        main_tool = self.env.ref('dev_tools.main_dev_tool')
        x = {
            'hotkeys': {'toggle': main_tool.sticky_toggle_hotkey},
            'tool_configs': {
                'glass_sticky_active': main_tool.glass_sticky_active
            }
        }
        return x

    def save_sticky_input(self, **kwargs):
        """xxx"""
        main_tool = self.env.ref('dev_tools.main_dev_tool')
        if main_tool.sticky_input != kwargs.get('input'): main_tool.sticky_input = kwargs.get('input')
        return {'status': 200}
    


    # Tech peek methods
    def initialize_tech_peek_variables(self):
        """xxx"""
        main_tool = self.env.ref('dev_tools.main_dev_tool')
        return {'hotkeys': {'toggle': main_tool.tech_peek_toggle_hotkey},
                'label_color': main_tool.label_color,
                'tool_configs': {'tech_peek_active': main_tool.tech_peek_active}
                }

    

    # Hover Bar methods
    def initialize_hover_bar_variables(self):
        """xxx"""
        main_tool = self.env.ref('dev_tools.main_dev_tool')
        return {'xxxx': main_tool.label_color,
                'tool_configs': {'hover_bar_active': main_tool.hover_bar_active},
                'module_configs': {'tech_name': main_tool.enable_technical_name_module, 
                                   'field_type': main_tool.enable_field_type_module, 
                                   'rel_model': main_tool.enable_relational_model_module},
                'module_styles': {
                    'tech_name': main_tool.technical_name_module_color, 
                    'field_type': main_tool.field_type_module_color, 
                    'rel_model': main_tool.relational_model_module_color, 
                    }
                }
