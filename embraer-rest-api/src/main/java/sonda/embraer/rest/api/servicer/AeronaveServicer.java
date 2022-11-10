package sonda.embraer.rest.api.servicer;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import sonda.embraer.rest.api.model.AeronaveModel;
import sonda.embraer.rest.api.model.DecadesModel;
import sonda.embraer.rest.api.repository.AeronaveRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AeronaveServicer {

    private final AeronaveRepository aeronaveRepository;

    public List<AeronaveModel> getAeronavesFiltro(String filtro) {
        List<AeronaveModel> listAeronaves =  new ArrayList<>();

        aeronaveRepository.findBymarcaContainingOrnomeContaining(filtro, filtro).forEach(aeroModel -> {
            listAeronaves.add(aeroModel);
        });

        return listAeronaves;
    }
    public Long getAeronavesSemana() {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal = Calendar.getInstance();
        cal.setFirstDayOfWeek (Calendar.SUNDAY);
        int diaSemana = cal.get(Calendar.DAY_OF_WEEK);
        cal.add (Calendar.DAY_OF_MONTH, Calendar.SUNDAY - diaSemana);

        Iterable<AeronaveModel> returnAero = aeronaveRepository.findBycreatedAfter(cal.getTime());

        return returnAero.spliterator().getExactSizeIfKnown();
    }

    public List<DecadesModel> getAeronavesDecadas() {
        List<DecadesModel> returnDecadas = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        Integer year = cal.get(Calendar.YEAR);
        Integer minValue = this.aeronaveRepository.getMinAno().intValue();
        Integer anoStart = 2000;

        while (anoStart < year) {
            Long countAeronave = this.aeronaveRepository.findByanoBetween(anoStart, anoStart + 9).spliterator().getExactSizeIfKnown();
            if (countAeronave > 0) {
                DecadesModel newDecades = new DecadesModel();
                newDecades.setDecada(anoStart);
                newDecades.setQuantidade(countAeronave.intValue());

                returnDecadas.add(newDecades);
            }
            anoStart += 10;
        }

        anoStart = 1999;

        while (minValue <= anoStart) {
            Long countAeronave = this.aeronaveRepository.findByanoBetween(anoStart - 9, anoStart).spliterator().getExactSizeIfKnown();
            if (countAeronave > 0) {
                DecadesModel newDecades = new DecadesModel();
                newDecades.setDecada(anoStart - 9);
                newDecades.setQuantidade(countAeronave.intValue());

                returnDecadas.add(newDecades);
            }
            anoStart -= 10;
        }

        return returnDecadas;
    }
}
