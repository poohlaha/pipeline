import React, { useState, ReactElement } from 'react'
import type { IPipelineStepProps, IPipelineGroupProps, IPipelineProps } from '../pipeline-draggable'
import { Pipeline } from '../pipeline-draggable'
import { Button, Drawer, Input, Modal } from 'antd'

const { confirm } = Modal

interface IPipelineStageProps {
  data: IPipelineProps
  onSetData: (data: IPipelineProps) => void
}
const PipelineStage = (props: IPipelineStageProps): ReactElement => {
  const [open, setOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(-1) // 0: group 1: step 3: task 4: editor group
  const [groupIndex, setGroupIndex] = useState(-1)
  const [groupChildIndex, setGroupChildIndex] = useState(-1)
  const [stepIndex, setStepIndex] = useState(-1)
  const [inputGroupValue, setInputGroupValue] = useState('')
  const [stepForm, setStepForm] = useState({ label: '', command: '' })

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
            let groups = props.data.groups || []
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
              props.data.groups = groups.map((group, index) => {
                if (index === groupIndex) {
                  return group.map((g, i) => {
                    if (i === groupChildIndex) {
                      let steps = g.steps || []
                      if (stepIndex === -1) {
                        // 新增
                        steps.push({
                          label: stepForm.label || '',
                          command: stepForm.command,
                        })
                        g.steps = steps
                      } else {
                        // 修改
                        g.steps = g.steps.map((step, k) => {
                          if (k === stepIndex) {
                            return stepForm
                          }

                          return step
                        })
                      }
                    }

                    return g
                  })
                }

                return group
              })
            } else if (openIndex === 3) {
              props.data.groups = groups.map((group, index) => {
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
            } else if (openIndex === 4) {
              props.data.groups = groups.map((group, index) => {
                if (index === groupIndex) {
                  return group.map((g, i) => {
                    if (i === groupChildIndex) {
                      g.title.label = inputGroupValue
                    }
                    return g
                  })
                }
                return group
              })
            }

            setOpen(false)
            props.onSetData({
              ...props.data,
              groups,
            })

            onResetForm()
          }}
        >
          确定
        </Button>
      </div>
    )
  }

  const onResetForm = () => {
    setInputGroupValue('')
    setStepForm({ label: '', command: '' })
    setOpenIndex(-1)
    setGroupIndex(-1)
    setGroupChildIndex(-1)
    setStepIndex(-1)
  }

  return (
    <div className="pipeline-stage-wrapper">
      <Pipeline
        {...props.data}
        onGroupAdd={(index: number) => {
          console.log('insert group index: ', index)
          onResetForm()
          setGroupIndex(index)
          setOpen(true)
          setOpenIndex(0)
        }}
        onGroupClick={(groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => {
          console.log('on click group:', group)
          onResetForm()
          setGroupIndex(groupIndex)
          setGroupChildIndex(groupChildIndex)
          setInputGroupValue(group.title.label || '')
          setOpenIndex(4)
          setOpen(true)
        }}
        onStepAdd={(groupIndex: number, groupChildIndex: number) => {
          console.log('insert step, group index: ', groupIndex, ' group child index: ', groupChildIndex)
          onResetForm()
          setOpen(true)
          setGroupIndex(groupIndex)
          setGroupChildIndex(groupChildIndex)
          setOpenIndex(1)
        }}
        onStepClick={(groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => {
          console.log('on click step:', step)
          onResetForm()
          setStepForm({
            label: step.label || '',
            command: step.command || '',
          })
          setGroupIndex(groupIndex)
          setGroupChildIndex(groupChildIndex)
          setStepIndex(stepIndex)
          setOpenIndex(1)
          setOpen(true)
        }}
        onParallelTaskAdd={(groupIndex: number, defaultText: string = '') => {
          console.log('on add parallel task, groupIndex: ', groupIndex, ' defaultText: ', defaultText)
          onResetForm()
          setOpenIndex(3)
          setGroupIndex(groupIndex)
          setInputGroupValue(defaultText)
          setOpen(true)
        }}
        onGroupDelete={(groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => {
          console.log('on delete group:', groupIndex, groupChildIndex, group)
          onResetForm()
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
              let groups = props.data.groups || []
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

              props.onSetData({
                ...props.data,
                groups: newGroups,
              })
            },
          })
        }}
        onStepDelete={(groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => {
          console.log('on step group:', groupIndex, groupChildIndex, stepIndex, step)
          let groups = props.data.groups || []
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

          props.onSetData({
            ...props.data,
            groups: newGroups,
          })
        }}
      />

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
          {(openIndex === 0 || openIndex === 3 || openIndex === 4) && (
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
                  value={stepForm.label || ''}
                  onChange={e =>
                    setStepForm({
                      label: e.target.value || '',
                      command: stepForm.command || '',
                    })
                  }
                />
              </div>

              <div className="item-content page-margin-top">
                <p>任务命令</p>
                <Input.TextArea
                  placeholder="请输入"
                  value={stepForm.command || ''}
                  onChange={e =>
                    setStepForm({
                      label: stepForm.label || '',
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

export default PipelineStage
