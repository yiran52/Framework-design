import { create } from 'zustand';

// 定义状态类型
interface ModalState {
    isModalVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

// 使用 Zustand 创建状态管理
const useModalStore = create<ModalState>((set) => ({
    isModalVisible: false, // 弹窗初始状态为隐藏
    showModal: () => set({ isModalVisible: true }), // 显示弹窗
    hideModal: () => set({ isModalVisible: false }), // 隐藏弹窗
}));

export default useModalStore;




