
export default function ContactCard({ contact }) {
  return (
    <div className="card">
      <h3>{contact.name}</h3>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Website:</strong> {contact.website}</p>
      <p><strong>Company:</strong> {contact.company.name}</p>
    </div>
  );
}
