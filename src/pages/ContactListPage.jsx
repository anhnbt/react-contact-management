import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { deleteContactById, getAllContacts } from '../services/contactServices';

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  const fetchContacts = async ({ name, phone }) => {
    const data = await getAllContacts(name, phone);
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts(form);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setContact(item);
    setShow(true);
  };

  const handleDelete = () => {
    deleteContactById(contact.id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchContacts(form);
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          id="name"
          placeholder="Enter name"
        />
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Enter phone"
        />
        <button type="submit">Search</button>
      </form>
      <Button
        variant="primary"
        className="my-3"
        onClick={() => navigate('contacts/create')}
      >
        Add new contact
      </Button>
      {contacts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td className="d-flex justify-content-center gap-2">
                  <Button
                    variant="info"
                    onClick={() => navigate('/contacts/edit/' + item.id)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleShow(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No data.</div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa {contact?.name} hay không!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactListPage;
