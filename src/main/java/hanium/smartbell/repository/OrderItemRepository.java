package hanium.smartbell.repository;

import hanium.smartbell.domain.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class OrderItemRepository {
    private final EntityManager em;
    public void save(OrderItem orderItem) {
        em.persist(orderItem);
    }
    public OrderItem findOne(Long id) {
        return em.find(OrderItem.class, id);
    }
}
