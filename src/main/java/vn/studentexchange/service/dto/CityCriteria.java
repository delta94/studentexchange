package vn.studentexchange.service.dto;

import io.github.jhipster.service.filter.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Criteria class for the City entity. This class is used in CityResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /cities?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CityCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter index;

    private BooleanFilter enabled;

    private InstantFilter createAt;

    private InstantFilter updateAt;

    private LongFilter districtsId;

    public CityCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getIndex() {
        return index;
    }

    public void setIndex(IntegerFilter index) {
        this.index = index;
    }

    public BooleanFilter getEnabled() {
        return enabled;
    }

    public void setEnabled(BooleanFilter enabled) {
        this.enabled = enabled;
    }

    public InstantFilter getCreateAt() {
        return createAt;
    }

    public void setCreateAt(InstantFilter createAt) {
        this.createAt = createAt;
    }

    public InstantFilter getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(InstantFilter updateAt) {
        this.updateAt = updateAt;
    }

    public LongFilter getDistrictsId() {
        return districtsId;
    }

    public void setDistrictsId(LongFilter districtsId) {
        this.districtsId = districtsId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CityCriteria that = (CityCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(index, that.index) &&
            Objects.equals(enabled, that.enabled) &&
            Objects.equals(createAt, that.createAt) &&
            Objects.equals(updateAt, that.updateAt) &&
            Objects.equals(districtsId, that.districtsId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        name,
        index,
        enabled,
        createAt,
        updateAt,
        districtsId
        );
    }

    @Override
    public String toString() {
        return "CityCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (index != null ? "index=" + index + ", " : "") +
                (enabled != null ? "enabled=" + enabled + ", " : "") +
                (createAt != null ? "createAt=" + createAt + ", " : "") +
                (updateAt != null ? "updateAt=" + updateAt + ", " : "") +
                (districtsId != null ? "districtsId=" + districtsId + ", " : "") +
            "}";
    }

}
