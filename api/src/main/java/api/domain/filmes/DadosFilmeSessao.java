package api.domain.filmes;

public record DadosFilmeSessao(
  Long id,
  String titulo,
  String classificacao
) {
  public DadosFilmeSessao(Filme filme) {
    this(filme.getId(), filme.getTitulo(), filme.getClassificacao());
  }
}
