package api.domain.filmes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroFilme(
  @NotBlank
  String titulo,
  @NotBlank
  String classificacao,
  @NotBlank
  String sinopse,
  @NotNull
  Genero genero,
  @NotBlank
  String videoUrl,
  @NotNull
  int duracao
) {}
