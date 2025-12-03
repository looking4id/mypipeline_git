import React, { useState, useRef, useEffect } from 'react';
import { Stage, Job } from '../types';
import JobCard from './JobCard';
import { Plus, Edit2 } from 'lucide-react';

interface StageColumnProps {
  stage: Stage;
  onJobSelect: (job: Job) => void;
  selectedJobId: string | null;
  onAddJob: (stageId: string) => void;
  onUpdateStage: (stageId: string, name: string) => void;
  onToggleParallel: (stageId: string) => void;
  isLast: boolean;
}

const StageColumn: React.FC<StageColumnProps> = ({ stage, onJobSelect, selectedJobId, onAddJob, onUpdateStage, onToggleParallel, isLast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(stage.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedName(stage.name);
  }, [stage.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedName.trim() && editedName !== stage.name) {
      onUpdateStage(stage.id, editedName.trim());
    } else {
      setEditedName(stage.name); // Revert if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(stage.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex-shrink-0 flex items-start group/stage h-full relative">
      
      {/* Connector Line (Horizontal) */}
      {!isLast && (
        <div className="absolute top-16 left-full w-16 h-[2px] bg-gray-200 -z-10 transform translate-y-2" />
      )}

      {/* Main Column Container */}
      <div className="w-72 flex flex-col h-full mr-16 relative">
        
        {/* Header with Edit Functionality and Parallel Toggle */}
        <div className="mb-6 px-1 h-8 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            {isEditing ? (
               <input
                 ref={inputRef}
                 type="text"
                 value={editedName}
                 onChange={(e) => setEditedName(e.target.value)}
                 onBlur={handleSave}
                 onKeyDown={handleKeyDown}
                 className="w-full px-2 py-1 text-sm font-medium border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
               />
            ) : (
               <div 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 font-medium text-gray-700 text-sm cursor-pointer hover:bg-gray-100 -ml-2 px-2 py-1 rounded transition-colors group/name"
               >
                  <span className="truncate">{stage.name}</span>
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover/name:opacity-100 transition-opacity">
                    <Edit2 size={12} />
                  </button>
               </div>
            )}
          </div>

          {/* Parallel Toggle Switch */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-[10px] transform scale-90 ${stage.isParallel ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              {stage.isParallel ? '并行' : '串行'}
            </span>
            <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onToggleParallel(stage.id);
               }}
               className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${stage.isParallel ? 'bg-blue-500' : 'bg-gray-300'}`}
               title={stage.isParallel ? "切换为串行" : "切换为并行"}
            >
               <span
                 className={`${
                   stage.isParallel ? 'translate-x-3.5' : 'translate-x-0.5'
                 } inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 shadow-sm`}
               />
            </button>
          </div>
        </div>

        {/* Jobs Container */}
        <div className="space-y-4 relative">
          
          {/* Vertical connection line for multiple jobs in same stage */}
          {stage.jobs.length > 1 && (
             <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200 -z-10 rounded-full" />
          )}

          {stage.jobs.map((job, index) => {
            // Logic for branching lines if needed, simplified for now
            return (
              <div key={job.id} className="relative z-0">
                 {/* Little connector from vertical line to card if parallel */}
                 {stage.jobs.length > 1 && (
                   <div className="absolute top-1/2 -left-6 w-6 h-0.5 bg-gray-200 -z-10" />
                 )}
                 <JobCard 
                  job={job} 
                  onClick={onJobSelect} 
                  isSelected={selectedJobId === job.id} 
                />
              </div>
            );
          })}

          {/* Add Job Button (only for non-source stages usually) */}
          {stage.id !== 'stage-source' && (
            <button 
              onClick={() => onAddJob(stage.id)}
              className="w-full py-2 border-2 border-dashed border-gray-200 rounded-md text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-1 text-sm bg-gray-50/50"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Add Stage Button (Visual spacer + trigger) */}
      {!isLast && (
         <div className="absolute top-[68px] -right-8 transform translate-x-1/2 z-10 opacity-0 group-hover/stage:opacity-100 transition-opacity">
            <button className="w-6 h-6 bg-red-600 rounded-sm text-white flex items-center justify-center hover:bg-red-700 shadow-sm">
               <Plus size={14} />
            </button>
         </div>
      )}

    </div>
  );
};

export default StageColumn;