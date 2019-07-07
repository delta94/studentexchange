package vn.studentexchange.service;

import org.springframework.beans.factory.annotation.Autowired;
import vn.studentexchange.domain.OrderItem;
import vn.studentexchange.domain.User;
import vn.studentexchange.repository.OrderItemRepository;
import vn.studentexchange.repository.UserRepository;
import vn.studentexchange.service.dto.OrderItemDTO;
import vn.studentexchange.service.mapper.OrderItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing OrderItem.
 */
@Service
@Transactional
public class OrderItemService {

    private final Logger log = LoggerFactory.getLogger(OrderItemService.class);

    private final OrderItemRepository orderItemRepository;

    private final OrderItemMapper orderItemMapper;

    @Autowired
    private UserRepository userRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderItemMapper orderItemMapper) {
        this.orderItemRepository = orderItemRepository;
        this.orderItemMapper = orderItemMapper;
    }

    /**
     * Save a orderItem.
     *
     * @param orderItemDTO the entity to save
     * @return the persisted entity
     */
    public OrderItemDTO save(OrderItemDTO orderItemDTO) {
        log.debug("Request to save OrderItem : {}", orderItemDTO);

        OrderItem orderItem = orderItemMapper.toEntity(orderItemDTO);
        orderItem = orderItemRepository.save(orderItem);
        return orderItemMapper.toDto(orderItem);
    }

    public OrderItemDTO save(String username, OrderItemDTO orderItemDTO) {
        log.debug("Request to save OrderItem : {}", orderItemDTO);
        Optional<User> currentUser = userRepository.findOneByLogin(username);
        OrderItem orderItem = orderItemMapper.toEntity(orderItemDTO);
        orderItem.setCreateBy(currentUser.get());
        orderItem = orderItemRepository.save(orderItem);
        return orderItemMapper.toDto(orderItem);
    }

    /**
     * Get all the orderItems.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OrderItemDTO> findAll() {
        log.debug("Request to get all OrderItems");
        return orderItemRepository.findAll().stream()
            .map(orderItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one orderItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<OrderItemDTO> findOne(Long id) {
        log.debug("Request to get OrderItem : {}", id);
        return orderItemRepository.findById(id)
            .map(orderItemMapper::toDto);
    }

    /**
     * Delete the orderItem by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OrderItem : {}", id);
        orderItemRepository.deleteById(id);
    }
}
