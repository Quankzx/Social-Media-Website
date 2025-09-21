import React from 'react';

const ForgotPasswordForm = () => (
  <div className="max-w-sm mx-auto bg-white rounded shadow p-6 mt-8">
    <h2 className="text-xl font-bold mb-4">Quên mật khẩu</h2>
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Email" className="border rounded px-3 py-2" />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Gửi mã xác nhận</button>
    </form>
    <div className="mt-4 text-sm text-center">
      <a href="#" className="text-blue-600 hover:underline">Quay lại đăng nhập</a>
    </div>
  </div>
);

export default ForgotPasswordForm;
