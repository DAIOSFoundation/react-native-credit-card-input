export const deliveryState = (data) => {
  switch (data) {
    case 101:
      return '결제 완료';
    case 102:
      return '상품 준비중';
    case 103:
      return '배송 보류';
    case 104:
      return '배송 준비';
    case 105:
      return '배송 중';
    case 106:
      return '배송 완료';
    case 107:
      return '구매 확정';
    case 181:
      return '결제 취소';
    case 0:
      return '주문생성(결제전)';
    default:
      return data;
  }
};
