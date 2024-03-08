/**
 * @fileOverview TODO
 * @date 2023-08-28
 * @author poohlaha
 */
import React from 'react'

const Utils = {
  /**
   * 获取开始的 svg
   */
  getStartSvg: () => {
    return (
      <svg className="svg-icon" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true">
        <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path>
      </svg>
    )
  },

  /**
   * 获取结束的 svg
   */
  getEndSvg: () => {
    return (
      <svg className="svg-icon" viewBox="64 64 896 896" fill="currentColor" aria-hidden="true">
        <path d="M705.6 124.9a8 8 0 00-11.6 7.2v64.2c0 5.5 2.9 10.6 7.5 13.6a352.2 352.2 0 0162.2 49.8c32.7 32.8 58.4 70.9 76.3 113.3a355 355 0 0127.9 138.7c0 48.1-9.4 94.8-27.9 138.7a355.92 355.92 0 01-76.3 113.3 353.06 353.06 0 01-113.2 76.4c-43.8 18.6-90.5 28-138.5 28s-94.7-9.4-138.5-28a353.06 353.06 0 01-113.2-76.4A355.92 355.92 0 01184 650.4a355 355 0 01-27.9-138.7c0-48.1 9.4-94.8 27.9-138.7 17.9-42.4 43.6-80.5 76.3-113.3 19-19 39.8-35.6 62.2-49.8 4.7-2.9 7.5-8.1 7.5-13.6V132c0-6-6.3-9.8-11.6-7.2C178.5 195.2 82 339.3 80 506.3 77.2 745.1 272.5 943.5 511.2 944c239 .5 432.8-193.3 432.8-432.4 0-169.2-97-315.7-238.4-386.7zM480 560h64c4.4 0 8-3.6 8-8V88c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8z"></path>
      </svg>
    )
  },

  /**
   * 获取删除的 svg
   */
  getDeleteSvg: (onDelete?: Function) => {
    return (
      <div className="pipeline-delete" onClick={() => onDelete?.()}>
        <svg className="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 883.2A371.2 371.2 0 1 0 140.8 512 371.2 371.2 0 0 0 512 883.2z m0 64a435.2 435.2 0 1 1 435.2-435.2 435.2 435.2 0 0 1-435.2 435.2z" fill="currentColor"></path>
          <path
            d="M557.056 512l122.368 122.368a31.744 31.744 0 1 1-45.056 45.056L512 557.056l-122.368 122.368a31.744 31.744 0 1 1-45.056-45.056L466.944 512 344.576 389.632a31.744 31.744 0 1 1 45.056-45.056L512 466.944l122.368-122.368a31.744 31.744 0 1 1 45.056 45.056z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    )
  },

  /**
   * 检验字符串是否为空
   */
  isBlank: (value: string = '') => {
    return value === undefined || value == null || /^[ ]+$/.test(value) || value.length === 0 || value.trim().length === 0
  },
}

export default Utils
