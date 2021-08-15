package hanium.smartbell.controller;

import hanium.smartbell.domain.Order;
import hanium.smartbell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final OrderService orderService;

    //유저 메인페이지에 띄울 orderId를 불러온다
    @GetMapping(value = "/users/{orderId}")
    @ResponseBody
    public Order userHome(@PathVariable("orderId") Long orderId) {
        Order order = orderService.findOrder(orderId);
        return order;
    }

    //유저 메인페이지로 이동
    @GetMapping(value = "/users/{OrderId}/main")
    public String updateForm() {
            return "users/userMain";
        }
    }



