package hanium.smartbell.service;

import hanium.smartbell.domain.*;
import hanium.smartbell.domain.item.Item;
import hanium.smartbell.repository.*;
import hanium.smartbell.repository.OrderRepository;
import hanium.smartbell.repository.OrderSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;


    /**
     * 주문
     */
    @Transactional
    public Long order(Long itemId, int amount) {

        //엔티티 조회
        Item item = itemRepository.findOne(itemId);

        //주문상품 생성
        OrderItem orderItem = OrderItem.createOrderItem(item, item.getPrice(), amount);

        //주문 생성   orderItem 여러개 넘기면 여러개 상품 선택 가능
        Order order = Order.createOrder(orderItem);

        //주문 저장
        orderRepository.save(order);
        return order.getId();
    }

    /**
     * 제조 완료
     */
    @Transactional
    public void completeOrder(Long orderId) {
        //주문 엔티티 조회
        Order order = orderRepository.findOne(orderId);
        //제조 완료
        order.complete();
    }

    /**
     * 수령 완료
     */
    @Transactional
    public void receiveOrder(Long orderId) {
        //주문 엔티티 조회
        Order order = orderRepository.findOne(orderId);
        //제조 완료
        order.recieve();
    }


    /** 주문 검색 */
    public List<Order> findOrders(OrderSearch orderSearch) {
        return orderRepository.findAllByCriteria(orderSearch);
    }

}