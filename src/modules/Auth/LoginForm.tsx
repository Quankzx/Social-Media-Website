import React, { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    password: {
      required: true,
      minLength: 6
    }
  };

  const { validate, getFieldError, setFieldTouched } = useFormValidation(validationConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      console.log('Đăng nhập thành công:', formData);
      // Handle login logic here
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-sm mx-auto card mt-8">
      <h2 className="text-heading-2 mb-6">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email hoặc username"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded" />
            Nhớ đăng nhập
          </label>
          <a href="#" className="text-red-600 hover:text-red-700 text-sm transition-colors">Quên mật khẩu?</a>
        </div>

        <button type="submit" className="btn-primary w-full">
          Đăng nhập
        </button>
      </form>

      <div className="mt-6 text-sm text-center">
        Chưa có tài khoản? <a href="#" className="text-red-600 hover:text-red-700 font-medium transition-colors">Đăng ký</a>
      </div>
    </div>
  );
};

export default LoginForm;
