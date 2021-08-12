package hanium.smartbell.domain;

import hanium.smartbell.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@SequenceGenerator(
        name="BOARD_SEQ_GENERATOR",
        sequenceName="BOARD_SEQ",
        initialValue=1, allocationSize = 1
)
@Getter @Setter
public class OrderItem implements Serializable {

    @Id
    @Column(name="order_item_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARD_SEQ_GENERATOR")
    private Long orderItemId;


    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int orderPrice; //주문 가격
    private int amount; //주문 수량
    private String temperature;
    private String size;

    //== 주문, 주문상품 엔티티 개발==//
    //==생성 메서드==//
    public static OrderItem createOrderItem(Long orderId, Item item, int orderPrice, String temperature, String size, int amount) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(orderId);
        orderItem.setItem(item);
        orderItem.setOrderPrice(orderPrice);
        orderItem.setTemperature(temperature);
        orderItem.setSize(size);
        orderItem.setAmount(amount);

        return orderItem;
    }


    //==조회 로직==//
    /** 주문상품 전체 가격 조회 */
    public int getTotalPrice() {
        return getOrderPrice() * getAmount();
    }
}