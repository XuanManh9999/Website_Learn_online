import "./HeaderLearning.scss"
import { LeftOutlined, FileOutlined } from "@ant-design/icons"
import { Progress } from "antd"
import { Link } from "react-router-dom"
function HeaderLearning() {
    return (
        <div className="wrapper_learning">
            <header className="container-header-learning">
                <div className="container-header-learning-left">
                    <Link to={"/"}>
                        <LeftOutlined />
                    </Link>
                    <Link to={"/"}>
                        <img src="https://i.ibb.co/WGwmWhQ/DALL-E-2024-10-24-18-11-13-A-logo-of-a-circular-shape-resembling-a-stylized-C-in-harmonious-gradient.webp" alt="logo" />
                    </Link>
                    <h1>Kiến thức nhập môn IT</h1>
                </div>
                <div className="container-header-learning-reight">
                    <div className="container-header-learning-reight-process">
                        <Progress size={50} type="circle" percent={92} strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} />
                        <strong>11/12 bài học</strong>
                    </div>
                    <div className="container-header-learning-reight-note">
                        <FileOutlined />
                        <strong>Ghi chú</strong>
                    </div>
                </div>
            </header>
        </div>

    )
}
export default HeaderLearning