odoo.define('dynamic_navbar_color.NavBar', function (require) {
"use strict";

const SystrayMenu = require('web.SystrayMenu');
const Widget = require('web.Widget');
const session = require('web.session');
const {ColorpickerDialog} = require('web.Colorpicker');

// Navbar color
var NavBarColorMenu = Widget.extend({
     template: 'NavBarColor', //provide the template name
     events: {
        'click .o_navbar_color': '_onColorClick',
     },

     custom_events: {
        'colorpicker:saved': '_onColorSaved',
    },

    sequence: 1,
    /**
     * @override
     */
    init: function () {
        this._super.apply(this, arguments);
    },

    start: function () {
        this._loadNavBarColor();
        this._super.apply(this, arguments);
    },

    _onColorClick: function () {
        const dialog = new ColorpickerDialog(this, {
            defaultColor: this.value,
            noTransparency: true,
        }).open();

        dialog.on('closed', this, () => {
            // wait for the modal to execute its whole close function.
            Promise.resolve().then(() => {
                this.getFocusableElement().focus();
            });
        });
    },

    getFocusableElement: function () {
        return this.$('.o_navbar_color');
    },

    _onColorSaved: function (ev) {
        try {
            var hex = ev.data.hex;
            this._rpc({
            model: "res.users",
            method: "sudo_write",
            args: [session.user_id, {
                navbar_color: hex
            }]
            });
            this._changeColor(hex);
        } catch (err) {
            // silently ignore RPC errors
            console.log(err);

        };
    },

    _loadNavBarColor: function () {
        var self = this;
        try {
            self._rpc({
                model: "res.users",
                method: "sudo_read",
                args: [session.user_id]
            }).then(function (result) {
                self._changeColor(result[0]?.navbar_color);
            });
        } catch (err) {
            // silently ignore RPC errors
            console.log(err);
        }

    },

    _selectedColor: function (hex) {
        this.$('.o_navbar_color').data('value', hex)
            .css('background-color', hex)
            .attr('title', 'Change color | ' + hex);
    },

    _changeColor: function(hex) {
        let style = document.createElement('style');
        style.type = 'text/css';
        let css = `
                    :root {
                        --primary-color: #7C7BAD !important;
                    }
                        `;
        if (hex) {
            css = `
                    :root {
                        --primary-color: ${hex} !important;
                    }
                   `;
            this._selectedColor(hex);
        }

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    }
});

SystrayMenu.Items.push(NavBarColorMenu); //add icon to the SystrayMenu

return NavBarColorMenu; //return widget

});