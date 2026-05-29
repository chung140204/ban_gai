import type { LocationPreset, TimeSlot } from "@/lib/types";

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

  location: {
    title: "Mình đi đâu nào? 🗺️",
    subtitle: "Chọn địa điểm cho buổi hẹn của tụi mình nha!",
    presets: [
      { id: "cafe",       label: "Cafe",        emoji: "☕" },
      { id: "park",       label: "Công viên",   emoji: "🌳" },
      { id: "cinema",     label: "Xem phim",    emoji: "🎬" },
      { id: "restaurant", label: "Nhà hàng",    emoji: "🍽️" },
      { id: "bubbletea",  label: "Trà sữa",     emoji: "🧋" },
      { id: "shopping",   label: "Shopping",    emoji: "🛍️" },
      { id: "dessert",    label: "Ăn bánh ngọt", emoji: "🍰" },
      { id: "beach",      label: "Biển / Hồ",   emoji: "🏖️" },
    ] satisfies LocationPreset[],
    customPlaceholder: "Hoặc gõ địa điểm khác...",
    foodTitle: "Ăn gì nào? 🎲",
    foodSpin: "Random đồ ăn!",
    foods: [
      // Phở & Bún
      "Phở bò 🍜", "Phở gà 🍜", "Bún bò Huế 🍜",
      "Bún chả 🥩", "Bún riêu 🦀", "Hủ tiếu 🍜",
      // Cơm
      "Cơm tấm 🍖", "Cơm niêu 🍚", "Cơm gà 🍗",
      "Cơm sườn 🍖", "Cơm phần gia đình 🍱",
      // Bánh & cuốn
      "Bánh mì 🥖", "Bánh xèo 🥞", "Bánh cuốn 🫔",
      "Bánh tráng cuốn thịt heo 🌯", "Gỏi cuốn 🌯",
      "Nem rán 🥟", "Nem lụi 🍢", "Nem nướng 🍢", "Chả cá 🐟",
      // Món bò
      "Bò kho 🍲", "Bò né 🥩", "Bò bít tết 🥩",
      // Món gà & vịt
      "Gà nướng 🍗", "Gà rán 🍗", "Vịt quay 🦆",
      // Món truyền thống
      "Cá kho tộ 🐟", "Canh chua 🥣", "Thịt kho tàu 🍖",
      "Rau muống xào tỏi 🥬",
      // Lẩu
      "Lẩu thái 🫕", "Lẩu gà lá é 🫕", "Lẩu bò 🫕",
      "Lẩu hải sản 🦐", "Lẩu riêu cua bắp bò 🦀",
      // Nướng
      "Thịt nướng 🔥", "Thịt xiên nướng 🍢", "Bò nướng 🥩",
      "Sườn nướng 🍖", "Hải sản nướng 🦞",
      // Buffet
      "Buffet nướng 🔥", "Buffet lẩu 🫕",
      // Ốc & chân gà
      "Ốc luộc 🐚", "Ốc xào me 🐚",
      "Chân gà nướng 🍗", "Chân gà sốt Thái 🌶️",
      // Món khác
      "Pizza 🍕", "Mì cay 🌶️", "Tokbokki 🌶️", "Sushi 🍱", "Dimsum 🥟",
    ],
    activityTitle: "Làm gì nào? 🎲",
    activitySpin: "Random hoạt động!",
    activities: [
      // Lãng mạn & gắn kết
      "Chụp ảnh couple cùng nhau 📸",
      "Ngắm hoàng hôn cùng nhau 🌅",
      "Đi dạo bờ hồ nắm tay 🚶‍♀️",
      "Picnic công viên 🧺",
      "Ngắm sao buổi tối ✨",
      "Thả đèn hoa đăng 🏮",
      // Trải nghiệm cùng nhau
      "Xem phim chiếu rạp 🎬",
      "Karaoke hát đôi 🎤",
      "Làm bánh cùng nhau 🧁",
      "Cùng nhau nấu ăn 🍳",
      "Vẽ tranh / gốm cùng nhau 🎨",
      "Xem triển lãm nghệ thuật 🖼️",
      // Vui chơi năng động
      "Chơi bowling 🎳",
      "Chơi game arcade 🕹️",
      "Đạp xe đôi quanh phố 🚲",
      "Trượt patin cùng nhau ⛸️",
      "Chèo SUP / đạp vịt 🚣",
      // Nhẹ nhàng thư giãn
      "Uống cà phê ngắm mưa ☕",
      "Ngồi tám chuyện tâm sự 💬",
      "Đọc sách chung một góc 📚",
      "Đi nhà sách chọn quà 🎁",
      "Cùng nhau đi chợ đêm 🏮",
    ],
    continueLabel: "Chốt địa điểm! 📍",
    skipLabel: "Để sau tính 😊",
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
