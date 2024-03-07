/**
 * @fileOverview 声明流水线属性
 * @date 2023-08-28
 * @author poohlaha
 */

// step
export interface IPipelineStepProps {
  label: string
}

// group

export interface IPipelineGroupTitleProps {
  index?: string
  label: string
}

export interface IPipelineGroupProps {
  title: IPipelineGroupTitleProps
  steps: Array<IPipelineStepProps>
}

export interface IPipelineProps {
  groups: Array<Array<IPipelineGroupProps>>
  allowParallelTask?: boolean // 是否允许并行任务, 默认为 true
  startText?: string // 开始节点文本, 默认为 '开始'
  endText?: string // 结束节点文件, 默认为 '结束'
}
