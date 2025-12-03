import React, { useState } from 'react';
import PipelineHeader from './components/PipelineHeader';
import StageColumn from './components/StageColumn';
import EditDrawer from './components/EditDrawer';
import { INITIAL_PIPELINE } from './constants';
import { Pipeline, Job, JobType } from './types';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  const [pipeline, setPipeline] = useState<Pipeline>(INITIAL_PIPELINE);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // Computed selected job object for drawer
  const selectedJob = React.useMemo(() => {
    if (!selectedJobId) return null;
    for (const stage of pipeline.stages) {
      const found = stage.jobs.find(j => j.id === selectedJobId);
      if (found) return found;
    }
    return null;
  }, [pipeline, selectedJobId]);

  const handleJobSelect = (job: Job) => {
    setSelectedJobId(job.id);
  };

  const handleJobUpdate = (updatedJob: Job) => {
    setPipeline(prev => ({
      ...prev,
      stages: prev.stages.map(stage => ({
        ...stage,
        jobs: stage.jobs.map(job => job.id === updatedJob.id ? updatedJob : job)
      }))
    }));
  };

  const handleJobDelete = (jobId: string) => {
    setPipeline(prev => ({
      ...prev,
      stages: prev.stages.map(stage => ({
        ...stage,
        jobs: stage.jobs.filter(job => job.id !== jobId)
      }))
    }));
    setSelectedJobId(null);
  };

  const handleAddJob = (stageId: string) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      name: '新任务',
      type: JobType.CUSTOM,
      description: 'Pending configuration'
    };

    setPipeline(prev => ({
      ...prev,
      stages: prev.stages.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            jobs: [...stage.jobs, newJob]
          };
        }
        return stage;
      })
    }));
  };

  const handleStageUpdate = (stageId: string, name: string) => {
    setPipeline(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === stageId ? { ...stage, name } : stage
      )
    }));
  };

  const handleStageParallelToggle = (stageId: string) => {
    setPipeline(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === stageId ? { ...stage, isParallel: !stage.isParallel } : stage
      )
    }));
  };

  const handleAddStage = () => {
     // Implementation for adding a new stage to the end
     const newStage = {
       id: `stage-${Date.now()}`,
       name: `阶段 ${pipeline.stages.length}`,
       jobs: []
     };
     setPipeline(prev => ({
       ...prev,
       stages: [...prev.stages, newStage]
     }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50/50 overflow-hidden">
      <PipelineHeader pipelineName={pipeline.name} />

      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Canvas Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto pipeline-scroll p-8 cursor-grab active:cursor-grabbing">
          <div className="flex h-full min-h-[600px] min-w-max pb-20">
            {pipeline.stages.map((stage, index) => (
              <StageColumn
                key={stage.id}
                stage={stage}
                isLast={index === pipeline.stages.length - 1}
                onJobSelect={handleJobSelect}
                selectedJobId={selectedJobId}
                onAddJob={handleAddJob}
                onUpdateStage={handleStageUpdate}
                onToggleParallel={handleStageParallelToggle}
              />
            ))}

            {/* End of pipeline Add Stage Button */}
            <div className="flex-shrink-0 flex items-start pt-[68px]">
               <div className="relative group">
                 <button 
                    onClick={handleAddStage}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-dashed border-gray-300 rounded text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                 >
                   <Plus size={16} className="bg-red-50 rounded-full p-0.5" />
                   添加阶段
                 </button>
                 {/* Tooltip */}
                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10">
                   创建新的流水线阶段
                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Background Watermark (Cosmetic) */}
        <div className="absolute inset-0 pointer-events-none flex flex-wrap justify-center content-center opacity-[0.03] overflow-hidden -z-10 select-none">
           {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="m-12 transform -rotate-12 text-2xl font-bold text-black">
                looking4id 7430
              </div>
           ))}
        </div>
      </main>

      {/* Configuration Drawer */}
      <EditDrawer 
        job={selectedJob} 
        onClose={() => setSelectedJobId(null)}
        onUpdate={handleJobUpdate}
        onDelete={handleJobDelete}
      />
    </div>
  );
};

export default App;