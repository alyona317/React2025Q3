import { useSelector } from 'react-redux';
import type { RootState } from '../../store/index';

const FormCards = () => {
  const forms = useSelector((state: RootState) => state.form.forms);

  return (
    <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
      {forms.map((form, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            background: '#f9f9f9',
          }}
        >
          <h3>{form.name}</h3>
          <p>
            <b>Email:</b> {form.email}
          </p>
          <p>
            <b>Age:</b> {form.age}
          </p>
          <p>
            <b>Gender:</b> {form.gender}
          </p>
          <p>
            <b>Country:</b> {form.country}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FormCards;
