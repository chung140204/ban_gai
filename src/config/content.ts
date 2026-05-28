import type { TimeSlot } from "@/lib/types";

/**
 * Toàn bộ nội dung hiển thị nằm ở đây — sửa 1 chỗ là đổi cả web.
 * Đổi tên, câu hỏi, nhãn nút, khung giờ... thoải mái.
 */
export const content = {
  meta: {
    title: "Đi chơi với anh nha? 🥺💖",
    description: "Một lời mời nhỏ xinh dành riêng cho người đặc biệt.",
  },

  names: {
    sender: "anh",
    recipient: "em",
  },

  intro: {
    badge: "Thư mời siêu cấp dễ thương 💌",
    title: "Gửi người anh thương 🥰",
    subtitle: "Có một câu hỏi nhỏ xíu đang đợi em mở ra nè...",
    cta: "Mở thư nào 💝",
  },

  ask: {
    question: "Cuối tuần này đi chơi với anh không? 🥺",
    subtitle: "Suy nghĩ kỹ rồi bấm nha (mà bấm Có cho anh vui 🥹)",
    yesLabel: "Cóooo ❤️",
    // Nút "Không" sẽ đổi ngẫu nhiên qua các câu này mỗi lần né
    noLabels: [
      "Không 😡",
      "Chắc chưa? 🥺",
      "Suy nghĩ lại đi 😤",
      "Hông được đâu 😝",
      "Bấm Có đi màaa 🥹",
      "Anh buồn đó nha 😢",
      "Thiệt hông á? 👉👈",
      "Đừng mà 😭",
      "Em nỡ lòng nào 💔",
      "Một lần thôi nhaaa 🙏",
    ],
    // Mỗi lần né nút Không, nút Có to thêm bao nhiêu (và giới hạn)
    yesGrowthPerDodge: 0.16,
    maxYesScale: 2.4,
    // Sau bao nhiêu lần né thì nút Không gần như không thể bấm
    dodgesUntilImpossible: 7,
  },

  datetime: {
    title: "Yeee! Vậy mình hẹn nhau khi nào nè? 🗓️",
    subtitle: "Chọn một ngày thật xinh cho buổi hẹn của tụi mình nha 💕",
    pickDatePrompt: "Chọn ngày bên trên trước nha 👆",
    timeTitle: "Mình gặp nhau lúc nào? ⏰",
    continueLabel: "Tiếp tục 💗",
    weekendHint: "Cuối tuần được tô hồng nè 💞",
    timeSlots: [
      { id: "morning",   label: "Buổi sáng",  emoji: "☀️", hours: [6,7,8,9,10,11] },
      { id: "noon",      label: "Buổi trưa",  emoji: "🍜", hours: [11,12,13,14] },
      { id: "afternoon", label: "Buổi chiều", emoji: "☕", hours: [14,15,16,17,18] },
      { id: "evening",   label: "Buổi tối",   emoji: "🌙", hours: [18,19,20,21,22] },
    ] satisfies TimeSlot[],
    hourLabel: "Chọn giờ cụ thể ⏰",
  },

  confirm: {
    title: "Để anh chốt lại nha 📌",
    intro: "Mình sẽ đi chơi vào",
    atWord: "lúc",
    closing: "Anh sẽ đến đón em đúng giờ nha! 🚗💨",
    changeLabel: "Đổi lại 🙈",
    confirmLabel: "Chốt đơn! 💖",
  },

  success: {
    title: "Hẹn hò thành công! 🎉💞",
    message:
      "Cảm ơn em đã nhận lời nha. Anh sẽ làm cho buổi hẹn này thật đáng yêu cho mà xem! 🥰",
    summaryPrefix: "Lịch hẹn của tụi mình:",
    restartLabel: "Chọn lại từ đầu 🔁",
    // Nếu không có GIF (assets.gifs.success rỗng) sẽ hiện hiệu ứng emoji thay thế
    fallbackEmojis: ["💖", "🧸", "🌸", "💌", "🎀", "💕"],
  },

  music: {
    onLabel: "Tắt nhạc",
    offLabel: "Bật nhạc",
  },
} as const;

export type Content = typeof content;
