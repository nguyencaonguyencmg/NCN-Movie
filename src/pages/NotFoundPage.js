import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-cover w-full text-purple-400 h-[85vh] bg-gray-800 text-center">
      <p className="py-20 not-found text-9xl mochiy ">
        4 0 4
      </p>
      <p className="pb-5 text-5xl font-semibold not-found">
        Không tìm thấy nội dung
      </p>
      <p className="py-5 text-2xl">
        URL của nội dung này đã bị thay đổi hoặc không còn
        tồn tại.
      </p>
      <div className="max-w-[280px] mx-auto mt-10 p-4 text-2xl font-medium text-yellow-400 bg-purple-700 rounded-lg ">
        <a href="/">Quay lại trang chủ</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
