package vn.studentexchange.repository;

import vn.studentexchange.domain.Payment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("select payment from Payment payment where payment.staffApproval.login = ?#{principal.username}")
    List<Payment> findByStaffApprovalIsCurrentUser();

    @Query("select payment from Payment payment where payment.staffCancel.login = ?#{principal.username}")
    List<Payment> findByStaffCancelIsCurrentUser();

    @Query("select payment from Payment payment where payment.createBy.login = ?#{principal.username}")
    List<Payment> findByCreateByIsCurrentUser();

}
