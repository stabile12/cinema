package api.domain.filmes;

import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "Filme")
@Table(name = "filmes")
@Component
public class Filme {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_filme")
  private Long id;
  private String titulo;
  private String classificacao;
  private String sinopse;
  @Enumerated(EnumType.STRING)
  private Genero genero;
  @Column(name = "videoUrl")
  private String videoUrl;
  private int duracao;
  private boolean ativo;

  public Filme(Long id, String titulo, String classificacao, String sinopse, Genero genero, String videoUrl,
      String duracao, boolean ativo) {
    this.id = id;
    this.titulo = titulo;
    this.classificacao = classificacao;
    this.sinopse = sinopse;
    this.genero = genero;
    this.ativo = ativo;
  }

  public Long getId() {
    return id;
  }

  public String getTitulo() {
    return titulo;
  }

  public String getClassificacao() {
    return classificacao;
  }

  public String getSinopse() {
    return sinopse;
  }

  public Genero getGenero() {
    return genero;
  }

  public String getVideoUrl() {
    return videoUrl;
  }

  public int getDuracao() {
    return duracao;
  }

  public void setDuracao(int duracao) {
    this.duracao = duracao;
  }

  public boolean isAtivo() {
    return ativo;
  }

  public Filme() {
    // Construtor padrão vazio
  }

  public Filme(DadosCadastroFilme dados) {
    this.titulo = dados.titulo();
    this.classificacao = dados.classificacao();
    this.genero = dados.genero();
    this.sinopse = dados.sinopse();
    this.videoUrl = dados.videoUrl();
    this.duracao = dados.duracao();
    this.ativo = true;
  }
}
