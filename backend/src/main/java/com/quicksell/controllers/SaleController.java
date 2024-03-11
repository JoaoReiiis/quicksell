package com.quicksell.controllers;

import com.quicksell.models.Sale;
import com.quicksell.services.SaleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/sale")
@Validated
public class SaleController {

    @Autowired
    private SaleService saleService;


    @GetMapping("/{id}")
    @Validated
    public ResponseEntity<Sale> findById(@PathVariable Long id) {
        Sale obj = this.saleService.findById(id);
        return ResponseEntity.ok(obj);
    }

    @GetMapping
    public ResponseEntity<List<Sale>> findAll() {
        List<Sale> objs = this.saleService.findAll();
        return ResponseEntity.ok().body(objs);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Sale>> findAllByUser() {
        List<Sale> objs = this.saleService.findAllByUser();
        return ResponseEntity.ok().body(objs);
    }

    @PostMapping
    @Validated
    public ResponseEntity<Void> create(@Valid @RequestBody Sale obj) {
        this.saleService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/(id)").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.saleService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
