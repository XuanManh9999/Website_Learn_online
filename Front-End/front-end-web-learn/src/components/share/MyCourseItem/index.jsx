import React from 'react'
import { Progress } from "antd"
export default function MyCourseItem({ img, title = 'App "Đừng Chạm Tay Lên Mặt"', time, process, nameClass }) {
  return (
    <div className={`container-my-course__item-${nameClass}`}>
      <img src={img} alt={title} />
      <div className={`container-my-course__item--desc-${nameClass}`}>
        {nameClass != "bell" ? <h3>{title}</h3> : <strong>{title}</strong>}

        <span>Học cách đây một năm trước</span>
        {nameClass != "bell" && <Progress status='active' strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }} percent={80} size="small" />}

      </div>
    </div>
  )
}
