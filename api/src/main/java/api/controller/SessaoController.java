package api.controller;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.domain.Sessao.DadosSessaoRequest;
import api.domain.Sessao.Sessao;
import api.domain.Sessao.SessaoRepository;
import api.domain.diaSemana.DiaSemana;
import api.domain.diaSemana.DiaSemanaRepository;
import api.domain.filmes.Filme;
import api.domain.filmes.FilmeRepository;
import api.domain.lugares.Lugar;
import api.domain.lugares.LugarRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("sessoes")
public class SessaoController {

  @Autowired
  SessaoRepository repository;

  @Autowired
  FilmeRepository filmeRepository;

  @Autowired
  DiaSemanaRepository diaRepository;

  @Autowired
  LugarRepository lugarRepository;

  @PostMapping
  @Transactional
  public ResponseEntity<Sessao> criarSessao(@RequestBody DadosSessaoRequest dados) {
    Optional<Filme> filme = filmeRepository.findById(dados.getIdFilme());
    Optional<DiaSemana> dia = diaRepository.findById(dados.getDiaSemana());

    Sessao novaSessao = new Sessao();
    novaSessao.setHorario(dados.getHorario());
    novaSessao.setDiaSemana(dia.get());
    novaSessao.setFilme(filme.get());
    novaSessao.setTipo(dados.getTipo());

    Sessao sessaoSalva = repository.save(novaSessao);

    List<Lugar> places = new ArrayList<>();
    Long idSessao = novaSessao.getId_sessao();

    for (int fila = 1; fila <= 5; fila++) {
      for (int assento = 1; assento <= 6; assento++) {
        places.add(new Lugar(fila, assento, true, idSessao));
      }
    }

    List<Lugar> lugaresSalvos = lugarRepository.saveAll(places);
    System.out.println(lugaresSalvos);
    return ResponseEntity.ok(sessaoSalva);
  }

  @GetMapping
  public ResponseEntity<List<Sessao>> listarSessoes() {
    List<Sessao> lista = repository.findAll();

    return ResponseEntity.ok(lista);
  }

  // Aqui é passado o id do filme
  @GetMapping("/{id}")
  public ResponseEntity<List<Sessao>> listarSessoesPorFilme(@PathVariable Long id) {
    List<Sessao> lista = repository.findSessaoByTitulo(id);

    return ResponseEntity.ok(lista);
  }

  @GetMapping("/sessao/{id}")
  public ResponseEntity<Sessao> buscarSessaoPorId(@PathVariable Long id) {
    Optional<Sessao> sessao = repository.findById(id);

    if (sessao.isPresent()) {
      return ResponseEntity.ok(sessao.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
