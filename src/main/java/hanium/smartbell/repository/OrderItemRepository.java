package hanium.smartbell.repository;

import hanium.smartbell.domain.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

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

    public List<OrderItem> findAll() {
        return em.createQuery("select i from OrderItem i",OrderItem.class).getResultList();
    }

    public  List<OrderItem> findOrder(Long orderId) {
        String query = "select i from OrderItem i where i.orderId = "+orderId;
        return em.createQuery(query,OrderItem.class).getResultList();
    }
}
