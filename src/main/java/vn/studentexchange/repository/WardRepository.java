package vn.studentexchange.repository;

import vn.studentexchange.domain.Ward;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ward entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WardRepository extends JpaRepository<Ward, Long>, JpaSpecificationExecutor<Ward> {

}
