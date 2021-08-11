package hanium.smartbell.domain;

import hanium.smartbell.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "order_item")
@Getter @Setter
public class OrderItem implements Serializable {

    @Id @GeneratedValue
    @Column(name="order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int orderPrice; //주문 가격
    private int amount; //주문 수량
    private String temperature;
    private String size;

    //== 주문, 주문상품 엔티티 개발==//
    //==생성 메서드==//
    public static OrderItem createOrderItem(Item item, int orderPrice, String temperature, String size, int amount) {
        OrderItem orderItem = new OrderItem();
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