package hanium.smartbell.controller;

import hanium.smartbell.domain.item.Beverage;
import hanium.smartbell.domain.item.Food;
import hanium.smartbell.domain.item.Item;
import hanium.smartbell.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping(value = "/items/newBeverage")
    public String createBeverageForm() {
        return "items/BeverageForm";
    }

    @GetMapping(value = "/items/newFood")
    public String createFoodForm() {
        return "items/FoodForm";
    }

    @PostMapping(value = "/items/newBeverage")
    public String createBeverage(@RequestBody BeverageForm form) {
        Beverage beverage = new Beverage();
        beverage.setName(form.getName());
        beverage.setPrice(form.getPrice());
        beverage.setSizeUp(form.getSizeUp());
        beverage.setTemparature(form.getTemparature());
        beverage.setCategory("beverage");
        itemService.saveItem(beverage);
        return "/items/itemList";
    }

    @PostMapping(value = "/items/newFood")
    public String createFood(@RequestBody FoodForm form) {
        Food food = new Food();
        food.setName(form.getName());
        food.setPrice(form.getPrice());
        food.setGram(form.getGram());
        food.setCategory("food");
        itemService.saveItem(food);
        return "/items/itemList";
    }

    /**
     * 상품 목록
     */
    @GetMapping(value = "/items")
    public String itemList() {
        return "items/itemList";
    }


    @GetMapping(value = "/items/itemListJson")
    @ResponseBody
    public List<Item> items() {
        List<Item> item = itemService.findItems();
        return item;
    }


    /**
     * 상품 수정 폼
     */
    @GetMapping(value = "/items/{itemId}/edit")
    public String updateForm(@PathVariable("itemId") Long itemId) {
        if (itemService.findOne(itemId).getCategory().equals("beverage")) {
            return "items/UpdateBForm";         //음료수정 폼으로 이동
        } else {
            return "items/UpdateFForm";         //푸드수정 폼으로 이동
        }
    }

    @GetMapping(value = "/items/{itemId}")
    @ResponseBody
    public Item update(@PathVariable("itemId") Long itemId) {           //수정폼에서 기존 값들을 출력하기 위함
        if (itemService.findOne(itemId).getCategory().equals("beverage")) {
            Beverage beverageItem = (Beverage) itemService.findOne(itemId);
            return beverageItem;
        } else {
            Food foodItem = (Food) itemService.findOne(itemId);
            return foodItem;
        }
    }


    /**
     * 상품 수정
     */
    @PostMapping(value = "/items/{itemId}/edit")
    public String updateItem(@PathVariable("itemId") Long itemId, @RequestBody ItemForm itemForm) {
        if (itemService.findOne(itemId).getCategory().equals("beverage")) {
            itemService.updateBeverage(itemId, itemForm.getName(), itemForm.getPrice(), itemForm.getSize());
        } else {
            itemService.updateFood(itemId, itemForm.getName(), itemForm.getPrice(), itemForm.getGram());
        }
        return "/items/itemList";
    }

}



