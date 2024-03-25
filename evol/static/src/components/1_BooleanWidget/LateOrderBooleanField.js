/** @odoo-module **/
import { registry } from "@web/core/registry";
import { BooleanField } from "@web/views/fields/boolean/boolean_field";
import { Component, xml } from "@odoo/owl";

// Description: This component defines a widget by extending the base BooleanField component.
// ...which can be used with the boolean field type in views to alter its appearance

class LateOrderBooleanField extends BooleanField {}
LateOrderBooleanField.template = "dev_tools.LateOrderBooleanField";


registry.category("fields").add("late_boolean_widget", LateOrderBooleanField);
