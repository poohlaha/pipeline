/**
 * @fileOverview 节点组件
 * @date 2024-03-07
 * @author poohlaha
 */
import React, { ReactElement } from 'react'
import Utils from '../../utils'
import { IPipelineStepProps } from '../props'

const PipelineStep = (props: IPipelineStepProps): ReactElement => {
  const render = () => {
    return (
      <div className="pipeline-step-wrapper cursor-pointer">
        <div className="pipeline-step-box flex-align-center">
          <div className="pipeline-step-label over-ellipsis">{props.label || ''}</div>
          {Utils.getDeleteSvg()}
        </div>
      </div>
    )
  }

  return render()
}
export default PipelineStep
