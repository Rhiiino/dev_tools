from odoo import api, fields, models
from odoo.exceptions import UserError

import logging

_logger = logging.getLogger(__name__)


class IrModuleModule(models.Model):
    """Original definition of model notification.item."""

    _inherit = 'ir.module.module'

    # Custom fields
    show_in_devtools = fields.Boolean(help="Specifies whether or not module should populate in dev tools.")


    # ------ Base/Extended methods ------
    @api.model_create_multi
    def create(self, vals):
        """Extension of the base create method."""
        res = super().create(vals)

        # Set show_in_dev_tools bool on quick_upgradable_modules modules
        if res.show_in_dev_tool:
            self.env.ref('dev_tools.main_dev_tool').quick_upgradable_module_ids += res

        return res

    def write(self, vals):
        """Extension of the base write method."""
        res = super().write(vals)

        if vals.get('show_in_devtools'):
            main_tool_modules = self.env.ref('dev_tools.main_dev_tool').quick_upgradable_module_ids
            if self.show_in_devtools:
                self.env.ref('dev_tools.main_dev_tool').quick_upgradable_module_ids += self
            else: # TODO: Successfully remove modules from dev_tools m2m field
                self.env.ref('dev_tools.main_dev_tool').quick_upgradable_module_ids -= self

        return res

