package bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bank.domain.cartao.CartaoInfo;
import bank.domain.cartao.CartaoRepository;
import bank.domain.cliente.ClienteRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("check")
public class CompraCheckController {

  @Autowired
  CartaoRepository cartaoRepository;

  @Autowired
  ClienteRepository clienteRepository;

  @PostMapping
  @Transactional
  public ResponseEntity<Object> cartaoCheck(@RequestBody CartaoInfo dados) {

    try {
      var cliente = clienteRepository.findByCpf(dados.cpf());
      var cartao = cartaoRepository.findCartaoByClienteId(cliente.getId());

      if (
        cartao.getNumero().equals(dados.numero())
        && cartao.getNome().equals(dados.nome())
        && cartao.getCvv().equals(dados.cvv())
        && cartao.getValidade().equals(dados.validade())
        ){
          clienteRepository.atualizarSaldoCliente(cliente.getId(), (cliente.getSaldo() - dados.valor()));
        return ResponseEntity.ok().build();
      } else {
        return ResponseEntity.badRequest().build();
      }
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }

    
  }
}
