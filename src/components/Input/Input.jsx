import { useState } from 'react';
import styles from './Input.module.css';
import iconShow from '../../assets/images/show.png'
import iconHide from '../../assets/images/hide.png'

export default function Input({ type, placeholder, onChange }) {
  const [inputType, setInputType] = useState(type);
  const toggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      {type === 'password' && (
        <img 
          src={inputType === 'password' ? iconShow : iconHide }
          alt='visibility'
          className={styles.visibilityToggle} 
          onClick={toggleVisibility}
        />
      )}
    </div>
  );
}