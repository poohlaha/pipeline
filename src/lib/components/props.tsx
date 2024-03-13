/**
 * @fileOverview 声明流水线属性
 * @date 2023-08-28
 * @author poohlaha
 */
import React, { ReactElement } from 'react'

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
  className?: string
  groups: Array<Array<IPipelineGroupProps>>
  allowParallelTask?: boolean // 是否允许并行任务, 默认为 true
  startText?: string // 开始节点文本, 默认为 '开始'
  endText?: string // 结束节点文件, 默认为 '结束'
  onGroupClick?: (groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => void // Group 点击事件
  onGroupAdd?: (index: number) => void // 添加分组
  onGroupDelete?: (groupIndex: number, groupChildIndex: number, group: IPipelineGroupProps) => void // 删除分组
  onStepAdd?: (groupIndex: number, groupChildIndex: number) => void // 添加步骤
  onStepClick?: (groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => void // step 点击事件
  onStepDelete?: (groupIndex: number, groupChildIndex: number, stepIndex: number, step: IPipelineStepProps) => void // step 删除事件
  onParallelTaskAdd?: (groupIndex: number, defaultText: string) => void // 添加并行任务
}

export interface IPipelineGroupTitle extends IPipelineGroupTitleProps {
  footer?: ReactElement
}

export interface IPipelineStep extends IPipelineStepProps {
  showDelete?: boolean
  onClick?: () => void // step 点击事件
  onDelete?: () => void // step 删除事件
}

export interface IPipelineGroup {
  title: IPipelineGroupTitle
  steps: Array<IPipelineStepProps>
  status?: IPipelineStatus // 运行状态
  showDelete?: boolean
  onGroupClick?: () => void // group 点击事件
  onStepClick?: (index: number, step: IPipelineStepProps) => void // step 点击事件
  onStepDelete?: (stepIndex: number, step: IPipelineStepProps) => void // step 删除事件
  onGroupDelete?: () => void // group 删除事件
  [property: string]: any
}

// stage
export interface IPipelineViewProps {
  className?: string
  groups: Array<Array<IPipelineViewGroupProps>>
  step?: Array<number> // 当前运行到哪一步
  startText?: string // 开始节点文本, 默认为 '开始'
  endText?: string // 结束节点文件, 默认为 '结束'
}

export interface IPipelineViewGroupProps extends IPipelineGroupProps {
  title: IPipelineGroupTitle
  steps: Array<IPipelineStepProps>
  status?: IPipelineStatus // 运行状态
}

export enum IPipelineStatus {
  No, // 尚未运行
  Process, // 构建中
  Success, // 运行成功
  Failed, // 运行失败
  Stop, // 中止运行
}
