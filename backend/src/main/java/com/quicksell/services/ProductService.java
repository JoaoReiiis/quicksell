package com.quicksell.services;

import com.quicksell.models.Product;
import com.quicksell.models.dto.ProductCreateDTO;
import com.quicksell.models.dto.ProductUpdateDTO;
import com.quicksell.repositories.ProductRepository;
import com.quicksell.services.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @SuppressWarnings("null")
    public Product findById(Long id) {
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElseThrow(() -> new ObjectNotFoundException(
                "O Produto de Id: " + id + " nao pode ser encontrado ," + "Tipo: " + Product.class.getName()));
    }
    public List <Product> findAll(){
        List <Product> products = this.productRepository.findAll();
        return products;
    }

    @Transactional
    public Product create(Product obj) {
        obj.setId(null);
        obj = this.productRepository.save(obj);
        return obj;
    }

    @Transactional
    public Product update(Product obj) {
        Product newObj = findById(obj.getId());
        newObj.setName(obj.getName());
        newObj.setDescription(obj.getDescription());
        newObj.setPrice(obj.getPrice());
        return this.productRepository.save(newObj);
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        findById(id);
        try {
            this.productRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Nao e possivel excluir pois ha entidades relacionadas");
        }
    }

    public Product fromDTO(@Valid ProductCreateDTO obj){
        Product product = new Product();
        product.setName(obj.getName());
        product.setPrice(obj.getPrice());
        product.setDescription(obj.getDescription());
        return product;

    }

    public Product fromDTO(@Valid ProductUpdateDTO obj){
        Product product = new Product();
        product.setId(obj.getId());
        product.setName(obj.getName());
        product.setPrice(obj.getPrice());
        product.setDescription(obj.getDescription());
        return product;

    }
}
