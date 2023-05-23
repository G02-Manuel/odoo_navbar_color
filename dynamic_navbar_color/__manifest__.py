{
    "name": "Dynamic NavBar Color",
    "summary": "Odoo Community NavBar Color",
    "version": "15.0.1.0.1",
    'category': 'Tools',
    "license": "OPL-1",
    "author": "Tom Chu",
    "support": "odoo.tomchuu@gmail.com",
    "depends": [
        'web',
    ],

    'assets': {
        'web.assets_common': {
            '/dynamic_navbar_color/static/src/scss/style.scss'
        },
        'web.assets_backend': {
            '/dynamic_navbar_color/static/src/js/navbar.js'
        },
        'web.assets_qweb': {
            '/dynamic_navbar_color/static/src/xml/*.xml'
        }
    },
    "images": ['static/description/banner.gif'],
    "application": True,
    "installable": True,
    "auto_install": False,
}
