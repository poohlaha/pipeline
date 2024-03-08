/**
 * @fileOverview 声明流水线属性
 * @date 2023-08-28
 * @author poohlaha
 */

// step
export interface IPipelineStepProps {
  label: string
  [property: string]: any
}

// group

export interface IPipelineGroupTitleProps {
  index?: string
  label: string
}

export interface IPipelineGroupProps {
  title: IPipelineGroupTitleProps
  steps: Array<IPipelineStepProps>
  [property: string]: any
}

export interface IPipelineProps {
  groups: Array<Array<IPipelineGroupProps>>
  allowParallelTask?: boolean // 是否允许并行任务, 默认为 true
  startText?: string // 开始节点文本, 默认为 '开始'
  endText?: string // 结束节点文件, 默认为 '结束'
  onGroupDrag?: Function // Group 拖拽
  onGroupAdd?: (index: number) => void // 添加分组
  onGroupDelete?: (groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => void // 删除分组
  onStepAdd?: (groupIndex: number, groupChildIndex: number) => void // 添加步骤
  onStepClick?: (step: IPipelineStepProps) => void // step 点击事件
  onStepDelete?: (groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => void // step 删除事件
  onParallelTaskAdd?: (groupIndex: number, defaultText: string) => void // 添加并行任务
}

export interface IPipelineStep extends IPipelineStepProps{
  onClick?: () => void // step 点击事件
  onDelete?: () => void // step 删除事件
}

export interface IPipelineGroup extends IPipelineGroupProps{
  onStepClick?: (step: IPipelineStepProps) => void // step 点击事件
  onStepDelete?: (stepIndex: number, step: IPipelineStepProps) => void // step 删除事件
  onGroupDelete?: () => void // group 删除事件
}
