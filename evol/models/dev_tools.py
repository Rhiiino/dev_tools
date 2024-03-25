from odoo import api, fields, models
from odoo.exceptions import UserError


class DevTools(models.Model):
    """Extention of class representation of the custom model 'Dev Tools'. """
    
    _inherit = 'dev.tools'


    # Test variables
    test_bool = fields.Boolean()
    test_char = fields.Char()
    test_text = fields.Text()
    test_integer = fields.Integer()
    # test_one2many = fields.One2many('ir. .module')
    # test_many2one = fields.Many2one('ir.module.module')
    # test_many2many = fields.Many2many('ir.module.module')

