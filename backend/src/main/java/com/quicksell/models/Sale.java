package com.quicksell.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = Sale.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Sale {
    public static final String TABLE_NAME = "sale";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @ManyToOne
    private Product product;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
