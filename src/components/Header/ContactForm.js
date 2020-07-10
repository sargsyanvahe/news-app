import React from "react";

class ContactForm extends React.PureComponent {
    state = {
        fields: {
            name: '',
            email: '',
            text: ''
        },
        errorsFields: {},
        submited: false
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState(state => ({
            ...state,
            fields: {
                ...state.fields,
                [name]: value
            }
        }))

    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { fields } = this.state;
        const errors = this.validate(fields);

        this.setState({ errorsFields: errors });

        if (Object.keys(errors).length) return;

        this.setState({ submited: true });
        setTimeout(() => this.props.handleCloseForm(), 1000)
    };

    validate = (fields) => {

        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        let errors = {};

        for (const el in fields) {
            if (!fields[el]) {
                errors[el] = 'Please fill field';
            }

            if (el === 'email' && fields[el] && !validEmailRegex.test(fields[el])) {
                errors[el] = 'Not Valid Email'
            }

        }
        return errors;
    };

    render() {

        const { name, email, text } = this.state.fields;
        const { errorsFields, submited } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className='form'>
                <input type="text" placeholder='Name' value={name} name='name' onChange={this.handleChange}/>
                <span>{errorsFields.name}</span>
                <input type="text" placeholder='Email' value={email} name='email' onChange={this.handleChange}/>
                <span>{errorsFields.email}</span>
                <textarea name='text' placeholder='Message' value={text} onChange={this.handleChange}/>
                <span>{errorsFields.text}</span>
                <div>
                    <button className='btn' onClick={this.handleSubmit}
                            disabled={submited}>{submited ? 'Submitted' : 'Submit'}</button>
                    <button className='btn' onClick={this.props.handleCloseForm}>Close</button>
                </div>
            </form>
        )
    }
}

export default ContactForm