"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(3); // Default contacts per page

  useEffect(() => {
    async function fetchContacts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setContacts(data);
    }
    fetchContacts();
  }, []);

  // Filter contacts based on search input
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handlePageSizeChange = (event) => {
    setContactsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container">
      <h1 className="title">Contacts</h1>
      <input
        type="text"
        placeholder="Search contacts by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />
      
      <div>
        <label htmlFor="page-size">Contacts per page:</label>
        <select id="page-size" value={contactsPerPage} onChange={handlePageSizeChange} className="page-size-select">
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div className="contacts">
        {currentContacts.map((contact) => (
          <div key={contact.id} className="card">
            <h3>{contact.name}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Website:</strong> {contact.website}</p>
            <p><strong>Company:</strong> {contact.company.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
