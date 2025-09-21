import React, { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const validationConfig = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value: string) => {
        if (!value.includes('@')) return 'Email phải chứa ký tự @';
        return null;
      }
    },
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: (value: string) => {
        if (value.includes(' ')) return 'Username không được chứa khoảng trắng';
        return null;
      }
    },
    password: {
      required: true,
      minLength: 8,
      custom: (value: string) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
        }
        return null;
      }
    },
    confirmPassword: {
      required: true,
      custom: (value: string) => {
        if (value !== formData.password) return 'Mật khẩu xác nhận không khớp';
        return null;
      }
    }
  };

  const { validate, getFieldError, setFieldTouched } = useFormValidation(validationConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      console.log('Đăng ký thành công:', formData);
      // Handle registration logic here
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-sm mx-auto card mt-8">
      <h2 className="text-heading-2 mb-6">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => setFieldTouched('email')}
            className={`input w-full ${getFieldError('email') ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {getFieldError('email') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('email')}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => setFieldTouched('username')}
            className={`input w-full ${getFieldError('username') ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {getFieldError('username') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('username')}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => setFieldTouched('password')}
            className={`input w-full ${getFieldError('password') ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {getFieldError('password') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('password')}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => setFieldTouched('confirmPassword')}
            className={`input w-full ${getFieldError('confirmPassword') ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {getFieldError('confirmPassword') && (
            <p className="text-red-600 text-sm mt-1">{getFieldError('confirmPassword')}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Đăng ký
        </button>
      </form>

      <div className="mt-6 text-sm text-center">
        Đã có tài khoản? <a href="#" className="text-red-600 hover:text-red-700 font-medium transition-colors">Đăng nhập</a>
      </div>
    </div>
  );
};

export default RegisterForm;
