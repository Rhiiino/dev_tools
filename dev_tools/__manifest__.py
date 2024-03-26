# -*- coding: utf-8 -*-
{
    'name': "Dev Tools",
    'summary': """A toolkit designed to streamline development for odoo developers.""",
    'description': """Dev Tools Module.""",
    'author': "Midhun Raj | Rhiiino@github.com",
    'category': 'None',
    'version': '0.1',
    "images": ["static/description/icon.png"],
    'depends': ['base', 'web_enterprise', 'resource'],

    'data': [
        'security/ir.model.access.csv',

        # -- Views
        'views/ir_module_module.xml',
        'views/dev_tools.xml',

        # -- Data
        'data/main_dev_tool.xml',
        'data/reusable_server_action.xml'
    ], 


    'assets': {
        'web.assets_backend': [
            'dev_tools/static/src/components/ModuleTray/*',        # Module tray tool
            'dev_tools/static/src/components/InputShell/*',        # Input shell tool
            'dev_tools/static/src/components/GlassSticky/*',       # Glass Sticky tool
            'dev_tools/static/src/components/TechPeek/*',          # Glass Sticky tool
            'dev_tools/static/src/components/HoverBar/*',          # StatTray tool
        ]
    },

    'installable': True,
}
