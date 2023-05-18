import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section.jsx';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactsList } from './ContactsList/ContactsList.jsx';
import { Filter } from './Filter/Filter.jsx';
import { Popup } from './Popup/Popup.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const addNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(5),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else if (contacts.some(contact => contact.number === number)) {
      alert(`${number} is already in contacts`);
    } else {
      setContacts(prev => [newContact, ...prev]);

      setShowInfo(true);
      setTimeout(() => {
        setShowInfo(false);
      }, 1500);
    }
  };

  const changeFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const getFilteredContacts = () => {
    const convertedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(convertedFilter)
    );
  };

  const visibleContacts = getFilteredContacts();

  return (
    <>
      {showInfo && <Popup />}
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addNewContact} />
      </Section>
      {visibleContacts.length > 0 ? (
        <Section title={'Contacts'}>
          <Filter value={filter} onChange={changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      ) : (
        <h2>You have no contacts yet</h2>
      )}
    </>
  );
}
