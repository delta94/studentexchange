package vn.studentexchange.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.studentexchange.domain.enumeration.CurrencyType;
import vn.studentexchange.security.SecurityUtils;
import vn.studentexchange.service.CurrencyRateService;
import vn.studentexchange.service.ShoppingCartService;
import vn.studentexchange.service.dto.CurrencyRateDTO;
import vn.studentexchange.service.dto.ShoppingCartDTO;
import vn.studentexchange.web.rest.errors.BadRequestAlertException;
import vn.studentexchange.web.rest.util.HeaderUtil;
import vn.studentexchange.web.rest.util.Utils;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ShoppingCart.
 */
@RestController
@RequestMapping("/api")
public class ShoppingCartResource {

    private final Logger log = LoggerFactory.getLogger(ShoppingCartResource.class);

    private static final String ENTITY_NAME = "shoppingCart";

    private final ShoppingCartService shoppingCartService;

    private final CurrencyRateService currencyRateService;

    public ShoppingCartResource(ShoppingCartService shoppingCartService, CurrencyRateService currencyRateService) {
        this.shoppingCartService = shoppingCartService;
        this.currencyRateService = currencyRateService;
    }

    /**
     * POST  /shopping-carts : Create a new shoppingCart.
     *
     * @param shoppingCartDTO the shoppingCartDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shoppingCartDTO, or with status 400 (Bad Request) if the shoppingCart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shopping-carts")
    @Timed
    public ResponseEntity<ShoppingCartDTO> createShoppingCart(@RequestBody ShoppingCartDTO shoppingCartDTO) throws URISyntaxException {
        log.debug("REST request to save ShoppingCart : {}", shoppingCartDTO);
        if (shoppingCartDTO.getId() != null) {
            throw new BadRequestAlertException("A new shoppingCart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        ShoppingCartDTO result = shoppingCartService.save(username, shoppingCartDTO);
        return ResponseEntity.created(new URI("/api/shopping-carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shopping-carts : Updates an existing shoppingCart.
     *
     * @param shoppingCartDTO the shoppingCartDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shoppingCartDTO,
     * or with status 400 (Bad Request) if the shoppingCartDTO is not valid,
     * or with status 500 (Internal Server Error) if the shoppingCartDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shopping-carts")
    @Timed
    public ResponseEntity<ShoppingCartDTO> updateShoppingCart(@RequestBody ShoppingCartDTO shoppingCartDTO) throws URISyntaxException {
        log.debug("REST request to update ShoppingCart : {}", shoppingCartDTO);
        if (shoppingCartDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        ShoppingCartDTO result = shoppingCartService.save(username, shoppingCartDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shoppingCartDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shopping-carts : get all the shoppingCarts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shoppingCarts in body
     */
    @GetMapping("/shopping-carts")
    @Timed
    public List<ShoppingCartDTO> getAllShoppingCarts() {
        log.debug("REST request to get all ShoppingCarts");
        return shoppingCartService.findAll();
    }

    @GetMapping("/shopping-carts/owner")
    @Timed
    public List<ShoppingCartDTO> getOwnerShoppingCarts() {
        log.debug("REST request to get owner ShoppingCarts");
        String username = SecurityUtils.getCurrentUserLogin().get();
        List<ShoppingCartDTO> carts = shoppingCartService.findByOwner(username);
        Optional<CurrencyRateDTO> rate =  currencyRateService.findByCurrency(CurrencyType.CNY);
        for (ShoppingCartDTO dto: carts) {
            Utils.calculate(dto, rate.get());
        }
        return carts;
    }

    @GetMapping("/shopping-carts/owner/{id}")
    @Timed
    public List<ShoppingCartDTO> getOwnerShoppingCartById(@PathVariable Long id) {
        log.debug("REST request to get owner ShoppingCarts");
        Optional<ShoppingCartDTO> dto = shoppingCartService.findOne(id);
        if (!dto.isPresent()) {
            return new ArrayList<>();
        }
        Optional<CurrencyRateDTO> rate =  currencyRateService.findByCurrency(CurrencyType.CNY);
        ShoppingCartDTO currentCart = Utils.calculate(dto.get(), rate.get());
        List<ShoppingCartDTO> carts = new ArrayList<>();
        carts.add(currentCart);
        return carts;
    }

    /**
     * GET  /shopping-carts/:id : get the "id" shoppingCart.
     *
     * @param id the id of the shoppingCartDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shoppingCartDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shopping-carts/{id}")
    @Timed
    public ResponseEntity<ShoppingCartDTO> getShoppingCart(@PathVariable Long id) {
        log.debug("REST request to get ShoppingCart : {}", id);
        Optional<ShoppingCartDTO> shoppingCartDTO = shoppingCartService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shoppingCartDTO);
    }

    /**
     * DELETE  /shopping-carts/:id : delete the "id" shoppingCart.
     *
     * @param id the id of the shoppingCartDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shopping-carts/{id}")
    @Timed
    public ResponseEntity<Void> deleteShoppingCart(@PathVariable Long id) {
        log.debug("REST request to delete ShoppingCart : {}", id);
        shoppingCartService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
