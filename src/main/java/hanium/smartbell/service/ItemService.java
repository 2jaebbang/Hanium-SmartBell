package hanium.smartbell.service;

import hanium.smartbell.domain.item.Beverage;
import hanium.smartbell.domain.item.Food;
import hanium.smartbell.domain.item.Item;
import hanium.smartbell.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    @Transactional
    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    public List<Item> findItems() {
        return itemRepository.findAll();
    }

    public Item findOne(Long itemId) {
        return itemRepository.findOne(itemId);
    }


    /**  변경감지
     * 영속성 컨텍스트가 자동 변경
     */
    @Transactional    //자동으로 데베에 업데이트.
    public void updateItem(Long id, String name, int price) {
        Item item = itemRepository.findOne(id);
        item.setName(name);
        item.setPrice(price);
    }

    @Transactional    //자동으로 데베에 업데이트.
    public void updateBeverage(Long id, String name, int price, String size) {
        Beverage beverage = (Beverage) itemRepository.findOne(id);
        beverage.setName(name);
        beverage.setPrice(price);
        beverage.setSize(size);
    }

    @Transactional    //자동으로 데베에 업데이트.
    public void updateFood(Long id, String name, int price, String gram) {
        Food food = (Food) itemRepository.findOne(id);
        food.setName(name);
        food.setPrice(price);
        food.setGram(gram);
    }
}
