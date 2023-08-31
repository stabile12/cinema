package api.domain.lugares;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "Lugar")
@Table(name = "Lugares")
public class Lugar {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int fila;
  
  private int assento;

  private boolean disponivel;

  private Long id_sessao;

  public Lugar(int fila, int assento, boolean disponivel, Long id_sessao) {
    this.fila = fila;
    this.assento = assento;
    this.disponivel = disponivel;
    this.id_sessao = id_sessao;
  }

  public Lugar() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getFila() {
    return fila;
  }

  public void setFila(int fila) {
    this.fila = fila;
  }

  public int getAssento() {
    return assento;
  }

  public void setAssento(int assento) {
    this.assento = assento;
  }

  public boolean isDisponivel() {
    return disponivel;
  }

  public void setDisponivel(boolean disponivel) {
    this.disponivel = disponivel;
  }

  public Long getId_sessao() {
    return id_sessao;
}

public void setId_sessao(Long id_sessao) {
    this.id_sessao = id_sessao;
}
}
