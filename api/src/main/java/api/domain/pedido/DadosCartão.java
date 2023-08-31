package api.domain.pedido;

public class DadosCartão {
  private String nome;
  private String numero;
  private String validade;
  private String cvv;
  public String cpf;
  public double valor;
  
  public DadosCartão(String nome, String numero, String validade, String cvv, String cpf, double valor) {
    this.nome = nome;
    this.numero = numero;
    this.validade = validade;
    this.cvv = cvv;
    this.cpf = cpf;
    this.valor = valor;
  }
  public String getNome() {
    return nome;
  }
  public void setNome(String nome) {
    this.nome = nome;
  }
  public String getNumero() {
    return numero;
  }
  public void setNumero(String numero) {
    this.numero = numero;
  }
  public String getValidade() {
    return validade;
  }
  public void setValidade(String validade) {
    this.validade = validade;
  }
  public String getCvv() {
    return cvv;
  }
  public void setCvv(String cvv) {
    this.cvv = cvv;
  }
  public String getCpf() {
    return cpf;
  }
  public void setCpf(String cpf) {
    this.cpf = cpf;
  }
  public double getValor() {
    return valor;
  }
  public void setValor(double valor) {
    this.valor = valor;
  }
  
  public String toJson() {
    return "{\"nome\": \"" + nome + "\", \"numero\": \"" + numero + "\", \"validade\": \"" + validade +
           "\", \"cvv\": \"" + cvv + "\", \"cpf\": \"" + cpf + "\", \"valor\": \"" + valor + "\"}";
}
  
}
