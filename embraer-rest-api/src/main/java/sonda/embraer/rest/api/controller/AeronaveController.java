package sonda.embraer.rest.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sonda.embraer.rest.api.model.AeronaveModel;
import sonda.embraer.rest.api.model.DecadesModel;
import sonda.embraer.rest.api.repository.AeronaveRepository;
import sonda.embraer.rest.api.servicer.AeronaveServicer;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AeronaveController {

    @Autowired
    private AeronaveRepository aeronaveRepository;
    private final AeronaveServicer aeronaveServicer;

    @GetMapping(path = "/aeronaves")
    public Iterable<AeronaveModel> getAeronaves() {
        return aeronaveRepository.findAll();
    }

    @GetMapping(path = "/aeronaves/findByMarca/{filter}")
    public long getAeronavesFindByMarca(@PathVariable("filter") String filter) {
        return aeronaveRepository.findBymarcaContaining(filter).spliterator().getExactSizeIfKnown();
    }

    @GetMapping(path = "/aeronaves/findByFilter/{filter}")
    public Iterable<AeronaveModel> getAeronavesFind(@PathVariable("filter") String filter) {
        return aeronaveServicer.getAeronavesFiltro(filter);
    }

    @GetMapping(path = "/aeronaves/{id}")
    public ResponseEntity getAeronavesId(@PathVariable("id") long id) {
        return aeronaveRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(path = "/aeronaves")
    public AeronaveModel save(@RequestBody AeronaveModel aeronave) {
        return aeronaveRepository.save(aeronave);
    }

    @PutMapping(path = "/aeronaves/{id}")
    public AeronaveModel update(@PathVariable("id") long id, @RequestBody AeronaveModel aeronave) {
        return aeronaveRepository.save(aeronave);
    }

    @DeleteMapping(path = "/aeronaves/{id}")
    public void delete(@PathVariable("id") long id) {
        aeronaveRepository.deleteById(id);
    }

    @GetMapping(path = "/aeronaves/week")
    public long getAeronavesWeek() {
        return aeronaveServicer.getAeronavesSemana();
    }

    @GetMapping(path = "/aeronaves/sold")
    public long getAeronavesSold() {
        return aeronaveRepository.findByvendidoTrue().spliterator().getExactSizeIfKnown();
    }

    @GetMapping(path = "aeronaves/decade")
    public List<DecadesModel> getAeronavesDecadas() {
        return aeronaveServicer.getAeronavesDecadas();
    }
}
