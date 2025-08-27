import React, { useEffect, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { updateContact } from '../services/contactServices';

const ContactEditPage = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();
  console.log(contactId);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/contacts/' + contactId)
      .then((response) => {
        console.log(response.data);
        setContact(response.data);
      });
  }, [contactId]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Contact {contact.id}</h1>
      <Formik
        initialValues={{
          name: contact?.name || '',
          phone: contact?.phone || '',
        }}
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
          updateContact(contactId, values);
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
              Save
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

export default ContactEditPage;
