package com.quicksell.repositories;

import com.quicksell.models.Sale;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByUser_Id(Long Id);
    
}
