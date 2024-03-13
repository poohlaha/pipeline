/**
 * @fileOverview 流水线阶段查看
 * @date 2024-03-08
 * @author poohlaha
 */
import React, { Fragment, ReactElement, useState } from 'react'
import { IPipelineViewProps } from './props'
import Utils from '../utils'
import Group from './group'
import '../css/index.less'

const PipelineView = (props: IPipelineViewProps): ReactElement => {
  const [groupDraggable, setGroupDraggable] = useState(false)

  /**
   * 获取 Group 节点
   */
  const getGroupHtml = () => {
    const groups = props.groups || []

    return (
      <div className="pipeline-stage-group-list flex">
        {groups.map((group, i: number) => {
          if (group.length === 0) return null

          return (
            <Fragment key={i}>
              <div className={`group-box ${groupDraggable ? 'is-draggable' : ''}`}>
                <div className="group-list">
                  {group.map((g, j: number) => {
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
                                footer: title.footer,
                              }}
                              steps={g.steps || []}
                              status={g.status}
                              showDelete={false}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
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
      <div className="pipeline-state-add-group-wrapper">
        <div className="pipeline-state-add-group cursor-pointer">
          <span className="pipeline-state-add-button">+</span>
        </div>
      </div>
    )
  }

  const render = () => {
    return (
      <div className={`pipeline-stage-view flex-align-start ${props.className}`}>
        {/* 开始节点 */}
        <div className="pipeline-stage-dot-box pipeline-stage-dot-start">{getStartHtml()}</div>

        {/* 中间 Group 列表*/}
        {getGroupHtml()}

        {/* 结束节点 */}
        <div className="pipeline-stage-dot-box pipeline-stage-dot-end">{getEndHtml()}</div>
      </div>
    )
  }

  return render()
}

export default PipelineView
