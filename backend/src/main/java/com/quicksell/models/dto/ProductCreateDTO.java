package com.quicksell.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCreateDTO {
    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    private Double price;

    @NotBlank
    @Size(min = 2, max = 100)
    private String description;
}
