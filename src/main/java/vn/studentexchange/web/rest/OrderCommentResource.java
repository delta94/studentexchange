package vn.studentexchange.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.studentexchange.service.OrderCommentService;
import vn.studentexchange.service.dto.OrderCommentDTO;
import vn.studentexchange.web.rest.errors.BadRequestAlertException;
import vn.studentexchange.web.rest.util.HeaderUtil;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderComment.
 */
@RestController
@RequestMapping("/api")
public class OrderCommentResource {

    private final Logger log = LoggerFactory.getLogger(OrderCommentResource.class);

    private static final String ENTITY_NAME = "orderComment";

    private final OrderCommentService orderCommentService;

    public OrderCommentResource(OrderCommentService orderCommentService) {
        this.orderCommentService = orderCommentService;
    }

    /**
     * POST  /order-comments : Create a new orderComment.
     *
     * @param orderCommentDTO the orderCommentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderCommentDTO, or with status 400 (Bad Request) if the orderComment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-comments")
    @Timed
    public ResponseEntity<OrderCommentDTO> createOrderComment(@RequestBody OrderCommentDTO orderCommentDTO) throws URISyntaxException {
        log.debug("REST request to save OrderComment : {}", orderCommentDTO);
        if (orderCommentDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderCommentDTO result = orderCommentService.save(orderCommentDTO);
        return ResponseEntity.created(new URI("/api/order-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-comments : Updates an existing orderComment.
     *
     * @param orderCommentDTO the orderCommentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderCommentDTO,
     * or with status 400 (Bad Request) if the orderCommentDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderCommentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-comments")
    @Timed
    public ResponseEntity<OrderCommentDTO> updateOrderComment(@RequestBody OrderCommentDTO orderCommentDTO) throws URISyntaxException {
        log.debug("REST request to update OrderComment : {}", orderCommentDTO);
        if (orderCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderCommentDTO result = orderCommentService.save(orderCommentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderCommentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-comments : get all the orderComments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderComments in body
     */
    @GetMapping("/order-comments")
    @Timed
    public List<OrderCommentDTO> getAllOrderComments() {
        log.debug("REST request to get all OrderComments");
        return orderCommentService.findAll();
    }

    /**
     * GET  /order-comments/:id : get the "id" orderComment.
     *
     * @param id the id of the orderCommentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderCommentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-comments/{id}")
    @Timed
    public ResponseEntity<OrderCommentDTO> getOrderComment(@PathVariable Long id) {
        log.debug("REST request to get OrderComment : {}", id);
        Optional<OrderCommentDTO> orderCommentDTO = orderCommentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderCommentDTO);
    }

    /**
     * DELETE  /order-comments/:id : delete the "id" orderComment.
     *
     * @param id the id of the orderCommentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-comments/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderComment(@PathVariable Long id) {
        log.debug("REST request to delete OrderComment : {}", id);
        orderCommentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
