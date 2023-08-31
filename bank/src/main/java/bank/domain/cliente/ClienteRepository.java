package bank.domain.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

  @Query("SELECT c FROM Cliente c WHERE c.cpf = :cpf")
  Cliente findByCpf(@Param("cpf") String cpf);

  @Modifying
  @Query("UPDATE Cliente c SET c.saldo = :novoSaldo WHERE c.id = :clienteId")
  void atualizarSaldoCliente(@Param("clienteId") Long clienteId, @Param("novoSaldo") double novoSaldo);

}
