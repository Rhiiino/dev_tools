from odoo import api, fields, models
from odoo.exceptions import UserError


class DevTools(models.Model):
    """Original class representation of the custom model 'Dev Tools'. """
    
    _name = 'dev.tools'
    _description = 'Dev Tools'

