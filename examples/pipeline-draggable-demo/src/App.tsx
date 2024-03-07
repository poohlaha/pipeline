import React from 'react'
import type { IPipelineProps } from './pipeline'

import { Pipeline } from './pipeline'

function App() {
  const data: IPipelineProps = {
    groups: [
      [
        {
          title: {
            label: '代码拉取',
          },
          steps: [
            {
              label: '通用模板--代码拉取',
            },
            {
              label: 'Shell命令',
            },
            {
              label: 'Shell命令',
            },
          ],
        },
        {
          title: {
            label: '代码拉取',
          },
          steps: [
            {
              label: '通用模板--代码拉取',
            },
            {
              label: 'Shell命令',
            },
          ],
        },
      ],
        [
          {
            title: {
              label: '依赖安装',
            },
            steps: [
              {
                label: 'H5打包通用模板--安装依赖',
              },
              {
                label: 'Shell命令',
              },
            ],
          },
        ]
    ],
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Pipeline {...data} />
      </div>
    </div>
  )
}

export default App
