package hanium.smartbell.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name="orders")
@Getter @Setter
public class Order{


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARD_SEQ_GENERATOR")
    @Column(name="order_id")
    private Long orderId;

//     @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "order_id")
//    private OrderItem orderItem;


    //orderItem에서의 order_id
    private Long orItemId;

    private String guestId;

    private String url;

    private String orderDate; //주문시간

    private OrderStatus status; //주문상태 [ORDERED, COMPLETED, RECIEVED]

    private int totalPrice;


    //==연관관계 메서드==//
//    public void addOrderItem(OrderItem orderItem) {
//        orderItem.set(this);
//    }

    //== 주문도메인개발(주문,주문상품 엔티티 개발) ==//
    //==생성 메서드==//
    public static Order createOrder(List<OrderItem> orderItems) { //... <-여러개  넘김
        int orderItemTotalPrice = 0;
        Order order = new Order();
        for (OrderItem orderItem : orderItems) {
                orderItemTotalPrice += orderItem.getOrderItemTotalPrice();
        }

        //orderItem의 orderId 저장
        order.setOrItemId(orderItems.get(0).getOrderId());

        order.setTotalPrice(orderItemTotalPrice);
        order.setStatus(OrderStatus.ORDERED);
        order.setOrderDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return order;
    }

    //==비즈니스 로직==//
    /** 제조완료 */
    public void complete() {
        this.setStatus(OrderStatus.COMPLETED);
    }

    /** 수령완료 */
    public void recieve() {
        this.setStatus(OrderStatus.RECIEVED);
    }

}
