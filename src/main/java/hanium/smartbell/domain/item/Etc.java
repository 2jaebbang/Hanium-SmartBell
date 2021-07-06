package hanium.smartbell.domain.item;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("B")
@Getter @Setter
public class Etc extends Item {
    private String capacity;
    private String temparature;
    private String size;

}
