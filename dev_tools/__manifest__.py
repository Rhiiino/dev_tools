# -*- coding: utf-8 -*-
{
    'name': "Dev Tools",
    'summary': """A toolkit designed to streamline development for odoo developers.""",
    'description': """Dev Tools Module.""",
    'author': "Midhun Raj",
    'category': 'None',
    'version': '0.1',
    "images": ["static/description/icon.png"],
    'depends': ['base', 'web_enterprise'],

    'data': [
        'security/ir.model.access.csv',
        'views/ir_module_module.xml',
        'views/dev_tools.xml',
        'data/main_tool.xml'
    ], 

    'assets': {
        'web.assets_backend': [
            'dev_tools/static/src/components/ModuleTray/*',      # Module tray tool
        ]
    },

    'installable': True,
}
