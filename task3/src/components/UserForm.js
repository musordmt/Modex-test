import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button } from 'react-bootstrap';

const UserForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("required"),
        email: Yup.string().email(`You have enter an invalid email address`).required("Required")
    });

    return (
        <div className='form-wrapper'>
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup className='form-element'>
                        <label>Name:</label>
                        <Field name='name' type='text' className='form-control' />
                        <ErrorMessage name='name' className='d-block invalid-feedback' component='span' />
                    </FormGroup>
                    <FormGroup className='form-element'>
                        <label>Email:</label>
                        <Field name='email' type='email' className='form-control' />
                        <ErrorMessage name='email' className='d-block invalid-feedback' component='span' />
                    </FormGroup>
                    <Button variant='primary' size='lg' block='block' className='form-submit-button' type='submit'>
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default UserForm;