import React, { ReactElement, useState } from 'react'
import type { IPipelineViewProps } from '../pipeline-draggable'
import { PipelineView } from '../pipeline-draggable'

interface IPipelineStageViewProps {
  data: IPipelineViewProps
}

const PipelineStageView = (props: IPipelineStageViewProps): ReactElement => {
  const getStepFooterHtml = () => {
    return (
      <div className="step-footer">
        <p className="step-footer-left">日志</p>
        <p className="step-footer-right">0s</p>
      </div>
    )
  }

  const getData = () => {
    let data = { ...props.data }
    let groups = data.groups || []
    let newGroups = groups.map(group => {
      return group.map(g => {
        g.title.footer = getStepFooterHtml()
        return g
      })
    })

    return { ...data, groups: newGroups }
  }

  const [data, setData] = useState(getData())

  return (
    <div className="pipeline-stage-view-wrapper">
      <PipelineView {...data} />
    </div>
  )
}

export default PipelineStageView
