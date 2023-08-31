package api.domain.pedido;

import java.util.Set;

import api.domain.Sessao.Sessao;
import api.domain.lugares.Lugar;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroPedido(
  @NotNull
  Sessao sessao,
  @NotNull
  Set<Lugar> lugares,
  @NotNull
  String cpf,
  @NotNull
  double valor
) {
  
}
