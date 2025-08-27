import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { createContact } from '../services/contactServices';

const ContactCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Add Contact</h1>
      <Formik
        initialValues={{ name: '', phone: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Tên không được để trống';
          }
          if (!values.phone) {
            errors.phone = 'Số điện thoại không được để trống';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          createContact(values);
          navigate('/');
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                <ErrorMessage name="name" />
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
                value={values.phone}
              />
              <Form.Control.Feedback type="invalid">
                <ErrorMessage name="phone" />
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Add new
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="ms-2"
            >
              Back
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactCreatePage;
