package bank.domain.cartao;

public record CartaoInfo(
  String nome,
  String numero,
  String validade,
  String cvv,
  String cpf,
  double valor
) {
}
