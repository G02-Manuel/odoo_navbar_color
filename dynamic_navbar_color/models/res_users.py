from odoo import models, fields


class ResUsers(models.Model):
    _inherit = 'res.users'

    navbar_color = fields.Char(default="#7C7BAD")

    def sudo_write(self, vals):
        """
        Bypass user access right
        """
        return self.sudo().write(vals)

    def sudo_read(self):
        """
        Bypass user access right
        """
        return self.sudo().read()