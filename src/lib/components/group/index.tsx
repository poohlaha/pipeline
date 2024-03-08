/**
 * @fileOverview 节点Group组件
 * @date 2024-03-07
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import {IPipelineGroup, IPipelineStepProps} from '../props'
import Step from '../step'
import Utils from '../../utils'

const PipelineGroup = (props: IPipelineGroup): ReactElement => {

  /**
   * 获取标题
   */
  const getGroupTitleHtml = () => {
    return (
      <div className="pipeline-stage-group-title flex font-bold cursor-pointer">
        <div className="title-index flex-center">{props.title.index || ''}</div>
        <div className="title-label flex-1 flex-align-center over-ellipsis">{props.title.label || ''}</div>
        {Utils.getDeleteSvg(props.onGroupDelete)}
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
              <Step
                  label={step.label || ''}
                  onStepClick={() => props.onStepClick?.(step)}
                  onDelete={() => props.onStepDelete?.(index, step)}
              />
            </div>
          )
        })}
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
      </div>
    )
  }

  return render()
}
export default PipelineGroup
