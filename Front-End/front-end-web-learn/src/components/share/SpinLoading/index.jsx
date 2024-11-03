import { Flex, Spin } from 'antd'
import React from 'react'

export default function SpinLoading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: "center",
            height: '100vh'
        }}  >
            <Flex align="center" gap="middle">
                <Spin size="large" />
            </Flex>
        </div>
    )
}
