import { useState } from 'react';

import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid(5);
  const numberInputId = nanoid(5);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    resetState();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' && setName(value);
    name === 'number' && setNumber(value);
  };

  const resetState = _ => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.form_label} htmlFor={nameInputId}>
        Name
        <input
          className={css.form_input}
          placeholder="your name"
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
        />
      </label>
      <label className={css.form_label} htmlFor={numberInputId}>
        Number
        <input
          className={css.form_input}
          placeholder="000-00-00"
          type="tel"
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          id={numberInputId}
          required
        />
      </label>
      <button className={css.form_button} type="submit">
        Add contact
      </button>
    </form>
  );
}
