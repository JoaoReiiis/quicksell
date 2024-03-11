package com.quicksell.services;

import com.quicksell.models.Product;
import com.quicksell.models.Sale;
import com.quicksell.models.User;
import com.quicksell.models.enums.ProfileEnum;
import com.quicksell.repositories.SaleRepository;
import com.quicksell.security.UserSpringSecurity;
import com.quicksell.services.exceptions.AuthorizationException;
import com.quicksell.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @SuppressWarnings("null")
    public Sale findById(Long id) {
        Sale sale = this.saleRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Venda nao encontrada! Id: " + id + ", Tipo: " + Sale.class.getName()));

        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity) ||
                !userSpringSecurity.hasRole(ProfileEnum.ADMIN) &&
                        !userHasSale(userSpringSecurity, sale))
            throw new AuthorizationException("Access denied");
        return sale;
    }

    public List<Sale> findAllByUser() {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity))
            throw new AuthorizationException("Access denied");

        return this.saleRepository.findByUser_Id(userSpringSecurity.getId());
    }

    public List<Sale> findAll(){
        List <Sale> sales = this.saleRepository.findAll();
        return sales;
    }

    @Transactional
    public Sale create(Sale obj) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity))
            throw new AuthorizationException("Access denied");

        User user = this.userService.findById(userSpringSecurity.getId());
        Product product = this.productService.findById(obj.getProduct().getId());

        obj.setId(null);
        obj.setUser(user);
        obj.setProduct(product);
        obj.setPrice(product.getPrice() * obj.getQuantity());
        obj = this.saleRepository.save(obj);
        return obj;
    }

    @SuppressWarnings("null")
    public void delete(Long id) {
        findById(id);
        try {
            this.saleRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Nao e possivel deletar pois ha entidades relacionadas");
        }
    }

    private Boolean userHasSale(UserSpringSecurity userSpringSecurity, Sale sale) {
        return sale.getUser().getId().equals(userSpringSecurity.getId());
    }
}
