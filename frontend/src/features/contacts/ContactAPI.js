import axios from 'axios';

// Set base URL to avoid repeating ///
const BASE_URL = 'http://localhost:5000/api/contacts';

// GET: Fetch all contacts ///
export const fetchContactsAPI = () => {
  return axios.get(BASE_URL);
};

// POST: Add a new contact ///
export const addContactAPI = (contact) => {
  return axios.post(BASE_URL, contact);
};

// PUT: Update existing contact ///
export const updateContactAPI = (contact) => {
  return axios.put(`${BASE_URL}/${contact._id}`, contact);
};

// DELETE: Remove a contact ///
export const deleteContactAPI = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
