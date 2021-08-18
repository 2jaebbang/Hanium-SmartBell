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

    public OrderItem findOne(Long orderItemId) {
        return em.find(OrderItem.class, orderItemId);
    }

    public List<OrderItem> findAll() {
        return em.createQuery("select i from OrderItem i",OrderItem.class).getResultList();
    }

    //해당 orderId의 OrderItem을 검색
    public  List<OrderItem> findOrder(Long orderId) {
        String query = "select i from OrderItem i where i.order = "+orderId;
        return em.createQuery(query,OrderItem.class).getResultList();
    }


    //해당 orderItemId의 OrderItem을 검색
    public List<OrderItem> findOrderItems(Long orderItemId) {
        String query = "select i from OrderItem i where i.orderItemId = "+orderItemId;
        return em.createQuery(query, OrderItem.class).getResultList();
    }

    //해당 OrderId의 orderItem 삭제
    public void deleteOrderItem(Long orderId) {
        em.remove(findOrder(orderId));
    }
}
