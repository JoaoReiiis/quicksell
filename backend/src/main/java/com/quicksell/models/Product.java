package com.quicksell.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = Product.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    public static final String TABLE_NAME = "product";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    
    @NotBlank
    @Size(min = 2, max = 100)
    @Column(name = "name", unique = true, length = 100, nullable = false)
    private String name;

    
    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "description")
    private String description;
}
