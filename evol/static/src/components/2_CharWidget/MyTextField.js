/** @odoo-module */

import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { Component, xml } from "@odoo/owl";
import { registry } from "@web/core/registry";

// Description: This component defines a widget by extending the base Component.
// ...which can be used with the char field type in views to alter its appearance

export class MyTextField extends Component {

    /**
    * @param {boolean} newValue
    */
    onChange(newValue) {
        /* Callback for input field update, which updates the value of the component whenever the input is changed. */
        this.props.update(newValue);
    }
}

// Define the template
MyTextField.template = xml`
    <input t-att-id="props.id" t-att-value="props.value" onChange.bind="onChange" />
`;

MyTextField.props = {
    ...standardFieldProps,
};
MyTextField.supportedTypes = ["char"];

registry.category("fields").add("my_text_field_widget", MyTextField);