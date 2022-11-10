package sonda.embraer.rest.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sonda.embraer.rest.api.model.AeronaveModel;

import java.util.Date;

@Repository
public interface AeronaveRepository extends CrudRepository<AeronaveModel, Long> {
    Iterable<AeronaveModel> findBymarcaContaining(String marca);

    Iterable<AeronaveModel> findBycreatedAfter(Date date);

    Iterable<AeronaveModel> findByvendidoTrue();

    Iterable<AeronaveModel> findByanoBetween(Integer start, Integer end);
    @Query("SELECT coalesce(min(aero.ano), 0) FROM Aeronave aero")
    Long getMinAno();

    @Query("SELECT aero FROM Aeronave aero where aero.marca like %?1% or aero.nome like %?2%")
    Iterable<AeronaveModel> findBymarcaContainingOrnomeContaining(String filtro, String filtro1);
}
