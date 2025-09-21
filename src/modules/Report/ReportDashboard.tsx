import React from 'react';
import Skeleton from '../../components/Skeleton';
import { useAppStore } from '../../store';

const ReportDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Báo cáo & Phân tích</h2>
      <div className="bg-white rounded shadow p-4 mb-4 flex justify-between items-center">
        <p>Chức năng: Phân tích dữ liệu, biểu đồ, xuất báo cáo.</p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Xuất báo cáo</button>
      </div>
      {/* Biểu đồ phân tích */}
      {useAppStore((s) => s.isAppLoading) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Biểu đồ lượt tương tác</h3>
            <Skeleton variant="rectangular" className="w-full h-40" />
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Biểu đồ tăng trưởng followers</h3>
            <Skeleton variant="rectangular" className="w-full h-40" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Biểu đồ lượt tương tác</h3>
            <img src="https://quickchart.io/chart?c={type:'bar',data:{labels:['FB','IG','TT','YT'],datasets:[{label:'Like',data:[120,90,60,80]},{label:'Share',data:[30,40,20,25]}]}}" alt="chart" className="w-full h-40 object-contain" />
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <h3 className="font-semibold mb-2">Biểu đồ tăng trưởng followers</h3>
            <img src="https://quickchart.io/chart?c={type:'line',data:{labels:['Th1','Th2','Th3','Th4'],datasets:[{label:'Followers',data:[1000,1200,1500,1800]}]}}" alt="chart" className="w-full h-40 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDashboard;
