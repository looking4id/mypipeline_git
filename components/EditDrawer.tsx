import React from 'react';
import { Job, JobType } from '../types';
import { X, GitBranch, Layout, Box, Globe, Info } from 'lucide-react';

interface EditDrawerProps {
  job: Job | null;
  onClose: () => void;
  onUpdate: (updatedJob: Job) => void;
  onDelete: (jobId: string) => void;
}

const EditDrawer: React.FC<EditDrawerProps> = ({ job, onClose, onUpdate, onDelete }) => {
  if (!job) return null;

  const handleConfigChange = (key: string, value: string) => {
    onUpdate({
      ...job,
      config: {
        ...job.config,
        [key]: value
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...job, name: e.target.value });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
           <h2 className="text-lg font-semibold text-gray-800">
            {job.type === JobType.SOURCE ? '编辑源' : '编辑任务'}
           </h2>
           <button onClick={() => onDelete(job.id)} className="text-gray-400 hover:text-red-500">
             <span className="sr-only">Delete</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
           </button>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Basic Name Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">任务名称</label>
            <input 
              type="text" 
              value={job.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
        </div>

        {/* Source Specific Fields */}
        {job.type === JobType.SOURCE && (
          <>
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 block">选择源 <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-4 gap-3">
                {['示例代码源', 'Gitee 代码库', 'Gitee 制品库', '流水线'].map((label, idx) => (
                  <button key={idx} className={`flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors ${idx === 0 ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>
                    <div className="mb-2">
                       {/* Mock Icons */}
                       {idx === 0 ? <Layout size={20} /> : idx === 1 ? <GitBranch size={20}/> : idx === 2 ? <Box size={20}/> : <Layout size={20}/>}
                    </div>
                    <span className="text-xs text-center">{label}</span>
                  </button>
                ))}
              </div>
              
              <div className="bg-blue-50 text-blue-700 text-xs p-3 rounded-md flex gap-2">
                <Info size={16} className="flex-shrink-0" />
                <p>示例代码库由 Gitee 开源软件提供，用于新用户快速试用流水线的配置与运行。</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">语言类型</label>
              <div className="flex flex-wrap gap-4">
                {['Java', 'Golang', 'NodeJS', 'Python', 'PHP', 'Ruby', 'GCC', '.NET Core'].map(lang => (
                  <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="language" 
                      checked={job.config?.language === lang}
                      onChange={() => handleConfigChange('language', lang)}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4 border-gray-300"
                    />
                    <span className="text-sm text-gray-600">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">代码仓库</label>
              <input 
                type="text" 
                value={job.config?.repoUrl || ''}
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 text-sm cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                默认分支 <Globe size={14} className="text-gray-400"/>
              </label>
              <input 
                type="text" 
                value={job.config?.branch || ''}
                onChange={(e) => handleConfigChange('branch', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </>
        )}

        {/* General Fields for other types */}
        {job.type !== JobType.SOURCE && (
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">任务命令</label>
             <textarea 
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="# Enter shell commands..."
                value={job.config?.commands || ''}
                onChange={(e) => handleConfigChange('commands', e.target.value)}
             ></textarea>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
          取消
        </button>
        <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 shadow-sm">
          保存配置
        </button>
      </div>
    </div>
  );
};

export default EditDrawer;