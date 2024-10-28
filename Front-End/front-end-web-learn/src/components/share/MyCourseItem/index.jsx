import React from 'react'
import { Progress } from "antd"
export default function MyCourseItem({ img, title = 'App "Đừng Chạm Tay Lên Mặt"', time, process }) {
  return (
    <div className='container-my-course__item'>
      <img src={img} alt={title} />
      <div className='container-my-course__item--desc'>
        <h3>{title}</h3>
        <span>Học cách đây một năm trước</span>
        <Progress status='active'  strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }} percent={80} size="small" />
      </div>
    </div>
  )
}
