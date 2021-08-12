package hanium.smartbell.service;

import hanium.smartbell.domain.Order;
import hanium.smartbell.domain.OrderItem;
import hanium.smartbell.repository.OrderItemRepository;
import hanium.smartbell.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;


    /**
     * 주문
     */

    //orderId를 통해 주문할 상품 걸러내야함
    @Transactional
    public Long order(Long orderId) {

        //엔티티 조회
        List<OrderItem> orderItemList = orderItemRepository.findAll();

        //주문 생성   orderItem 여러개 넘기면 여러개 상품 선택 가능
        Order order = Order.createOrder(orderItemList);

        //주문 저장
        orderRepository.save(order);
        return order.getOrder;
    }


//    /**
//     * 제조 완료
//     */
//    @Transactional
//    public void completeOrder(Long orderId) {
//        //주문 엔티티 조회
//        Order order = orderRepository.findOne(orderId);
//        //제조 완료
//        order.complete();
//    }
//
//    /**
//     * 수령 완료
//     */
//    @Transactional
//    public void receiveOrder(Long orderId) {
//        //주문 엔티티 조회
//        Order order = orderRepository.findOne(orderId);
//        //제조 완료
//        order.recieve();
//    }


    /** 주문 검색 */
//    public List<Order> findOrders(OrderSearch orderSearch) {
//        return orderRepository.findAllByCriteria(orderSearch);
//    }



}