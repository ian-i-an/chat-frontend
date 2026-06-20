// 1. 날짜 구분선용: "2026년 6월 15일" 형태로 반환
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // weekday: "short", // 💡 "(월)" 같은 요일을 원하시면 이 줄의 주석을 푸세요!
  }).format(date);
};

// 2. 말풍선 시간용: "오후 11:04" 형태로 반환
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 오전/오후 표시
  }).format(date);
};

export const isSameDay = (dateStr1: string, dateStr2: string) => {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
