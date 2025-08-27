import axios from 'axios';

const API_URL = 'http://localhost:3004';

export async function getAllContacts(name, phone) {
  let response;
  if (name && phone) {
    response = await axios.get(
      `${API_URL}/contacts?name_like=${name}&phone_like=${phone}`
    );
  } else if (name) {
    response = await axios.get(`${API_URL}/contacts?name_like=${name}`);
  } else if (phone) {
    response = await axios.get(`${API_URL}/contacts?phone_like=${phone}`);
  } else {
    response = await axios.get(`${API_URL}/contacts`);
  }
  return response.data;
}

export async function getContactById(id) {
  const response = await axios.get(`${API_URL}/contacts/${id}`);
  return response.data;
}

export async function deleteContactById(id) {
  const response = await axios.delete(`${API_URL}/contacts/${id}`);
  return response.data;
}

export async function createContact(payload) {
  const response = await axios.post(`${API_URL}/contacts`, payload);
  return response.data;
}

export async function updateContact(id, payload) {
  const response = await axios.put(`${API_URL}/contacts/${id}`, payload);
  return response.data;
}
