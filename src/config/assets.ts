/**
 * Tài nguyên ngoài (GIF) và đường dẫn audio.
 * Đổi link GIF tại đây — web tự cập nhật ngay.
 *
 * AUDIO: bỏ file mp3 vào public/audio/ đúng tên — nếu chưa có, web vẫn chạy bình thường.
 */
export const assets = {
  /**
   * GIF gấu đôi Milk & Mocha — mỗi màn một cảm xúc.
   * Tất cả đều từ bộ milkmochabear (white bear + brown bear).
   */
  bears: {
    /** Intro — Milk bear trắng ngồi trên trái tim hồng nảy, rất cute */
    intro:    "https://media.giphy.com/media/kfRKF0iqA8jyDqq1nH/giphy.gif",
    /** Ask — gấu nâu tức giận / thất vọng (năn nỉ mà không được) */
    ask:      "https://media.giphy.com/media/L3iXjPw1GoEk0nioqY/giphy.gif",
    /** DateTime — cặp đôi Milk & Mocha nảy lên cùng trái tim */
    datetime: "https://media.giphy.com/media/JoUoAzZEjEy9PrZ98N/giphy.gif",
    /** Confirm — cặp đôi tình tứ bên nhau */
    confirm:  "https://media.giphy.com/media/qAGW5seF4FIVVV97dI/giphy.gif",
    /** Success — cặp gấu ôm nhau, trái tim bay — màn ăn mừng quan trọng nhất */
    success:  "https://media.giphy.com/media/fvN5KrNcKKUyX7hNIA/giphy.gif",
  },

  gifs: {
    success: [] as string[],
    confirm: [] as string[],
  },

  audio: {
    bgMusic: "/audio/bg-music.mp3",
    pop:     "/audio/pop.mp3",
    success: "/audio/success.mp3",
  },
} as const;
