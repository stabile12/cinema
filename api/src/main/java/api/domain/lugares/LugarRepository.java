package api.domain.lugares;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LugarRepository extends JpaRepository<Lugar, Long> {

  @Query("SELECT lugar FROM Lugar lugar WHERE lugar.id_sessao = :idSessao")
  List<Lugar> findBySessaoId(@Param("idSessao") int idSessao);

  
  @Query("SELECT l.disponivel FROM Lugar l WHERE l.id = :lugarId")
  boolean isLugarDisponivel(@Param("lugarId") Long lugarId);
  

}
