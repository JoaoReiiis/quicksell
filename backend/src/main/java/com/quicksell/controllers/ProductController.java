package com.quicksell.controllers;

import com.quicksell.models.Product;
import com.quicksell.models.dto.ProductCreateDTO;
import com.quicksell.models.dto.ProductUpdateDTO;
import com.quicksell.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/product")
@Validated
public class ProductController {
    @Autowired
    private ProductService productService;

   
    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        List<Product> objs = (List<Product>) this.productService.findAll();
        return ResponseEntity.ok().body(objs);
    }

    @GetMapping("/{id}")
    @Validated
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product obj = this.productService.findById(id);
        return ResponseEntity.ok(obj);
    }

    @PostMapping
    @Validated
    public ResponseEntity<Void> create(@Valid @RequestBody ProductCreateDTO obj) {
        Product product = this.productService.fromDTO(obj);
        Product newProduct = this.productService.create(product);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/(id)").buildAndExpand(newProduct.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> update(@Valid @RequestBody ProductUpdateDTO obj, @PathVariable Long id) {
        obj.setId(id);
        Product product = this.productService.fromDTO(obj);
        this.productService.update(product);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
