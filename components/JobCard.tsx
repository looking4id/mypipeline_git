import React from 'react';
import { Job, JobType } from '../types';
import { GitBranch, Box, FileCode, CheckCircle, Shield, UploadCloud, Terminal } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  isSelected: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, isSelected }) => {
  
  const getIcon = () => {
    switch (job.type) {
      case JobType.SOURCE: return <GitBranch className="w-4 h-4 text-blue-500" />;
      case JobType.TEST: return <CheckCircle className="w-4 h-4 text-green-500" />;
      case JobType.BUILD: return <Box className="w-4 h-4 text-orange-500" />;
      case JobType.SCAN: return <Shield className="w-4 h-4 text-purple-500" />;
      case JobType.DEPLOY: return <UploadCloud className="w-4 h-4 text-indigo-500" />;
      default: return <Terminal className="w-4 h-4 text-gray-500" />;
    }
  };

  const isSource = job.type === JobType.SOURCE;

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onClick(job);
      }}
      className={`
        relative group cursor-pointer transition-all duration-200
        ${isSource ? 'w-64 h-24' : 'w-56 h-12'}
        bg-white border rounded-md shadow-sm hover:shadow-md
        ${isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}
        flex flex-col justify-center px-4
      `}
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${isSource ? 'bg-blue-50 p-2 rounded-lg' : ''}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {job.name}
          </p>
          {job.description && (
            <p className="text-xs text-gray-500 truncate mt-1">
              {job.description}
            </p>
          )}
        </div>
      </div>

      {/* Connection points simulation for visual connector lines */}
      <div className="absolute top-1/2 -right-3 w-3 h-0.5 bg-gray-300 hidden group-hover:block z-0" />
    </div>
  );
};

export default JobCard;