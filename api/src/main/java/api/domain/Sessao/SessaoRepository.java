package api.domain.Sessao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessaoRepository extends JpaRepository<Sessao, Long> {
  
  @Query("SELECT s FROM Sessao s JOIN s.filme f WHERE f.id = :id")
  public List<Sessao> findSessaoByTitulo(@Param("id") Long id);
}
