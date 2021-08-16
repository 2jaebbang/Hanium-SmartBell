package hanium.smartbell.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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

    //== 주문도메인개발(주문,주문상품 엔티티 개발) ==//
    //==생성 메서드==//
    public static Order createOrderTest(){
        Order order = new Order();
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
