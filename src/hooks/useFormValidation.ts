import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FieldConfig {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (config: FieldConfig) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (name: string, value: string): string | null => {
    const rules = config[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return 'Trường này là bắt buộc';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Phải có ít nhất ${rules.minLength} ký tự`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Không được vượt quá ${rules.maxLength} ký tự`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Định dạng không hợp lệ';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const validate = (data: { [key: string]: string }): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(config).forEach(field => {
      const error = validateField(field, data[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const setFieldTouched = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const getFieldError = (name: string): string | undefined => {
    return touched[name] ? errors[name] : undefined;
  };

  return {
    errors,
    validate,
    validateField,
    setFieldTouched,
    getFieldError,
    setErrors
  };
};