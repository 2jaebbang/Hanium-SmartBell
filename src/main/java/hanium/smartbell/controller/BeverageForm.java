package hanium.smartbell.controller;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BeverageForm {
    private Long id;
    private String name;
    private int price;
    private String temparature;
    private int sizeUp;
}
