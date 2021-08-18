package hanium.smartbell.controller;

import hanium.smartbell.domain.Order;
import hanium.smartbell.service.OrderItemService;
import hanium.smartbell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    //유저 메인페이지에 띄울 orderId를 불러온다
    @GetMapping(value = "/users/{orderId}")
    @ResponseBody
    public Order orderForUserHome(@PathVariable("orderId") Long orderId) {
        Order order = orderService.findOrder(orderId);
        return order;
    }

    //유저 메인페이지로 이동
    @GetMapping(value = "/users/{orderId}/main")
    public String userHome() {
        return "users/userMain";
    }


    @GetMapping(value = "/users/{orderId}/rate")
    public String userRate() {
        return "users/userRate";
    }

    //주문한 아이템 별점 추가
    @PostMapping(value = "/users/{orderId}/rate")
    public String updateUserRate(@RequestBody Map<Long, Integer> rate) {
        for(Map.Entry<Long, Integer> entry : rate.entrySet()){
            System.out.println(entry.getKey());
            orderItemService.createOrderItemRate(entry.getKey(), entry.getValue());
        }
       return "users/userRate";
    }

}

