/**
 * @fileOverview 节点Group组件
 * @date 2024-03-07
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import { IPipelineGroup, IPipelineStatus, IPipelineStepProps } from '../props'
import Step from '../step'
import Utils from '../../utils'

const PipelineGroup = (props: IPipelineGroup): ReactElement => {
  /**
   * 获取状态样式
   */
  const getStatusClass = () => {
    let status = props.status
    if (!status) return ''

    if (status === IPipelineStatus.Process) {
      return 'group-process'
    }

    if (status === IPipelineStatus.Success) {
      return 'group-success'
    }

    if (status === IPipelineStatus.Failed) {
      return 'group-failed'
    }

    if (status === IPipelineStatus.Stop) {
      return 'group-stop'
    }

    return ''
  }

  /**
   * 获取标题
   */
  const getGroupTitleHtml = () => {
    let showDelete = props.showDelete
    if (showDelete === null || showDelete === undefined) {
      showDelete = true
    }

    let statusClass = getStatusClass()
    return (
      <div className={`pipeline-stage-group-title flex font-bold cursor-pointer ${statusClass || ''}`}>
        <div className="pipeline-stage-group-title-content flex-align-center" onClick={() => props.onGroupClick?.()}>
          <div className="title-index flex-center">{props.title.index || ''}</div>
          <div className="title-label flex-1 flex-align-center over-ellipsis">
            <p>{props.title.label || ''}</p>
            <div className="title-label-footer">{props.title.footer}</div>
          </div>
        </div>

        {showDelete && Utils.getDeleteSvg(props.onGroupDelete)}
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
              <Step label={step.label || ''} onStepClick={() => props.onStepClick?.(index, step)} onDelete={() => props.onStepDelete?.(index, step)} showDelete={props.showDelete} />
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
