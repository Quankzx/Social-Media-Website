import React from 'react';

const LoginForm = () => (
  <div className="max-w-sm mx-auto bg-white rounded shadow p-6 mt-8">
    <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Email hoặc username" className="border rounded px-3 py-2" />
      <input type="password" placeholder="Mật khẩu" className="border rounded px-3 py-2" />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> Nhớ đăng nhập
        </label>
        <a href="#" className="text-blue-600 hover:underline text-sm">Quên mật khẩu?</a>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Đăng nhập</button>
    </form>
    <div className="mt-4 text-sm text-center">
      Chưa có tài khoản? <a href="#" className="text-blue-600 hover:underline">Đăng ký</a>
    </div>
  </div>
);

export default LoginForm;
