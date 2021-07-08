package hanium.smartbell.controller;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FoodForm {
    private Long id;
    private String name;
    private int price;
    private String gram;
}