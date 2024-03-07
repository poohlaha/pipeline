/**
 * @fileOverview 流水线
 * @date 2023-08-28
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { IPipelineGroupProps, IPipelineProps } from './props'
import Utils from '../utils'
import Group from './group'
import '../css/index.css'

const Pipeline = (props: IPipelineProps): ReactElement => {
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
              <>
                <div className="group-box" key={i}>
                  <div className="group-list">
                    {
                      group.map((g: IPipelineGroupProps, j: number) => {
                        const title = g.title || {}
                        let index = title.index || ''
                        if (Utils.isBlank(index)) {
                          index = `${i + 1}-1`
                        }
                        return (
                            <div className="group-wrapper-box" key={j}>
                              <div className="group-wrapper">
                                <Group
                                    title={{
                                      label: title.label || '',
                                      index,
                                    }}
                                    steps={g.steps || []}
                                />
                              </div>
                            </div>
                        )
                      })
                    }
                  </div>

                  {allowParallelTask && <div className="pipeline-stage-allow-paralle flex-center">增加并行阶段</div>}
                </div>

                {/* 添加分组按钮 */}
                {getAddStageHtml()}
              </>
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
  const getAddStageHtml = () => {
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
      <div className="pipeline-stage flex-align-start">
        {/* 开始节点 */}
        <div className="pipeline-stage-dot-box pipeline-stage-dot-start">{getStartHtml()}</div>

        {/* 添加分组按钮 */}
        {getAddStageHtml()}

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
