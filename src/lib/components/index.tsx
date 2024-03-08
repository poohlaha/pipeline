/**
 * @fileOverview 流水线
 * @date 2023-08-28
 * @author poohlaha
 */
import React, { Fragment, ReactElement, useState } from 'react'
import {IPipelineGroupProps, IPipelineProps, IPipelineStepProps} from './props'
import Utils from '../utils'
import Group from './group'
import '../css/index.css'
// import Sortable from 'sortablejs'

const Pipeline = (props: IPipelineProps): ReactElement => {
  const [groupDraggable, setGroupDraggable] = useState(false)

  /*
  useMount(() => {
    let groupDomList = document.querySelectorAll('.group-draggable') || []
    if (groupDomList.length === 0) return

    for (let i = 0; i < groupDomList.length; i++) {
      const groupDom = groupDomList[i] as HTMLElement
      new Sortable(groupDom, {
        group: 'nested',
        animation: 150,
        fallbackOnBody: false,
        swapThreshold: 1,
        onStart: () => {
          setGroupDraggable(true)
        },
        onEnd: (evt: any = {}) => {
          setGroupDraggable(false)
          let itemEl = evt.item
          console.log(itemEl)
          console.log(evt.to)
          console.log(evt.from)
          console.log(evt.oldIndex)
          console.log(evt.newIndex)
          console.log(evt.oldDraggableIndex)
          console.log(evt.newDraggableIndex)
        },
      })
    }
  })
   */

  /**
   * 添加 step 按钮
   */
  const getAddStepHtml = (groupIndex: number = -1, groupChildIndex: number = -1) => {
    return (
      <div className="pipeline-stage-group-add-step-wrapper flex-center">
        <div className="pipeline-stage-group-add-step cursor-pointer" onClick={() => props.onStepAdd?.(groupIndex, groupChildIndex)}>
          <span className="pipeline-state-add-button">+</span>
        </div>
      </div>
    )
  }

  /**
   * 获取 Group 节点
   */
  const getGroupHtml = () => {
    const groups = props.groups || []
    let allowParallelTask = props.allowParallelTask
    if (allowParallelTask === null || allowParallelTask === undefined) {
      allowParallelTask = true
    }
    return (
      <div className="pipeline-stage-group-list flex">
        {groups.map((group: Array<IPipelineGroupProps>, i: number) => {
          if (group.length === 0) return null

          return (
            <Fragment key={i}>
              <div className={`group-box ${groupDraggable ? 'is-draggable' : ''}`}>
                <div className="group-list">
                  {group.map((g: IPipelineGroupProps, j: number) => {
                    const title = g.title || {}
                    let index = title.index || ''
                    if (Utils.isBlank(index)) {
                      index = `${i + 1}-${j + 1}`
                    }
                    return (
                      <div className="group-wrapper-box" key={j}>
                        <div className="group-wrapper">
                          <div className="group-draggable">
                            <Group
                              title={{
                                label: title.label || '',
                                index,
                              }}
                              steps={g.steps || []}
                              onStepClick={(step: IPipelineStepProps) => props.onStepClick?.(step)}
                              onStepDelete={(stepIndex: number, step: IPipelineStepProps) => props.onStepDelete?.(i, j, stepIndex, step)}
                              onGroupDelete={() => props.onGroupDelete?.(i, j, g)}
                            />
                          </div>

                          {/* 添加 step 按钮 */}
                          {getAddStepHtml(i, j)}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {allowParallelTask && (
                    <div
                        className="pipeline-stage-allow-paralle flex-center cursor-pointer"
                        onClick={() => props.onParallelTaskAdd?.(i, `pipeline-stage-${i + 1}-${group.length + 1}`)}
                    >
                      增加并行阶段
                    </div>
                )}
              </div>

              {/* 添加分组按钮 */}
              {getAddStageHtml(i + 1)}
            </Fragment>
          )
        })}
      </div>
    )
  }

  /**
   * 获取 开始 节点
   */
  const getStartHtml = () => {
    let startText = props.startText || '开始'
    return (
      <div className="pipeline-stage-start flex-center cursor-pointer">
        {Utils.getStartSvg()}
        <p className="pipeline-stage-label">{startText}</p>
      </div>
    )
  }

  /**
   * 获取 结束 节点
   */
  const getEndHtml = () => {
    let startText = props.startText || '结束'
    return (
      <div className="pipeline-stage-end flex-center cursor-pointer">
        {Utils.getEndSvg()}
        <p className="pipeline-stage-label">{startText}</p>
      </div>
    )
  }

  /**
   * 添加分组按钮
   */
  const getAddStageHtml = (index: number = 0) => {
    return (
      <div className="pipeline-state-add-group-wrapper" onClick={() => props.onGroupAdd?.(index)}>
        <div className="pipeline-state-add-group cursor-pointer">
          <span className="pipeline-state-add-button">+</span>
        </div>
      </div>
    )
  }

  const render = () => {
    return (
      <div className="pipeline-stage flex-align-start">
        {/* 开始节点 */}
        <div className="pipeline-stage-dot-box pipeline-stage-dot-start">{getStartHtml()}</div>

        {/* 添加分组按钮 */}
        {getAddStageHtml(0)}

        {/* 中间 Group 列表*/}
        {getGroupHtml()}

        {/* 结束节点 */}
        <div className="pipeline-stage-dot-box pipeline-stage-dot-end">{getEndHtml()}</div>
      </div>
    )
  }

  return render()
}

export default Pipeline
