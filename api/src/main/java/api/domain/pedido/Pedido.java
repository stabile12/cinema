package api.domain.pedido;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import api.domain.Sessao.Sessao;
import api.domain.lugares.Lugar;



@Document(collection = "pedidos")
public class Pedido {
  
  @Id
  private int codigo;
  
  private Sessao sessao;

  private Set<Lugar> lugares;

  private String cpf;

  private double valor;

  public Pedido() {
  }

  public Pedido(DadosCadastroPedido dados) {
    this.sessao = dados.sessao();
    this.cpf = dados.cpf();
    this.lugares = dados.lugares();
    this.valor = dados.valor();
  }
  
  public Sessao getSessao() {
    return sessao;
  }

  public void setSessao(Sessao sessao) {
    this.sessao = sessao;
  }

  public Set<Lugar> getLugares() {
    return lugares;
  }

  public void setLugares(Set<Lugar> lugares) {
    this.lugares = lugares;
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

  public int getCoPedido() {
    return codigo;
  }

  public void setCod_pedido(int codigo) {
    this.codigo = codigo;
  }
}

