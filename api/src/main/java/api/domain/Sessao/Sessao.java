package api.domain.Sessao;

import api.domain.diaSemana.DiaSemana;
import api.domain.filmes.Filme;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity(name="Sessao")
@Table(name = "sessoes")
public class Sessao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sessao;

    @ManyToOne
    @JoinColumn(name = "id_dia_semana")
    private DiaSemana diaSemana;

    private String horario;

    private String tipo;

    @ManyToOne
    @JoinColumn(name = "id_filme")
    private Filme filme;

    public Sessao() {
    }

    public Sessao(DiaSemana diaSemana, String horario, String tipo, Filme filme) {
        this.diaSemana = diaSemana;
        this.horario = horario;
        this.tipo = tipo;
        this.filme = filme;
    }

    public Long getId_sessao() {
        return id_sessao;
    }

    public void setId_sessao(Long id_sessao) {
        this.id_sessao = id_sessao;
    }

    public DiaSemana getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(DiaSemana diaSemana) {
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

    public Filme getFilme() {
        return filme;
    }

    public void setFilme(Filme filme) {
        this.filme = filme;
    }


}
