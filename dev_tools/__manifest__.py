# -*- coding: utf-8 -*-
{
    'name': "Dev Tools",
    'summary': """A toolkit designed to streamline development for odoo developers.""",
    'description': """Dev Tools Module.""",
    'author': "Midhun Raj | Rhiiino@github.com",
    'category': 'None',
    'version': '0.1',
    "images": ["static/description/icon.png"],
    'depends': ['base'],


    'data': [
        'security/ir.model.access.csv',

        # -- Views
        'views/dev_tools.xml',

        # -- Data
    ], 


    'assets': {
        'web.assets_backend': [
        ]
    },



    'installable': True,
}