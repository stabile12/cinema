package api.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import api.domain.lugares.Lugar;
import api.domain.lugares.LugarRepository;

@RestController
@RequestMapping("lugares")
public class LugarController {

    @Autowired
    LugarRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<List<Lugar>> listarLugares(@PathVariable int id) {
        List<Lugar> listaLugares = repository.findBySessaoId(id);

        return ResponseEntity.ok(listaLugares);
    }
}
