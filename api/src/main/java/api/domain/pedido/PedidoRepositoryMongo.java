package api.domain.pedido;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PedidoRepositoryMongo extends MongoRepository<Pedido, Integer> {

  
}
