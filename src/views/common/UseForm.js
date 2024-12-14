/**
 * Future impovements
 * TODO: add other states
 */

import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues || '' || [] || null);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const handleInputChange = (setter) => (e) => {
    setError([]);
    setSuccess([]);
    setter(e.target.value);
  };

  return {
    values,
    setValues,
    loading, 
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    handleInputChange,
  };
};

export default useForm;
