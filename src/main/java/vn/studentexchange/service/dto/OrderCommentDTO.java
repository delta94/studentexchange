package vn.studentexchange.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import vn.studentexchange.domain.enumeration.CommentType;

/**
 * A DTO for the OrderComment entity.
 */
public class OrderCommentDTO implements Serializable {

    private Long id;

    private String message;

    private String sender;

    private CommentType type;

    private Instant createAt;

    private Long orderCartId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public CommentType getType() {
        return type;
    }

    public void setType(CommentType type) {
        this.type = type;
    }

    public Instant getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Instant createAt) {
        this.createAt = createAt;
    }

    public Long getOrderCartId() {
        return orderCartId;
    }

    public void setOrderCartId(Long orderCartId) {
        this.orderCartId = orderCartId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OrderCommentDTO orderCommentDTO = (OrderCommentDTO) o;
        if (orderCommentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderCommentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderCommentDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", sender='" + getSender() + "'" +
            ", type='" + getType() + "'" +
            ", createAt='" + getCreateAt() + "'" +
            ", orderCart=" + getOrderCartId() +
            "}";
    }
}
