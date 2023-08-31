package api.domain.diaSemana;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="dias_semana")
@Component
public class DiaSemana {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_dia_semana;

    private String nome_dia;

    public Long getId() {
      return id_dia_semana;
    }

    public void setId(Long id) {
      this.id_dia_semana = id;
    }

    public String getNomeDiaSemana() {
      return nome_dia;
    }

    public void setNomeDiaSemana(String nome_dia) {
      this.nome_dia = nome_dia;
    }
}
