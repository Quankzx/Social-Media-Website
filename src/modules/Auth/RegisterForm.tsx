import React from 'react';

const RegisterForm = () => (
  <div className="max-w-sm mx-auto bg-white rounded shadow p-6 mt-8">
    <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Email" className="border rounded px-3 py-2" />
      <input type="text" placeholder="Username" className="border rounded px-3 py-2" />
      <input type="password" placeholder="Mật khẩu" className="border rounded px-3 py-2" />
      <input type="password" placeholder="Nhập lại mật khẩu" className="border rounded px-3 py-2" />
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Đăng ký</button>
    </form>
    <div className="mt-4 text-sm text-center">
      Đã có tài khoản? <a href="#" className="text-blue-600 hover:underline">Đăng nhập</a>
    </div>
  </div>
);

export default RegisterForm;
