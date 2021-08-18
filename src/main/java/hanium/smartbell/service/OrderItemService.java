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

    public List<OrderItem> findOrderItems() {
        return orderItemRepository.findAll();
    }



    //별점 추가
    @Transactional
    public void createOrderItemRate(Long orderItemId, Integer rate) {
            OrderItem orderItem = orderItemRepository.findOne(orderItemId);
            orderItem.setRate(rate);
            orderItemRepository.save(orderItem);
        }


    //주문아이템 삭제
    @Transactional
    public void deleteOrderItem(Long orderId){
        List<OrderItem> orderItems = orderItemRepository.findOrderItems(orderId);
        for(int i=0; i<orderItems.size(); i++){

            orderItemRepository.deleteOrderItem(orderItems.get(i).getOrderItemId());
        }
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
