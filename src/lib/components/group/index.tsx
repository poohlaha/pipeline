/**
 * @fileOverview 节点Group组件
 * @date 2024-03-07
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { IPipelineGroupProps, IPipelineStepProps } from '../props'
import Step from '../step'
import Utils from '../../utils'

const PipelineGroup = (props: IPipelineGroupProps): ReactElement => {
  /**
   * 获取标题
   */
  const getGroupTitleHtml = () => {
    return (
      <div className="pipeline-stage-group-title flex font-bold cursor-pointer">
        <div className="title-index flex-center">{props.title.index || ''}</div>
        <div className="title-label flex-1 flex-align-center over-ellipsis">{props.title.label || ''}</div>
        {Utils.getDeleteSvg()}
      </div>
    )
  }

  /**
   * 获取 step 列表
   */
  const getStepListHtml = () => {
    let steps = props.steps || []
    return (
      <div className="pipeline-step-list flex-direction-column">
        {steps.map((step: IPipelineStepProps, index: number) => {
          return (
            <div className="pipeline-step-item" key={index}>
              <div className="pipeline-step-line" />
              <Step label={step.label || ''}></Step>
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * 添加 step 按钮
   */
  const getAddStepHtml = () => {
    return (
        <div className="pipeline-stage-group-add-step-wrapper flex-center">
          <div className="pipeline-stage-group-add-step cursor-pointer">
            <span className="pipeline-state-add-button">+</span>
          </div>
        </div>
    )
  }

  const render = () => {
    return (
      <div className="pipeline-stage-group">
        {/* 标题 */}
        {getGroupTitleHtml()}

        {/* step 列表*/}
        {getStepListHtml()}

        {/* 添加 step 按钮 */}
        {getAddStepHtml()}
      </div>
    )
  }

  return render()
}
export default PipelineGroup
