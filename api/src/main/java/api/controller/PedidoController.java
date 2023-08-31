package api.controller;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.domain.pedido.DadosCartão;
import api.domain.pedido.GeradorId;
import api.domain.lugares.Lugar;
import api.domain.lugares.LugarRepository;
import api.domain.pedido.DadosCadastroPedido;
import api.domain.pedido.Pedido;
import api.domain.pedido.PedidoComCartaoWrapper;
import api.domain.pedido.PedidoRepositoryMongo;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("pedido")
public class PedidoController {

  @Autowired
  PedidoRepositoryMongo repository;

  @Autowired
  LugarRepository lugarRepository;

  @PostMapping
  @Transactional
  public ResponseEntity<Pedido> cadastroPedido(@RequestBody PedidoComCartaoWrapper pedidoWrapper) {

    DadosCadastroPedido dados = pedidoWrapper.dadosCadastroPedido();
    DadosCartão cartao = pedidoWrapper.cartao();

    try {
      // URL da API para onde você deseja fazer a requisição POST
      String url = "http://localhost:8081/check";

      // Criação da conexão
      URL obj = new URL(url);
      HttpURLConnection connection = (HttpURLConnection) obj.openConnection();

      // Configuração do tipo de requisição
      connection.setRequestMethod("POST");

      // Habilita o envio de dados no corpo da requisição
      connection.setDoOutput(true);

      // Parâmetros que você deseja enviar no corpo da requisição
      String parametros = cartao.toJson();
      byte[] postData = parametros.getBytes(StandardCharsets.UTF_8);

      // Configuração do cabeçalho da requisição
      connection.setRequestProperty("Content-Type", "application/json");
      connection.setRequestProperty("Content-Length", String.valueOf(postData.length));

      // Envio dos dados no corpo da requisição
      try (DataOutputStream wr = new DataOutputStream(connection.getOutputStream())) {
        wr.write(postData);
      }

      // Leitura da resposta da requisição
      int responseCode = connection.getResponseCode();
      System.out.println(responseCode);

      // Se os dados do cartão forem válidos:
      if (responseCode == 200) {
        GeradorId gerador = new GeradorId();
        int codigo = gerador.gerarCodigoAleatorio();

        Pedido pedido = new Pedido(dados);
        pedido.setCod_pedido(codigo);

        Optional<Pedido> codigoExistente = repository.findById(codigo);
        while (codigoExistente.isPresent()) {
          System.out.println("codigo já existente");
          codigo = gerador.gerarCodigoAleatorio(); // Gerar novo código
          pedido.setCod_pedido(codigo);
          codigoExistente = repository.findById(codigo);
        }

        // checar disponibilidade dos lugares
        for (Lugar lugar : pedido.getLugares()) {
          boolean isDisponivel = lugarRepository.isLugarDisponivel(lugar.getId());
          if (!isDisponivel) {
            System.out.println("Lugar indisponível");
            return ResponseEntity.badRequest().build();
          }
        }

        // altera disponibilidade dos lugares aqui
        for (Lugar lugar : pedido.getLugares()) {
          lugar.setDisponivel(false);
          lugarRepository.save(lugar);
        }

        var savedPedido = repository.save(pedido);

        return ResponseEntity.ok(savedPedido);
      } else {
        System.out.println(responseCode);
        return ResponseEntity.badRequest().build();
      }
    } catch (Exception e) {

      return ResponseEntity.internalServerError().build();
    }
  }
}
