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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private Item item;

    private int orderPrice; //주문 가격
    private int amount; //주문 수량
    private int sizeUp;
    private String temperature;
    private String size;

    private int rate;

    //== 주문, 주문상품 엔티티 개발==//
    //==생성 메서드==//
    public static OrderItem createOrderItem(Long orderId, Item item, int orderPrice, String temperature, String size, int amount, int sizeUp) {
        OrderItem orderItem = new OrderItem();
        orderItem.setOrderId(orderId);
        orderItem.setItem(item);
        orderItem.setOrderPrice(orderPrice);
        orderItem.setTemperature(temperature);
        orderItem.setSize(size);
        orderItem.setAmount(amount);
        orderItem.setSizeUp(sizeUp);

        return orderItem;
    }


    //==조회 로직==//
    /** 주문상품 가격 조회 */
    public int getOrderItemTotalPrice() {
        int totalPrice = 0;

        if(getItem().getCategory().equals("beverage")){

            if(getSize().equals("tall")){
                totalPrice += getOrderPrice()*getAmount();
            } else if(getSize().equals("grande")){
                totalPrice += (getOrderPrice()+ getSizeUp())*getAmount();
            } else if(getSize().equals("venti")){
                totalPrice += (getOrderPrice()+ getSizeUp()*2)*getAmount();
            }
        } else {
            totalPrice += getOrderPrice() * getAmount();
        }
        return totalPrice;
    }
}