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
        beverage.setSize(form.getSize());
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


    @GetMapping(value = "/items/itemList")
    @ResponseBody
    public List<Item> items() {
        List<Item> item = itemService.findItems();
        return item;
    }



    /**
     * 상품 수정 폼
     */
    @GetMapping(value = "/items/{itemId}/edit")
    public String updateItemForm(@PathVariable("itemId") Long itemId) {
        if(itemService.findOne(itemId).getCategory().equals("beverage")) {
            return "items/UpdateBForm";
        } else{
            return "items/UpdateFForm";
        }
    }

    @GetMapping(value = "items/UpdateBForm")
    @ResponseBody
    public Item updateBeverageForm(@PathVariable("itemId") Long itemId) {
            Beverage beverageItem = (Beverage) itemService.findOne(itemId);

            return beverageItem;
        }

    @GetMapping(value = "items/UpdateFForm")
    @ResponseBody
    public Item updateFoodForm(@PathVariable("itemId") Long itemId) {
        Food foodItem = (Food) itemService.findOne(itemId);

        return foodItem;
    }


    /**
     * 상품 수정
     */

    @PutMapping(value = "/items/{itemId}/edit")
    public String updateItem(@PathVariable Long itemId, @RequestBody BeverageForm beverageForm, @RequestBody FoodForm foodForm) {
        if(itemService.findOne(itemId).getCategory().equals("beverage")){
            itemService.updateBeverage(beverageForm.getId(), beverageForm.getName(), beverageForm.getPrice(), beverageForm.getSize());
            return "items/UpdateBForm";
            }
        else {
            itemService.updateFood(foodForm.getId(), foodForm.getName(), foodForm.getPrice(), foodForm.getGram());
            return "items/UpdateFForm";
        }
    }
}
