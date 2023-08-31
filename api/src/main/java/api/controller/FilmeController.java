package api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import api.domain.filmes.DadosCadastroFilme;
import api.domain.filmes.Filme;
import api.domain.filmes.FilmeRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("filmes")
public class FilmeController {

  @Autowired
  FilmeRepository repository;

  @PostMapping
  @Transactional
  public ResponseEntity<Filme> cadastro(@RequestBody @Valid DadosCadastroFilme dados, UriComponentsBuilder uriBuilder) {
    var filme = new Filme(dados);
    repository.save(filme);

    var uri = uriBuilder.path("/filmes/{id}").buildAndExpand(filme.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  @GetMapping
  public ResponseEntity<List<Filme>> listarFilmes() {
    List<Filme> listaFilmes = repository.findAll();
        

    return ResponseEntity.ok(listaFilmes);
  }
}
