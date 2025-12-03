export enum JobType {
  SOURCE = 'SOURCE',
  TEST = 'TEST',
  BUILD = 'BUILD',
  DEPLOY = 'DEPLOY',
  SCAN = 'SCAN',
  CUSTOM = 'CUSTOM'
}

export interface Job {
  id: string;
  name: string;
  type: JobType;
  description?: string;
  icon?: string;
  config?: {
    repoUrl?: string;
    branch?: string;
    language?: string;
    commands?: string;
  };
}

export interface Stage {
  id: string;
  name: string;
  jobs: Job[];
  isParallel?: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}