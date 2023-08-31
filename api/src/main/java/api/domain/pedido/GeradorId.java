package api.domain.pedido;

import java.util.Random;

public class GeradorId {

  public int gerarCodigoAleatorio() {
    Random random = new Random();
    int codigo = (int) (100_000L + random.nextInt(900_000)); // Gera um número entre 100000 e 999999
    return codigo;
  }
}
