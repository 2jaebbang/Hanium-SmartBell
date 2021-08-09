package hanium.smartbell.repository;

import hanium.smartbell.domain.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderSearch {
    private String orderNumber; //주문 번호
    private OrderStatus orderStatus;//주문 상태[ORDERED, COMPLETED, RECEIVED]

}
