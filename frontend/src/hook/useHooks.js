import { create } from "zustand";
const useHooks = create((set) => ({
  fileList: [],
  setFileList: (param) => set((state) => ({ fileList: param })),
  location: {
    lat: 25.017622284161067,
    lng: 121.5378841549027,
  },
  setLocation: (param) => set((state) => ({ location: param })),
  group: false,
  setGroup: (param) => set((state) => ({ group: param })),
}));
export { useHooks };
