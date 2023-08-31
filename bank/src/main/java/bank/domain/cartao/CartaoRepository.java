package bank.domain.cartao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartaoRepository extends JpaRepository<Cartao, Long> {

  @Query("SELECT c FROM Cartao c WHERE c.cliente.id = :clienteId")
  Cartao findCartaoByClienteId(@Param("clienteId") Long clienteId);

}
