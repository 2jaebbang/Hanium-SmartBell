package hanium.smartbell.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="orders")
@Getter @Setter
public class Order implements Serializable {

    @Id @GeneratedValue
    @Column(name="order_id")
    private Long id;

//     @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "order_id")
//    private OrderItem orderItem;

    private String guestId;

    private String url;

    private LocalDateTime orderDate; //주문시간

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

        order.setTotalPrice(orderItemTotalPrice);
        order.setStatus(OrderStatus.OREDERD);
        order.setOrderDate(LocalDateTime.now());
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


    //==조회 로직==//
    /** 전체 주문 가격 조회 */
    public int getTotalPrice() {
        return getTotalPrice();
    }
}
