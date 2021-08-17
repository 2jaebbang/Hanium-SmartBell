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

    //해당 orderId의 OrderItem을 검색
    public  List<OrderItem> findOrder(Long orderId) {
        String query = "select i from OrderItem i where i.order = "+orderId;
        return em.createQuery(query,OrderItem.class).getResultList();
    }

    //해당 itemId의 OrderItem을 검색
    public List<OrderItem> findOrderByItemId(Long itemId) {
        String query = "select i from OrderItem i where i.item = "+itemId;
        return em.createQuery(query, OrderItem.class).getResultList();
    }

    //해당 OrderId의 orderItem 삭제
    public void deleteOrderItem(Long orderId) {
        em.remove(findOrder(orderId));
    }
}
