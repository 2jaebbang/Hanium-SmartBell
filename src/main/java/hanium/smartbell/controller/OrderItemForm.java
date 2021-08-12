package hanium.smartbell.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemForm {
    private Long orderId;
    private Long itemId;
    private String name;
    private int amount;
    private String temperature;
    private String size;
}