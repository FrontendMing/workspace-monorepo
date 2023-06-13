// 手动导入vant中的通知组件及样式文件
import { showNotify } from "vant";
import "vant/es/notify/style";

// 手动导入element-plus中的通知组件及样式文件
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

// 导入剪切板基础依赖
import Clipboard from "clipboard";
// 导入vueuse/core 中监听浏览器端点变化的函数
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const sm = useBreakpoints(breakpointsTailwind).smaller("sm");

/* 依据sm值的变化来改变使用不同的通知风格 */
export const clipboardSuccess = () =>
  sm.value
    ? showNotify({
        message: "Copy successfully",
        type: "success",
        duration: 1500,
      })
    : ElMessage({
        message: "Copy successfully",
        type: "success",
        duration: 1500,
      });

/* 依据sm值的变化来改变使用不同的通知风格 */
export const clipboardError = () =>
  sm.value
    ? Notify({
        message: "Copy failed",
        type: "danger",
      })
    : ElMessage({
        message: "Copy failed",
        type: "error",
      });

export const handleClipboard = (text: string, event: MouseEvent) => {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text,
  });
  clipboard.on("success", () => {
    // 在复制成功后提示成功通知内容
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    // 在复制失败后提示失败通知内容
    clipboardError();
    clipboard.destroy();
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (clipboard as any).onClick(event);
};
