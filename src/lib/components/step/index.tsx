/**
 * @fileOverview 节点组件
 * @date 2024-03-07
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import Utils from '../../utils'
import {IPipelineStep} from '../props'

const PipelineStep = (props: IPipelineStep): ReactElement => {
  const render = () => {
    return (
      <div className="pipeline-step-wrapper cursor-pointer">
        <div className="pipeline-step-box flex-center" onClick={() => props.onStepClick?.()}>
          <div className="pipeline-step-label over-ellipsis">{props.label || ''}</div>
        </div>
          {Utils.getDeleteSvg(props.onDelete)}
      </div>
    )
  }

  return render()
}
export default PipelineStep
