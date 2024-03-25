import { createApp } from 'vue'
import Toast from './Toast.vue'

const createToast = (message, option = {}) => {
    const mountNode = document.createElement('div')
    const Instance = createApp(Toast, {
        show: true,
        message,
        ...option,
        close: () => { 
            Instance.unmount(mountNode); 
            document.body.removeChild(mountNode);
        }
    })

    document.body.appendChild(mountNode)
    Instance.mount(mountNode)
}

export default createToast
