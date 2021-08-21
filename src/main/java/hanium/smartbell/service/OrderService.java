package hanium.smartbell.service;

import hanium.smartbell.domain.Order;
import hanium.smartbell.domain.OrderItem;
import hanium.smartbell.domain.OrderStatus;
import hanium.smartbell.repository.OrderItemRepository;
import hanium.smartbell.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemService orderItemService;

    private final OrderItemRepository orderItemRepository;

    /**
     * 주문
     */
    //== 주문도메인개발(주문,주문상품 엔티티 개발) ==//
    //==생성 메서드==//
    public Order createOrder(Long orderId,List<OrderItem> orderItems) { //... <-여러개  넘김
        int orderItemTotalPrice = 0;
        for (OrderItem orderItem : orderItems) {
            orderItemTotalPrice += orderItem.getOrderItemTotalPrice();
        }

        //orderItem의 orderId 저장
        //order.setOrItemId(orderItems.get(0).getOrderId());

        Order order = orderRepository.findOne(orderId);
        order.setTotalPrice(orderItemTotalPrice);
        order.setStatus(OrderStatus.ORDERED);
        order.setOrderDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return order;
    }

    //먼저 Order만 미리 생성
    @Transactional
    public Long createOrderIdFirst() {

        //주문 생성
        Order order = Order.createOrderId();

        //주문 저장
        orderRepository.save(order);
        return order.getOrderId();
    }

    //orderId를 통해 주문할 상품 걸러내야함
    @Transactional
    public Long order(Long orderId) {

        //엔티티 조회

        List<OrderItem> orderItemList = orderItemRepository.findOrder(orderId);

        //주문 나머지 데이터생성   orderItem 여러개 넘기면 여러개 상품 선택 가능
        Order order = createOrder(orderId,orderItemList);

        //주문 저장
        orderRepository.save(order);
        return order.getOrderId();
    }

    public List<Order> findOrders() {
        return orderRepository.findAll();
    }

    public Order findOrder(Long orderId) {return orderRepository.findOne(orderId);}


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
//    public List<Order> findOrders(OrderSearch orderSearch) {
//        return orderRepository.findAllByCriteria(orderSearch);
//    }



}