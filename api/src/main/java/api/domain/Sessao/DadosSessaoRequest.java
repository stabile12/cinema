package api.domain.Sessao;

public class DadosSessaoRequest {
  private Long idFilme;
  private Long diaSemana;
  private String tipo;
  private String horario;

  public Long getIdFilme() {
    return idFilme;
  }

  public void setIdFilme(Long idFilme) {
    this.idFilme = idFilme;
  }

  public Long getDiaSemana() {
    return diaSemana;
  }

  public void setDiaSemana(Long diaSemana) {
    this.diaSemana = diaSemana;
  }

  public String getHorario() {
    return horario;
  }

  public void setHorario(String horario) {
    this.horario = horario;
  }

  public String getTipo() {
    return tipo;
  }

  public void setTipo(String tipo) {
    this.tipo = tipo;
  }
}
