import React, { useState } from 'react'
import type {IPipelineGroupProps, IPipelineProps, IPipelineStepProps} from './pipeline'
import { Pipeline } from './pipeline'
import './app.css'
import { Button, Drawer, Input, Modal } from 'antd'

const { confirm } = Modal

function App() {
  const [open, setOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(-1) // 0: group 1: step 3: task
  const [groupIndex, setGroupIndex] = useState(-1)
  const [groupChildIndex, setGroupChildIndex] = useState(-1)
  const [inputGroupValue, setInputGroupValue] = useState('')
  const [stepForm, setStepForm] = useState({ name: '', command: '' })

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
              command: 'git clone -b xxxx'
            },
            {
              label: 'Shell命令',
              command: 'cd /usr/local/'
            },
            {
              label: 'Shell命令',
              command: 'cd /usr/local/nginx'
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
              command: 'git clone -b xxxx'
            },
            {
              label: 'Shell命令',
              command: 'java --version'
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
              command: 'npm install'
            },
            {
              label: 'Shell命令',
              command: 'nvm use 16.20'
            },
          ],
        },
      ],
    ],
  }

  const [data, setData] = useState(defaultData)

  const getDrawerFooterHtml = () => {
    return (
      <div className="footer">
        <Button
          onClick={() => {
            onResetForm()
            setOpen(false)
          }}
        >
          取消
        </Button>
        <Button
          type="primary"
          onClick={() => {
            let groups = data.groups || []
            if (openIndex === 0) {
              groups.splice(groupIndex, 0, [
                {
                  title: {
                    label: inputGroupValue || '',
                  },
                  steps: [],
                },
              ])
            } else if (openIndex === 1) {
              data.groups = groups.map((group, index) => {
                if (index === groupIndex) {
                  return group.map((g, i) => {
                    if (i === groupChildIndex) {
                      let steps = g.steps || []
                      steps.push({
                        label: stepForm.name || '',
                        command: stepForm.command,
                      })

                      g.steps = steps
                    }

                    return g
                  })
                }

                return group
              })
            } else if (openIndex === 3) {
              data.groups = groups.map((group, index) => {
                if (index === groupIndex) {
                  group.push({
                    title: {
                      label: inputGroupValue || '',
                    },
                    steps: [],
                  })

                  return group
                }

                return group
              })
            }

            setData({
              ...data,
              groups
            })
            onResetForm()
            setOpen(false)
          }}
        >
          确定
        </Button>
      </div>
    )
  }

  const onResetForm = () => {
    setInputGroupValue('')
    setStepForm({ name: '', command: '' })
    setOpenIndex(-1)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Pipeline
          {...data}
          onGroupAdd={(index: number) => {
            console.log('insert group index: ', index)
            setGroupIndex(index)
            onResetForm()
            setOpen(true)
            setOpenIndex(0)
          }}
          onStepAdd={(groupIndex: number, groupChildIndex: number) => {
            console.log('insert step, group index: ', groupIndex, ' group child index: ', groupChildIndex)
            setOpen(true)
            setGroupIndex(groupIndex)
            setGroupChildIndex(groupChildIndex)
            setOpenIndex(1)
          }}
          onStepClick={(step: IPipelineStepProps) => {
            console.log('on click step:', step)
            setStepForm({
              name: step.label || '',
              command: step.command || ''
            })
            setOpenIndex(1)
            setOpen(true)
          }}
          onParallelTaskAdd={(groupIndex: number, defaultText: string = '') => {
            console.log('on add parallel task, groupIndex: ', groupIndex, ' defaultText: ', defaultText)
            setOpenIndex(3)
            setGroupIndex(groupIndex)
            setInputGroupValue(defaultText)
            setOpen(true)
          }}
          onGroupDelete={(groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => {
            console.log('on delete group:', groupIndex, groupChildIndex, group)
              setGroupIndex(groupIndex)
              setGroupChildIndex(groupChildIndex)
            confirm({
             title: '友情提醒',
              content: (
                  <div className="modal-delete">
                    <span>删除阶段</span>
                    <span className="name">{group.title.label || ''}</span>
                    <span>后会删除所有对应的子步骤, 是否删除?</span>
                  </div>
              ),
              okText: '确定',
              cancelText: '取消',
              onOk() {
                 let groups = data.groups || []
                  let newGroups: Array<Array<IPipelineGroupProps>> = []
                  groups.forEach((group: Array<IPipelineGroupProps>, index) => {
                      if (index === groupIndex) {
                          let newGroup: Array<IPipelineGroupProps> = []
                          group.forEach((g: IPipelineGroupProps, i) => {
                              if (i !== groupChildIndex) {
                                  newGroup.push(g)
                              }
                          })

                          newGroups.push(newGroup)
                      } else {
                          newGroups.push(group)
                      }
                  })

                  setData({
                      ...data,
                      groups: newGroups
                  })
              }
            });
          }}
          onStepDelete={(groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => {
              console.log('on step group:', groupIndex, groupChildIndex, stepIndex, step)
              let groups = data.groups || []
              let newGroups: Array<Array<IPipelineGroupProps>> = []
              groups.forEach((group: Array<IPipelineGroupProps>, index) => {
                  if (index === groupIndex) {
                      let newGroup: Array<IPipelineGroupProps> = []
                      group.forEach((g: IPipelineGroupProps, i) => {
                          if (i === groupChildIndex) {
                              let newSteps: Array<IPipelineStepProps> = []
                              let steps = g.steps || []
                              steps.forEach((step: IPipelineStepProps, k) => {
                                  if (k !== stepIndex) {
                                      newSteps.push(step)
                                  }
                              })
                              g.steps = newSteps || []
                              newGroup.push(g)
                          } else {
                              newGroup.push(g)
                          }
                      })

                      newGroups.push(newGroup)
                  } else {
                      newGroups.push(group)
                  }
              })

              setData({
                  ...data,
                  groups: newGroups
              })
          }}
        />
      </div>

      <Drawer
        title={openIndex === 1 ? '步骤设置' : '阶段设置'}
        width={500}
        maskClosable={true}
        onClose={() => {
          onResetForm()
          setOpen(false)
        }}
        open={open}
        footer={getDrawerFooterHtml()}
      >
        <div className="setting-body">
          {(openIndex === 0 || openIndex === 3) && (
            <div className="body-item">
              <p>阶段名称</p>
              <Input placeholder="请输入" value={inputGroupValue} onChange={e => setInputGroupValue(e.target.value || '')} />
            </div>
          )}

          {openIndex === 1 && (
            <div className="body-item">
              <div className="item-content">
                <p>任务名称</p>
                <Input
                  placeholder="请输入"
                  value={stepForm.name || ''}
                  onChange={e =>
                    setStepForm({
                      name: e.target.value || '',
                      command: stepForm.command || '',
                    })
                  }
                />
              </div>

              <div className="item-content">
                <p>任务名称</p>
                <Input.TextArea
                  placeholder="请输入"
                  value={stepForm.command || ''}
                  onChange={e =>
                    setStepForm({
                      name: stepForm.name || '',
                      command: e.target.value || '',
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  )
}

export default App
