import React, {useState} from 'react'
import PipelineStage from './pipeline'
import PipelineStageView from './pipeline/view'
import './app.css'
import {IPipelineProps, IPipelineViewGroupProps, IPipelineViewProps} from './pipeline-draggable'
import {IPipelineStatus} from './pipeline-draggable/lib/components/props'

function App() {
    const defaultData: IPipelineProps = {
        groups: [
            [
                {
                    title: {
                        label: '前端代码拉取',
                    },
                    steps: [
                        {
                            label: '通用模板--代码拉取',
                            command: 'git clone -b xxxx',
                        },
                        {
                            label: 'Shell命令',
                            command: 'cd /usr/local/',
                        },
                        {
                            label: 'Shell命令',
                            command: 'cd /usr/local/nginx',
                        },
                    ],
                },
                {
                    title: {
                        label: '后端代码拉取',
                    },
                    steps: [
                        {
                            label: '通用模板--代码拉取',
                            command: 'git clone -b xxxx',
                        },
                        {
                            label: 'Shell命令',
                            command: 'java --version',
                        },
                    ],
                },
            ],
            [
                {
                    title: {
                        label: '前端依赖安装',
                    },
                    steps: [
                        {
                            label: 'H5通用模板--安装依赖',
                            command: 'npm install',
                        },
                        {
                            label: 'Shell命令',
                            command: 'nvm use 16.20',
                        },
                    ],
                },
                {
                    title: {
                        label: '后端依赖安装',
                    },
                    steps: [
                        {
                            label: 'Java打包通用模板--安装依赖',
                            command: 'java run',
                        },
                        {
                            label: '查看Java版本',
                            command: 'java -version',
                        },
                        {
                            label: 'Shell命令',
                            command: 'javac',
                        },
                    ],
                },
            ],
            [
                {
                    title: {
                        label: '项目打包',
                    },
                    steps: [
                        {
                            label: '打包通用模板--项目打包',
                            command: 'run pack',
                        },
                    ],
                },
            ]
        ],
    }

    const [data, setData] = useState<any>(defaultData)

    const getPipelineStageViewData = () => {
        let viewData = {...data} as IPipelineViewProps
        let step = [0, 1]
        viewData.step = step

        let groups = viewData.groups || []
        groups.map((group: Array<IPipelineViewGroupProps>, index: number) => {
            group.map((g, i: number) => {
                if (index < step[0]) {
                    g.status = IPipelineStatus.Success
                } else {
                    if (index === step[0]) {
                        if (i < step[1]) {
                            g.status = IPipelineStatus.Success
                        }

                        if (i === step[1]) {
                            g.status = IPipelineStatus.Failed
                        }

                        if (i > step[1]) {
                            g.status = IPipelineStatus.Failed
                        }
                    } else {
                        g.status = IPipelineStatus.Failed
                    }
                }
            })
        })

        console.log('pipeline stage view data: ', data)
        return viewData
    }

    return (
    <div className="App">
      <div className="wrapper">
        <PipelineStage data={data} onSetData={(data) => setData(data)} />
        <PipelineStageView data={getPipelineStageViewData()} />
      </div>
    </div>
  )
}

export default App
