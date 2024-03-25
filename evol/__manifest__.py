# -*- coding: utf-8 -*-
{
    'name': "Evol",
    'summary': """Test module to be used for the general evol process, in addition to testing and experimentation.""",
    'description': """Evol Module.""",
    'author': "Midhun Raj, @git: Rhiiino",
    'category': 'None',
    'version': '0.1',
    "images": [],
    'depends': ['base', 'web_enterprise', 'dev_tools'],

    'data': [
        # 'security/ir.model.access.csv',
        'views/dev_tools.xml'
    ], 


    'assets': {
        'web.assets_backend': [
            'evol/static/src/components/1_BooleanWidget/*',
            'evol/static/src/components/2_CharWidget/*',
            'evol/static/src/components/3_SystrayItem/*',
            'evol/static/src/components/4_StatTray/*',

            'evol/static/src/components/5_FormController/*',
            'evol/static/src/components/6_FormRenderer/*',
            'evol/static/src/components/7_FormCompiler/*'
        ]
    },

    'installable': True,
}
