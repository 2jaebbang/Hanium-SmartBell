package hanium.smartbell.service;

import hanium.smartbell.domain.Order;
import hanium.smartbell.domain.OrderItem;
import hanium.smartbell.domain.item.Item;
import hanium.smartbell.repository.ItemRepository;
import hanium.smartbell.repository.OrderItemRepository;
import hanium.smartbell.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ItemRepository itemRepository;


    /**
     * 주문
     */
    @Transactional
    public Long orderItem(Long orderId,Long itemId, String temperature, String size, int amount, int sizeUp) {

        //엔티티 조회
        Order order = orderRepository.findOne(orderId);
        Item item = itemRepository.findOne(itemId);

        //주문상품 생성
        OrderItem orderItem = OrderItem.createOrderItem(order ,item, item.getName() ,item.getPrice(), temperature, size, amount, sizeUp);


        //주문 저장
        orderItemRepository.save(orderItem);
        return orderItem.getOrder().getOrderId();
    }


//    public Long orderItemRate(Long orderId, int rate){
//        //해당하는 orderId의 orderItem들
//        List<OrderItem> orderItems = orderItemRepository.findOrder(orderId);
//
//        OrderItem orderItem = orderItemRepository.findOne(orderId);
//        //해당하는 orderId의 orderItem의
//        List<OrderItem> orderItemsByItemId = orderItemRepository.findOrderByItemId(orderItem.getItem().getId());
//    }

    public List<OrderItem> findOrderItems() {
        return orderItemRepository.findAll();
    }


    //주문아이템 삭제
    public void deleteOrderItem(Long orderId){
        orderItemRepository.deleteOrderItem(orderId);
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
