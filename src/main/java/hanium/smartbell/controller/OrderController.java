package hanium.smartbell.controller;

import hanium.smartbell.QRUtil;
import hanium.smartbell.domain.Order;
import hanium.smartbell.domain.OrderItem;
import hanium.smartbell.service.OrderItemService;
import hanium.smartbell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
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


//주문
    @GetMapping(value = "/orders/{orderId}/orderList")
    public String createOrderListForm() {
        return "orders/orderList";
    }


    @PostMapping(value = "/orders/{orderId}/orderList")
    public String createOrderList(@PathVariable("orderId") Long orderId) {

        //QR코드 생성
        String url = "http://3.36.73.18/users/"+orderId+"/main";
        //String url = "http://localhost:8080/users/"+orderId+"/main";
        int width = 300;
        int height = 300;
        String file_path = "/home/ubuntu"+ File.separator+"qr"+File.separator;
        //String file_path = "/Users/2jaebbang/Desktop/hanium_smartbell/smartbell/src/main/resources/static/images/";
        String file_name = "qrcode.png";
        QRUtil.makeQR(url, width, height, file_path, file_name);

        orderService.order(orderId);

        return "orders/orderList";
    }

    //qr코드 출력
    @GetMapping(value = "/orders/qrcode")
    public String printQrcode() {
        String path = System.getProperty("user.dir");
        System.out.println("Working Directory = " + path);
        return "orders/qrcode";
    }





    //주문한 아이템 식제
    @DeleteMapping("/orders/{orderId}/orderList")
    public String deleteOrderItem(@PathVariable("orderId") Long orderId){

        orderItemService.deleteOrderItem(orderId);

        return "orders/orderForm";
    }


    //주문현황
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
