import { Pipeline, JobType } from './types';

export const INITIAL_PIPELINE: Pipeline = {
  id: 'pipeline-202212141737',
  name: '流水线-202212141737',
  stages: [
    {
      id: 'stage-source',
      name: '源',
      jobs: [
        {
          id: 'job-source-1',
          name: 'gitee-go/spring-boot',
          type: JobType.SOURCE,
          description: 'master',
          config: {
            language: 'Java',
            repoUrl: 'https://gitee.com/gitee-go/spring-boot.git',
            branch: 'master'
          }
        },
        {
          id: 'job-source-2',
          name: 'gitee-go/golang-build-case',
          type: JobType.SOURCE,
          description: 'master',
          config: {
            language: 'Golang',
            repoUrl: 'https://gitee.com/gitee-go/golang-build-case.git',
            branch: 'master'
          }
        }
      ]
    },
    {
      id: 'stage-test',
      name: '测试',
      isParallel: true,
      jobs: [
        {
          id: 'job-maven-test',
          name: 'Maven 单元测试',
          type: JobType.TEST,
        },
        {
          id: 'job-golang-test',
          name: 'Golang 单元测试',
          type: JobType.TEST,
        },
        {
          id: 'job-jacoco',
          name: 'Jacoco 覆盖率采集',
          type: JobType.TEST,
        }
      ]
    },
    {
      id: 'stage-build',
      name: '构建',
      jobs: [
        {
          id: 'job-maven-build',
          name: 'Maven 构建',
          type: JobType.BUILD,
        }
      ]
    },
    {
      id: 'stage-custom-1',
      name: '阶段1',
      jobs: [
        {
          id: 'job-sbom',
          name: 'SBOM 扫描',
          type: JobType.SCAN,
        }
      ]
    },
    {
      id: 'stage-upload',
      name: '上传',
      jobs: [
        {
          id: 'job-upload',
          name: '上传制品',
          type: JobType.DEPLOY,
        }
      ]
    },
    {
      id: 'stage-deploy',
      name: '发布',
      isParallel: true,
      jobs: [
        {
          id: 'job-deploy',
          name: '发布',
          type: JobType.DEPLOY,
        }
      ]
    }
  ]
};