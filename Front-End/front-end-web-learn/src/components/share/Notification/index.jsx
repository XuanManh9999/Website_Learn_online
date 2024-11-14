import { notification } from 'antd';

const useNotify = () => {
    const [api, contextHolder] = notification.useNotification();

    const notify = (type, description, showProgress = true, duration = 2) => {
        api[type]({
            message: "Thông báo",
            description,
            showProgress,
            duration,
        });
    };

    return { notify, contextHolder };
};

export default useNotify;
