import React from 'react';
import { ChevronLeft, Bell, HelpCircle, Plus, Sparkles } from 'lucide-react';

interface PipelineHeaderProps {
  pipelineName: string;
}

const PipelineHeader: React.FC<PipelineHeaderProps> = ({ pipelineName }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-gray-100 text-sm">
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800">
             <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
             <span>项目</span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
             <span>敏捷研发项目01</span>
          </div>
          <span className="text-gray-300">/</span>
          <span className="text-blue-600 cursor-pointer">升级到付费版</span>
          <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-sm">双十一年度特惠</span>
          <span className="px-2 py-0.5 bg-yellow-600 text-white text-xs rounded-sm flex items-center gap-1">
            30 天试用尊享版 
            <Sparkles size={10} />
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
             <Bell size={18} />
             <div className="absolute top-2 right-14 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          <button className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200">
             <span className="font-bold text-xs">AI</span>
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
             <HelpCircle size={18} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
             <Plus size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-medium text-xs">
            Lo
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-medium text-gray-800">{pipelineName}</h1>
        </div>

        {/* Tabs */}
        <div className="flex h-full">
           {['基本信息', '流程编排', '变量设置', '高级设置'].map((tab, idx) => (
             <button 
                key={tab} 
                className={`px-6 h-full text-sm font-medium border-b-2 transition-colors
                  ${idx === 1 ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600 hover:text-gray-800'}
                `}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
           <button className="px-4 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
             保存
           </button>
           <button className="px-4 py-1.5 bg-red-700 text-white rounded text-sm hover:bg-red-800 shadow-sm">
             保存并运行
           </button>
        </div>
      </div>
    </div>
  );
};

export default PipelineHeader;