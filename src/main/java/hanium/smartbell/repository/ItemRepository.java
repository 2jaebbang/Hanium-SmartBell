package hanium.smartbell.repository;

import hanium.smartbell.domain.item.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ItemRepository {
    private final EntityManager em;    //엔티티와 관련된 모든 일을 처리하기에 이름 그대로 엔티티를 관리하는 관리자

    public void save(Item item) {
        if (item.getId() == null) {    //처음에 아무 아이디 없으면(새로 생성)
            em.persist(item);
        } else {
            em.merge(item);    //업데이트
        }
    }
    public Item findOne(Long id) {
        return em.find(Item.class, id);
    }
    public List<Item> findAll() {
        return em.createQuery("select i from Item i",Item.class).getResultList();
    }
}

