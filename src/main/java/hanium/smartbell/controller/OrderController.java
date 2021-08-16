package hanium.smartbell.controller;

import hanium.smartbell.domain.Order;
import hanium.smartbell.domain.OrderItem;
import hanium.smartbell.service.OrderItemService;
import hanium.smartbell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @GetMapping(value = "/order")
    public String createOrderForm() {
        return "orders/orderForm";
    }

    @PostMapping(value = "/order")
    public String createOrderItem(@RequestBody OrderItemForm form) {
        orderItemService.orderItem(Long.valueOf(form.getOrderId()) ,Long.valueOf(form.getItemId()), form.getTemperature(), form.getSize(), form.getAmount(), form.getSizeUp());
        return "orders/orderForm";
    }

    @PostMapping(value = "/orderFirst")
    public String createOrderTest(){
        orderService.createOrderIdFirst();
        return "orders/orderForm";
    }

//orderItem가져옴
    @GetMapping(value = "/orders/orderItemListJson")
    @ResponseBody
    public List<OrderItem> orderItems() {
        List<OrderItem> orderItem = orderItemService.findOrderItems();
        return orderItem;
    }


    @GetMapping(value = "/orders/{orderId}/orderList")
    public String createOrderListForm() {
        return "orders/orderList";
    }

    @PostMapping(value = "/orders/{orderId}/orderList")
    public String createOrderList(@PathVariable("orderId") Long orderId) {
        orderService.order(orderId);
        return "orders/orderList";
    }


    @GetMapping(value = "/orders/orderStatusListJson")
    @ResponseBody
    public List<Order> orderStatusList() {
        List<Order> orderStatusList = orderService.findOrders();
        return orderStatusList;
    }


    @GetMapping(value = "/orderStatusTable")
    public String createOrderStatusTable(){
        return "orders/orderStatusTable";
    }

    //제조완료
    @PostMapping(value = "/orderStatusCompleted")
    public String OrderStatusCompleted(@RequestBody OrderListForm form){
        orderService.completeOrder(Long.valueOf(form.getOrderId()));
        return "orders/orderStatusTable";
    }

    //수령완료
    @PostMapping(value = "/orderStatusReceived")
    public String OrderStatusReceived(@RequestBody OrderListForm form){
        orderService.receiveOrder(Long.valueOf(form.getOrderId()));
        return "orders/orderStatusTable";
    }

}
