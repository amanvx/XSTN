// ============================================================
// useForm HOOK — form state + validation
// ============================================================
import { useState, useCallback } from "react";

export function useForm(initialValues, rules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    let valid = true;
    Object.entries(rules).forEach(([field, rule]) => {
      const msg = rule(values[field] || "");
      if (msg) { newErrors[field] = msg; valid = false; }
    });
    setErrors(newErrors);
    return valid;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, []);

  return { values, errors, handleChange, validate, reset };
}
