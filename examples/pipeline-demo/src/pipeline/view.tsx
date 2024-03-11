import React, { ReactElement, useState } from 'react'
import type { IPipelineViewProps, IPipelineViewGroupProps } from '@bale-components/pipeline/src/index'
import { PipelineView } from '@bale-components/pipeline/src/index'


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
    let groups: Array<Array<IPipelineViewGroupProps>> = data.groups || []
    let newGroups: Array<Array<IPipelineViewGroupProps>> = groups.map(group => {
      return group.map((g: IPipelineViewGroupProps) => {
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
